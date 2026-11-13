import { CalendarIcon, CheckIcon, PencilIcon, TrashIcon } from './AppIcons';

const formatDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'completed';
  const createdDate = formatDate(task.createdAt);

  return (
    <article className={`task-item ${task.status}`}>
      <button
        type="button"
        className="task-toggle"
        onClick={() => onToggleStatus(task)}
        aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
      >
        {isCompleted && <CheckIcon />}
      </button>

      <div className="task-body">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-status ${task.status}`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className="task-meta-item">
            <CalendarIcon />
            {createdDate ? `Added ${createdDate}` : 'Task'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="task-action"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          title="Edit task"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="task-action danger"
          onClick={() => onDelete(task._id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
};

export default TaskItem;
