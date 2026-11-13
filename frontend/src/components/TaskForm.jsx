import { useState, useEffect } from 'react';
import { CheckIcon, PlusIcon } from './AppIcons';

const TaskForm = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setStatus(editingTask.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, status }, editingTask?._id);

    if (!editingTask) {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`task-form ${editingTask ? 'is-editing' : ''}`}
    >
      <div className="task-form-head">
        <div>
          <span className="task-form-eyebrow">{editingTask ? 'Edit task' : 'New task'}</span>
          <h2>{editingTask ? 'Update task' : 'Add a task'}</h2>
        </div>
        <span className="task-form-badge">
          {editingTask ? <CheckIcon /> : <PlusIcon />}
        </span>
      </div>

      <div className="task-form-field">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="task-form-field">
        <div className="task-form-label">
          <label htmlFor="task-description">Description</label>
          <span>Optional</span>
        </div>
        <textarea
          id="task-description"
          placeholder="Add a few helpful details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="task-form-actions">
        <button type="submit" className="task-form-submit">
          {editingTask ? 'Save Changes' : 'Add Task'}
          {editingTask ? <CheckIcon /> : <PlusIcon />}
        </button>
        {editingTask && (
          <button type="button" className="task-form-cancel" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
