import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';
import {
  AlertIcon,
  CheckCircleIcon,
  ClockIcon,
  InboxIcon,
  ListIcon,
  SearchIcon,
} from '../components/AppIcons';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
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
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

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
        setTasks((prev) => [data, ...prev]);
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
      setEditingTask((current) => (current?._id === id ? null : current));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const visibleTasks = tasks.filter(
    (t) =>
      (filter === 'all' || t.status === filter) &&
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingCount = tasks.length - completedCount;
  const percentage = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there';
  const isFiltered = filter !== 'all' || search.trim() !== '';

  const filterOptions = [
    { value: 'all', label: 'All tasks', count: tasks.length },
    { value: 'pending', label: 'Pending', count: pendingCount },
    { value: 'completed', label: 'Completed', count: completedCount },
  ];

  const clearFilters = () => {
    setSearch('');
    setFilter('all');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-hero">
          <div className="dashboard-hero-copy">
            <span className="dashboard-eyebrow">Workspace overview</span>
            <h1>My Tasks</h1>
            <p>Welcome back, {firstName}. Here is what needs your attention today.</p>
          </div>

          <div className="dashboard-progress-card">
            <div className="dashboard-progress-top">
              <span>Overall progress</span>
              <strong>{percentage}%</strong>
            </div>
            <div className="dashboard-progress-track">
              <span style={{ width: `${percentage}%` }} />
            </div>
            <span className="dashboard-progress-caption">
              {completedCount} of {tasks.length} tasks completed
            </span>
          </div>
        </header>

        <section className="dashboard-stats" aria-label="Task statistics">
          <article className="stat-card total">
            <span className="stat-icon"><ListIcon /></span>
            <div>
              <span className="stat-label">Total tasks</span>
              <strong className="stat-value">{tasks.length}</strong>
            </div>
          </article>
          <article className="stat-card pending">
            <span className="stat-icon"><ClockIcon /></span>
            <div>
              <span className="stat-label">Pending tasks</span>
              <strong className="stat-value">{pendingCount}</strong>
            </div>
          </article>
          <article className="stat-card completed">
            <span className="stat-icon"><CheckCircleIcon /></span>
            <div>
              <span className="stat-label">Completed tasks</span>
              <strong className="stat-value">{completedCount}</strong>
            </div>
          </article>
        </section>

        {error && (
          <div className="dashboard-error" role="alert">
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        <div className="dashboard-content">
          <section className="dashboard-tasks" aria-labelledby="task-list-heading">
            <div className="tasks-toolbar">
              <div className="tasks-toolbar-head">
                <div>
                  <span className="section-eyebrow">Task list</span>
                  <h2 id="task-list-heading">Your tasks</h2>
                </div>
                <span className="tasks-count">{visibleTasks.length} shown</span>
              </div>

              <div className="tasks-controls">
                <div className="task-search">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search tasks by title"
                  />
                </div>

                <div className="filter-chips" role="group" aria-label="Filter tasks by status">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={filter === option.value ? 'active' : ''}
                      onClick={() => setFilter(option.value)}
                      aria-pressed={filter === option.value}
                    >
                      {option.label}
                      <span className="filter-count">{option.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="dashboard-loading">
                <span className="loading-spinner" />
                Loading tasks...
              </div>
            ) : visibleTasks.length === 0 ? (
              <div className="dashboard-empty">
                <span className="empty-icon"><InboxIcon /></span>
                <h3>{tasks.length ? 'No tasks match your filters' : 'Your task list is clear'}</h3>
                <p>
                  {tasks.length
                    ? 'Try adjusting your search or choosing a different status.'
                    : 'Add your first task to start organizing your day.'}
                </p>
                {tasks.length > 0 && isFiltered && (
                  <button type="button" className="empty-reset" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="task-list">
                {visibleTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="dashboard-sidebar" aria-label="Add or edit a task">
            <TaskForm
              onSubmit={handleAddOrUpdate}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
