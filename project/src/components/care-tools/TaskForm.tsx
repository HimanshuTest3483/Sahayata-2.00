import React from 'react';
import { Plus } from 'lucide-react';
import { RoutineTask } from '../../types';

interface TaskFormProps {
  task: Omit<RoutineTask, 'id'>;
  onTaskChange: (task: Omit<RoutineTask, 'id'>) => void;
  onSubmit: () => void;
}

const TaskForm = ({ task, onTaskChange, onSubmit }: TaskFormProps) => (
  <div className="flex gap-4 mb-6">
    <input
      type="time"
      value={task.time}
      onChange={(e) => onTaskChange({ ...task, time: e.target.value })}
      className="border rounded-md p-2"
    />
    <input
      type="text"
      value={task.task}
      onChange={(e) => onTaskChange({ ...task, task: e.target.value })}
      placeholder="Add task..."
      className="border rounded-md p-2 flex-1"
    />
    <select
      value={task.category}
      onChange={(e) => onTaskChange({ ...task, category: e.target.value as RoutineTask['category'] })}
      className="border rounded-md p-2"
    >
      <option value="medication">Medication</option>
      <option value="exercise">Exercise</option>
      <option value="meal">Meal</option>
      <option value="other">Other</option>
    </select>
    <button
      onClick={onSubmit}
      className="bg-rose-600 text-white p-2 rounded-md hover:bg-rose-700"
    >
      <Plus className="h-5 w-5" />
    </button>
  </div>
);

export default TaskForm;