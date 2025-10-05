import React from 'react';
import { Trash2 } from 'lucide-react';
import { RoutineTask } from '../../types';

interface TaskListProps {
  tasks: RoutineTask[];
  onRemove: (id: string) => void;
}

const TaskList = ({ tasks, onRemove }: TaskListProps) => (
  <div className="space-y-3">
    {tasks.sort((a, b) => a.time.localeCompare(b.time)).map(task => (
      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-4">
          <span className="font-medium">{task.time}</span>
          <span>{task.task}</span>
          <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">{task.category}</span>
        </div>
        <button
          onClick={() => onRemove(task.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
  </div>
);

export default TaskList;