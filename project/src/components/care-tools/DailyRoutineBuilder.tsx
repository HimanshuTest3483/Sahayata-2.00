import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { RoutineTask } from '../../types';
import { apiFetch } from '../../lib/api';

const DailyRoutineBuilder = () => {
  const [tasks, setTasks] = useState<RoutineTask[]>([]);
  const [newTask, setNewTask] = useState({
    time: '',
    task: '',
    category: 'other' as RoutineTask['category']
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiFetch('/api/routines');
      setTasks(data.map((t: any) => ({ id: t._id, time: t.time, task: t.task, category: t.category })));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.time && newTask.task) {
      try {
        const created = await apiFetch('/api/routines', { method: 'POST', body: JSON.stringify({ time: newTask.time, task: newTask.task, category: newTask.category }) });
        setTasks([...tasks, { id: created._id, time: created.time, task: created.task, category: created.category }]);
        setNewTask({ time: '', task: '', category: 'other' });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add task');
      }
    }
  };

  const removeTask = async (id: string) => {
    try {
      await apiFetch(`/api/routines/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove task');
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
        <Clock className="h-6 w-6 text-rose-600" />
        Daily Routine Builder
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <TaskForm 
        task={newTask}
        onTaskChange={setNewTask}
        onSubmit={addTask}
      />

      <TaskList 
        tasks={tasks}
        onRemove={removeTask}
      />
    </div>
  );
};

export default DailyRoutineBuilder;