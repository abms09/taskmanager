const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="card">
      <div className="task-header">
        <div>
          <h4 style={{ margin: '0 0 4px 0' }}>{task.title}</h4>
          {task.description && <p style={{ margin: '0 0 8px 0' }}>{task.description}</p>}
          <span className={`status-badge ${task.status}`}>{task.status}</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="secondary" onClick={() => onToggleStatus(task)}>
            {task.status === 'pending' ? 'Mark done' : 'Mark pending'}
          </button>
          <button className="secondary" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="danger" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
