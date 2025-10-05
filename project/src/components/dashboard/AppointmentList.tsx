import React, { useEffect, useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../lib/api';
import { Appointment } from '../../types';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await apiFetch('/api/appointments?limit=5');
      setAppointments(data || []);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-rose-600 mr-2" />
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        </div>
        <Link
          to="/care-schedule"
          className="flex items-center text-rose-600 hover:text-rose-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New
        </Link>
      </div>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
        ) : (
          appointments.map(appointment => (
            <div key={appointment.id} className="border-l-4 border-rose-500 pl-4">
              <h3 className="font-medium">{appointment.title}</h3>
              <p className="text-sm text-gray-600">
                {appointment.date} at {appointment.time}
              </p>
              {appointment.location && (
                <p className="text-sm text-gray-600">{appointment.location}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;