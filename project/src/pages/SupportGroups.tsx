import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import GroupCard from '../components/support/GroupCard';
import { SupportGroup } from '../types';
import { supabase } from '../lib/supabase';

const SupportGroups = () => {
  const [groups, setGroups] = useState<SupportGroup[]>([]);
  const [memberGroups, setMemberGroups] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    schedule: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      // Fetch all groups
      const { data: groupsData, error: groupsError } = await supabase
        .from('support_groups')
        .select(`
          *,
          group_members (
            user_id
          )
        `);

      if (groupsError) throw groupsError;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Format groups and track memberships
      const formattedGroups = groupsData.map(group => ({
        id: group.id,
        name: group.name,
        description: group.description,
        schedule: group.schedule,
        participants: group.group_members?.length || 0
      }));

      const userMemberships = groupsData
        .filter(group => group.group_members?.some(member => member.user_id === user.id))
        .map(group => group.id);

      setGroups(formattedGroups);
      setMemberGroups(userMemberships);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch groups');
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First verify that the user has a profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Please complete your profile before creating a support group');
      }

      const { data, error } = await supabase
        .from('support_groups')
        .insert([
          {
            name: newGroup.name,
            description: newGroup.description,
            schedule: newGroup.schedule,
            created_by: profile.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setGroups([...groups, {
        id: data.id,
        name: data.name,
        description: data.description,
        schedule: data.schedule,
        participants: 0
      }]);

      setShowCreateModal(false);
      setNewGroup({ name: '', description: '', schedule: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create group');
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (memberGroups.includes(groupId)) {
        // Leave group
        const { error } = await supabase
          .from('group_members')
          .delete()
          .eq('group_id', groupId)
          .eq('user_id', user.id);

        if (error) throw error;

        setMemberGroups(memberGroups.filter(id => id !== groupId));
        setGroups(groups.map(group => 
          group.id === groupId 
            ? { ...group, participants: group.participants - 1 }
            : group
        ));
      } else {
        // Join group
        const { error } = await supabase
          .from('group_members')
          .insert([{ group_id: groupId, user_id: user.id }]);

        if (error) throw error;

        setMemberGroups([...memberGroups, groupId]);
        setGroups(groups.map(group => 
          group.id === groupId 
            ? { ...group, participants: group.participants + 1 }
            : group
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join/leave group');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12"
         style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Groups</h1>
              <p className="text-gray-600">Connect with others who understand your journey</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              onJoin={handleJoinGroup}
              isMember={memberGroups.includes(group.id)}
            />
          ))}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Create Support Group</h2>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="w-full border rounded-md p-2"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule
                  </label>
                  <input
                    type="text"
                    value={newGroup.schedule}
                    onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                    className="w-full border rounded-md p-2"
                    placeholder="e.g., Every Monday at 7 PM EST"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportGroups;