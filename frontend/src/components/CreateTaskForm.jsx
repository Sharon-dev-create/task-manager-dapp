import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';

export default function CreateTaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createTask } = useTaskManager();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!title.trim()) {
        setError('Title is required');
        setLoading(false);
        return;
      }

      let deadlineTimestamp = 0;
      console.log("title:", title);

      if (deadline) {
        deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
        if (deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
          setError('Deadline must be in the future');
          setLoading(false);
          return;
        }
      }

      await createTask(title, description, deadlineTimestamp);
      setTitle('');
      setDescription('');
      setDeadline('');
      onTaskCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8 mb-8">
      <h2 className="text-3xl font-bold font-display mb-6 text-gray-900">Create New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to accomplish?"
            className="input-field"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details... (optional)"
            rows="3"
            className="input-field resize-none"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deadline (Optional)
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
            disabled={loading}
          />
          {deadline && (
            <p className="text-xs text-gray-500 mt-2 font-medium">
              📅 {new Date(deadline).toLocaleString()}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-danger text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-lg"
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
