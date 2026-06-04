import React, { useState, useEffect } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import DeadlineManager from './DeadlineManager';

export default function TaskCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOverdue, setIsOverdue] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const {
    updateTask,
    toggleTaskStatus,
    deleteTask,
    isOverdue: checkOverdue,
    getTimeRemaining,
  } = useTaskManager();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (task.deadline && Number(task.deadline) > 0) {
          const overdue = await checkOverdue(Number(task.id));
          setIsOverdue(overdue);

          const remaining = await getTimeRemaining(Number(task.id));
          setTimeRemaining(remaining);
        }
      } catch (err) {
        console.error('Error checking deadline:', err);
      }
    };

    checkStatus();
  }, [task, checkOverdue, getTimeRemaining]);

  const handleUpdate = async () => {
    setError('');
    setLoading(true);

    try {
      if (!editTitle.trim()) {
        setError('Title cannot be empty');
        setLoading(false);
        return;
      }

      await updateTask(Number(task.id), editTitle, editDescription);
      setIsEditing(false);
      onTaskUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setError('');
    setLoading(true);

    try {
      await toggleTaskStatus(Number(task.id));
      onTaskUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      await deleteTask(Number(task.id));
      onTaskUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDeadline = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds < 0) return 'Overdue';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 border-l-4 transition-all ${
        task.completed
          ? 'bg-gray-50 border-gray-300'
          : isOverdue
          ? 'bg-red-50 border-danger'
          : 'bg-white border-primary'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={loading}
            className="mt-1 w-5 h-5 cursor-pointer"
          />

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2 mb-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="2"
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
              </div>
            ) : (
              <>
                <h3
                  className={`text-lg font-semibold ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-gray-600 mt-1 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-3 py-1 bg-secondary text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(task.title);
                  setEditDescription(task.description);
                }}
                disabled={loading}
                className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {!task.completed && (
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-danger text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Deadline Section */}
      {task.deadline && Number(task.deadline) > 0 && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            isOverdue ? 'bg-red-100 border border-red-300' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <p className="font-semibold">
            {isOverdue ? '⏰ OVERDUE' : '📅 Due:'} {formatDeadline(task.deadline)}
          </p>
          {timeRemaining !== null && timeRemaining >= 0 && (
            <p className="text-gray-600">{formatTimeRemaining(timeRemaining)} remaining</p>
          )}
        </div>
      )}

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-3">
        {task.completed && (
          <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            ✓ Completed
          </span>
        )}
        {isOverdue && !task.completed && (
          <span className="inline-block bg-danger text-white text-xs font-semibold px-3 py-1 rounded-full">
            Overdue
          </span>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm mb-3">
          {error}
        </div>
      )}

      {/* Deadline Manager */}
      {!task.completed && (
        <DeadlineManager taskId={Number(task.id)} onUpdated={onTaskUpdated} />
      )}

      {/* Task ID */}
      <div className="mt-3 text-xs text-gray-400">ID: {Number(task.id)}</div>
    </div>
  );
}
