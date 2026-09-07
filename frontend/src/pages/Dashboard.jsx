import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/tasks', {
        params: { status: filter },
      });
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddOrUpdate = async (taskData, id) => {
    setError('');
    try {
      if (id) {
        const { data } = await api.put(`/tasks/${id}`, taskData);
        setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
        setEditingTask(null);
      } else {
        const { data } = await api.post('/tasks', taskData);
        if (filter === 'all' || filter === data.status) {
          setTasks((prev) => [data, ...prev]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    setError('');
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      if (filter === 'all' || filter === data.status) {
        setTasks((prev) => prev.map((t) => (t._id === task._id ? data : t)));
      } else {
        setTasks((prev) => prev.filter((t) => t._id !== task._id));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const visibleTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const percentage = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="container">
      <h2>My Tasks</h2>

      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p style={{ marginTop: '-8px', fontSize: '13px' }}>
        {completedCount} of {tasks.length} completed ({percentage}%)
      </p>

      {error && <p className="error-text">{error}</p>}

      <TaskForm
        onSubmit={handleAddOrUpdate}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <input
        type="text"
        placeholder="Search tasks by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : visibleTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        visibleTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
