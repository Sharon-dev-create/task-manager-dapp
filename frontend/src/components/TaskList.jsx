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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Tasks <span className="text-gray-400 text-lg">({tasks.length})</span>
        </h2>
        <button
          onClick={loadTasks}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <p className="text-lg">No tasks yet. Create your first task above!</p>
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
