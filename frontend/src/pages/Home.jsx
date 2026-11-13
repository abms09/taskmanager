import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const CheckIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const TaskIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="m8 9 1.5 1.5L12 8" />
    <path d="M14.5 9H17" />
    <path d="m8 15 1.5 1.5L12 14" />
    <path d="M14.5 15H17" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20v-7" />
    <path d="M22 20H2" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M3 10h18" />
  </svg>
);

const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M15 13h2" />
    <path d="M15 17h2" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

const features = [
  {
    icon: <TaskIcon />,
    title: 'Easy Task Management',
    description: 'Create, edit and complete tasks in seconds with a workflow that stays out of your way.',
  },
  {
    icon: <ChartIcon />,
    title: 'Progress Tracking',
    description: 'See exactly how much you have accomplished with a clear, always up-to-date progress view.',
  },
  {
    icon: <FolderIcon />,
    title: 'Smart Organization',
    description: 'Filter, search and group your tasks so the next thing you need is always easy to find.',
  },
  {
    icon: <LayoutIcon />,
    title: 'Simple and Clean Workspace',
    description: 'A focused interface with no clutter, no noise and no unnecessary steps between you and done.',
  },
];

const steps = [
  {
    title: 'Create your account',
    description: 'Sign up in moments and get instant access to your personal task workspace.',
  },
  {
    title: 'Organize your tasks',
    description: 'Add what matters, set priorities and keep everything neatly in one place.',
  },
  {
    title: 'Track your progress',
    description: 'Complete tasks, watch your progress grow and stay motivated every day.',
  },
];

const previewTasks = [
  { title: 'Finalize landing page copy', meta: 'Marketing · Today', status: 'completed' },
  { title: 'Review project roadmap', meta: 'Planning · Tomorrow', status: 'pending' },
  { title: 'Prepare weekly update', meta: 'Team · Friday', status: 'pending' },
];

const Home = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div className="home" id="top">
      <header className="home-nav-wrap">
        <nav className="home-container home-nav" aria-label="Main navigation">
          <Link to="/" className="brand" onClick={closeMenu} aria-label="Task Manager home">
            <span className="brand-mark">
              <CheckIcon />
            </span>
            <span className="brand-name">Task Manager</span>
          </Link>

          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="landing-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>

          <div id="landing-menu" className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#top" onClick={closeMenu}>Home</a>
            <a href="#features" onClick={closeMenu}>Features</a>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span className="theme-toggle-label">
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </span>
            </button>

            {user ? (
              <>
                <Link className="nav-login" to="/dashboard" onClick={closeMenu}>
                  Dashboard
                </Link>
                <button type="button" className="btn btn-primary nav-cta" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link className="nav-login" to="/login" onClick={closeMenu}>
                  Login
                </Link>
                <Link className="btn btn-primary nav-cta" to="/register" onClick={closeMenu}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="home-container hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Simple task management, done right
            </span>
            <h1>
              Get Things Done. <span className="accent">Stay Focused.</span> Achieve More.
            </h1>
            <p className="lead">
              Task Manager helps you capture what matters, organize your day and make steady
              progress on the work that moves you forward.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to={user ? '/dashboard' : '/register'}>
                {user ? 'Go to Dashboard' : 'Get Started for Free'}
              </Link>
              <a className="btn btn-ghost btn-lg" href="#features">
                Explore Features
              </a>
            </div>
            <ul className="hero-points">
              <li><CheckIcon /> Free to use</li>
              <li><CheckIcon /> No credit card required</li>
              <li><CheckIcon /> Your tasks stay private</li>
            </ul>
          </div>

          <div className="hero-preview" aria-hidden="true">
            <div className="preview-window">
              <div className="preview-topbar">
                <span className="preview-dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="preview-url">taskmanager.app/dashboard</span>
              </div>

              <div className="preview-body">
                <aside className="preview-sidebar">
                  <span className="preview-nav-item active">
                    <span className="preview-nav-dot" />
                    Dashboard
                  </span>
                  <span className="preview-nav-item">
                    <span className="preview-nav-dot" />
                    Tasks
                  </span>
                  <span className="preview-nav-item">
                    <span className="preview-nav-dot" />
                    Progress
                  </span>
                </aside>

                <div className="preview-main">
                  <div className="preview-header">
                    <div>
                      <span className="preview-kicker">Overview</span>
                      <h3>My Tasks</h3>
                    </div>
                    <span className="preview-avatar">A</span>
                  </div>

                  <div className="preview-progress">
                    <div className="preview-progress-top">
                      <span>Weekly progress</span>
                      <strong>72%</strong>
                    </div>
                    <div className="preview-bar">
                      <span />
                    </div>
                  </div>

                  <div className="preview-tasks">
                    {previewTasks.map((task) => (
                      <div
                        key={task.title}
                        className={`preview-task ${task.status === 'completed' ? 'done' : ''}`}
                      >
                        <span className="preview-check"><CheckIcon /></span>
                        <span className="preview-task-text">
                          <span className="preview-task-title">{task.title}</span>
                          <span className="preview-task-meta">{task.meta}</span>
                        </span>
                        <span className={`preview-badge ${task.status === 'completed' ? 'done' : ''}`}>
                          {task.status === 'completed' ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="features">
          <div className="home-container">
            <div className="section-head">
              <span className="section-eyebrow">Features</span>
              <h2>Everything you need to stay on top of your tasks</h2>
              <p>
                Powerful enough to keep you organized, simple enough to use every single day.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="home-container">
            <div className="section-head">
              <span className="section-eyebrow">How it works</span>
              <h2>Up and running in three simple steps</h2>
              <p>
                No complicated setup. Just a clear path from your first task to real progress.
              </p>
            </div>

            <ol className="steps">
              {steps.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step-num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section final-cta-section">
          <div className="home-container">
            <div className="cta-panel">
              <span className="section-eyebrow">Start today</span>
              <h2>Ready to get more done?</h2>
              <p>
                Join Task Manager and give every day a little more focus, clarity and momentum.
              </p>
              <Link className="btn btn-primary btn-lg" to={user ? '/dashboard' : '/register'}>
                {user ? 'Open My Dashboard' : 'Get Started for Free'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-container">
          <div className="footer-main">
            <div className="footer-brand">
              <Link to="/" className="brand">
                <span className="brand-mark">
                  <CheckIcon />
                </span>
                <span className="brand-name">Task Manager</span>
              </Link>
              <p>Simple task management for people who want to focus on what matters.</p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#top">Home</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              {user ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Get Started</Link>
                </>
              )}
            </nav>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</span>
            <span>Built for focused, productive days.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
