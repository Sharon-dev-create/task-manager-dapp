import React, { useState, useEffect } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import TaskCard from './TaskCard';

export default function TaskList({ refreshTrigger }) {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { getTotalTasks, getTask } = useTaskManager();

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const total = await getTotalTasks();
      setTotalTasks(total);

      const loadedTasks = [];
      for (let i = 0; i < total; i++) {
        try {
          const task = await getTask(i);
          loadedTasks.push(task);
        } catch (err) {
          console.log(`Task ${i} not found or error:`, err.message);
        }
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-display text-gray-900">
            Your Tasks
          </h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total</p>
        </div>
        <button
          onClick={loadTasks}
          className="btn-primary flex items-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-danger text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-500 text-lg font-medium">✨ No tasks yet. Create your first one above!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id?.toString() || index}
              task={task}
              onTaskUpdated={loadTasks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
