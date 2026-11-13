import { MoonIcon, SunIcon } from './AppIcons';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button
        type="button"
        className={`theme-switch-option ${isLight ? 'active' : ''}`}
        onClick={() => {
          if (!isLight) toggleTheme();
        }}
        aria-label="Light mode"
        aria-pressed={isLight}
        title={isLight ? 'Light mode (active)' : 'Switch to light mode'}
      >
        <SunIcon />
        <span className="theme-switch-label">Light</span>
      </button>
      <button
        type="button"
        className={`theme-switch-option ${!isLight ? 'active' : ''}`}
        onClick={() => {
          if (isLight) toggleTheme();
        }}
        aria-label="Dark mode"
        aria-pressed={!isLight}
        title={!isLight ? 'Dark mode (active)' : 'Switch to dark mode'}
      >
        <MoonIcon />
        <span className="theme-switch-label">Dark</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
