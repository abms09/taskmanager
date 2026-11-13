import { CheckIcon, ShieldIcon } from './AuthIcons';
import './Auth.css';

const points = [
  'All your tasks in one clear workspace',
  'Simple progress tracking that keeps you moving',
  'A calm, focused place to plan your day',
];

const previewTasks = [
  { title: 'Finalize project brief', status: 'completed' },
  { title: 'Review weekly priorities', status: 'pending' },
];

const AuthLayout = ({ eyebrow, headline, description, children }) => (
  <div className="auth-page">
    <div className="auth-shell">
      <aside className="auth-brand-panel">
        <div className="auth-brand-logo">
          <span className="auth-logo-mark">
            <CheckIcon />
          </span>
          <span>Task Manager</span>
        </div>

        <div className="auth-brand-copy">
          <span className="auth-pill">{eyebrow}</span>
          <h1>{headline}</h1>
          <p>{description}</p>

          <ul className="auth-brand-points">
            {points.map((point) => (
              <li key={point}>
                <span className="auth-point-icon"><CheckIcon /></span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-preview" aria-hidden="true">
          <div className="auth-preview-head">
            <div>
              <span className="auth-preview-kicker">Today</span>
              <strong>My Tasks</strong>
            </div>
            <span className="auth-preview-percent">72%</span>
          </div>

          <div className="auth-preview-bar">
            <span />
          </div>

          <div className="auth-preview-list">
            {previewTasks.map((task) => (
              <div
                className={`auth-preview-task ${task.status === 'completed' ? 'done' : ''}`}
                key={task.title}
              >
                <span className="auth-preview-check">
                  {task.status === 'completed' && <CheckIcon />}
                </span>
                <span>{task.title}</span>
                <span
                  className={`auth-preview-badge ${task.status === 'completed' ? '' : 'pending'}`}
                >
                  {task.status === 'completed' ? 'Done' : 'Today'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-form-wrap">{children}</div>
        <p className="auth-footer-note">
          <ShieldIcon />
          Your account and tasks stay private and secure.
        </p>
      </main>
    </div>
  </div>
);

export default AuthLayout;
