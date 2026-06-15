import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';

export default function DeadlineManager({ taskId, onUpdated }) {
  const [showForm, setShowForm] = useState(false);
  const [newDeadline, setNewDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setDeadline, removeDeadline } = useTaskManager();

  const handleSetDeadline = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!newDeadline) {
        setError('Please select a date and time');
        setLoading(false);
        return;
      }

      const deadlineTimestamp = Math.floor(new Date(newDeadline).getTime() / 1000);
      
      if (deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
        setError('Deadline must be in the future');
        setLoading(false);
        return;
      }

      await setDeadline(taskId, deadlineTimestamp);
      setNewDeadline('');
      setShowForm(false);
      onUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDeadline = async () => {
    setError('');
    setLoading(true);

    try {
      await removeDeadline(taskId);
      onUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors"
        >
          ⏰ Set/Update Deadline
        </button>
      ) : (
        <div className="space-y-3">
          <form onSubmit={handleSetDeadline} className="flex gap-2">
            <input
              type="datetime-local"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 btn-primary text-sm"
            >
              {loading ? 'Saving...' : 'Set'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setNewDeadline('');
                setError('');
              }}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </form>

          {error && (
            <div className="text-red-600 text-xs font-medium">{error}</div>
          )}

          <button
            onClick={handleRemoveDeadline}
            disabled={loading}
            className="text-xs text-danger hover:text-red-700 font-semibold transition-colors"
          >
            🗑️ Remove Deadline
          </button>
        </div>
      )}
    </div>
  );
}
