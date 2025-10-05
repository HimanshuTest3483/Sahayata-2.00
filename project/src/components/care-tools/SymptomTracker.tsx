import React, { useState, useEffect } from 'react';
import { LineChart, AlertCircle } from 'lucide-react';
import { apiFetch } from '../../lib/api';

interface SymptomLog {
  id: string;
  date: string;
  symptom: string;
  severity: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

const SymptomTracker = () => {
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    symptom: '',
    severity: 1 as SymptomLog['severity'],
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await apiFetch('/api/symptoms');
      setLogs(data.map((log: any) => ({ id: log._id, date: log.date, symptom: log.symptom, severity: log.severity, notes: log.notes || '' })));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch symptom logs');
      setLoading(false);
    }
  };

  const addLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLog.symptom) {
      try {
        const created = await apiFetch('/api/symptoms', { method: 'POST', body: JSON.stringify({ date: newLog.date, symptom: newLog.symptom, severity: newLog.severity, notes: newLog.notes }) });
        setLogs([{ id: created._id, date: created.date, symptom: created.symptom, severity: created.severity, notes: created.notes || '' }, ...logs]);

        setNewLog({
          date: new Date().toISOString().split('T')[0],
          symptom: '',
          severity: 1,
          notes: ''
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add symptom log');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LineChart className="h-6 w-6 text-rose-600" />
        Symptom Tracker
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={addLog} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={newLog.date}
              onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptom</label>
            <input
              type="text"
              value={newLog.symptom}
              onChange={(e) => setNewLog({ ...newLog, symptom: e.target.value })}
              placeholder="Enter symptom..."
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severity (1-5)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setNewLog({ ...newLog, severity: level as SymptomLog['severity'] })}
                className={`w-10 h-10 rounded-full ${
                  newLog.severity === level ? 'bg-rose-600 text-white' : 'bg-gray-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={newLog.notes}
            onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
            className="w-full border rounded-md p-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white p-2 rounded-md hover:bg-rose-700"
        >
          Log Symptom
        </button>
      </form>

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{log.date}</span>
              <span className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                Severity: {log.severity}
              </span>
            </div>
            <p className="font-medium text-gray-800">{log.symptom}</p>
            {log.notes && <p className="text-sm text-gray-600 mt-2">{log.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomTracker;