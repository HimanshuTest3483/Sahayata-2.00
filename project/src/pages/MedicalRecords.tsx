import React, { useState } from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  attachmentName?: string;
}

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    description: '',
    attachmentName: ''
  });

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRecord.type && newRecord.description) {
      setRecords([...records, { ...newRecord, id: Date.now().toString() }]);
      setNewRecord({
        date: new Date().toISOString().split('T')[0],
        type: '',
        description: '',
        attachmentName: ''
      });
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
        </div>

        <form onSubmit={handleAddRecord} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
              <input
                type="text"
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                placeholder="e.g., Lab Result, Prescription, Report"
                className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newRecord.description}
              onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
              className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
            <input
              type="file"
              onChange={(e) => setNewRecord({ ...newRecord, attachmentName: e.target.files?.[0]?.name || '' })}
              className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Record
          </button>
        </form>

        <div className="space-y-4">
          {records.map(record => (
            <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary-600">{record.date}</span>
                <button
                  onClick={() => handleDeleteRecord(record.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-medium">{record.type}</h3>
              <p className="text-gray-600 mt-1">{record.description}</p>
              {record.attachmentName && (
                <div className="mt-2 text-sm text-gray-500">
                  📎 {record.attachmentName}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;