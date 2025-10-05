import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, role: 'caretaker' | 'patient') => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ 
      id: authData.user?.id, 
      email, 
      role,
      is_profile_complete: false
    }]);

  if (profileError) throw profileError;

  return authData;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Profile helpers
export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    // Only throw if it's not a "no rows returned" error
    if (!error.message.includes('no rows returned')) {
      throw error;
    }
  }

  // If no profile exists, return a default profile
  if (!data) {
    // Create a new profile
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        email: user.email || '',
        role: 'caretaker',
        is_profile_complete: false
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newProfile;
  }

  return data;
};

export const updateProfile = async (profileData: {
  full_name?: string;
  phone?: string;
  address?: string;
  emergency_contact?: string;
  medical_conditions?: string[];
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update({ 
      ...profileData,
      is_profile_complete: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Support Groups helpers
export const getSupportGroups = async () => {
  const { data, error } = await supabase
    .from('support_groups')
    .select(`
      *,
      group_members (
        user_id
      ),
      profiles!support_groups_created_by_fkey (
        full_name,
        email
      )
    `);

  if (error) throw error;
  return data;
};

export const createGroup = async (name: string, description: string, schedule: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) throw profileError;
  
  // Check if user is admin or has completed profile
  if (profile.email !== 'unknown3483@gmail.com' && !profile.is_profile_complete) {
    throw new Error('Not a verified or authorized user');
  }

  const { data, error } = await supabase
    .from('support_groups')
    .insert([{
      name,
      description,
      schedule,
      created_by: user.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const joinGroup = async (groupId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('group_members')
    .insert([{ group_id: groupId, user_id: user.id }]);

  if (error) throw error;
};

export const getGroupMembers = async (groupId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      user_id,
      profiles (
        email,
        full_name
      )
    `)
    .eq('group_id', groupId);

  if (error) throw error;
  return data;
};

// Group Chat helpers
export const subscribeToGroupChat = (groupId: string, callback: (message: any) => void) => {
  return supabase
    .channel(`group_chat:${groupId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'group_chats',
        filter: `group_id=eq.${groupId}`
      },
      callback
    )
    .subscribe();
};

export const sendGroupMessage = async (groupId: string, message: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('group_chats')
    .insert([{
      group_id: groupId,
      user_id: user.id,
      message
    }]);

  if (error) throw error;
};

export const getGroupMessages = async (groupId: string) => {
  const { data, error } = await supabase
    .from('group_chats')
    .select(`
      *,
      profiles (
        email,
        full_name
      )
    `)
    .eq('group_id', groupId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};