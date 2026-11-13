import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <strong>Task Manager</strong>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {user && (
          <>
            <span>{user.name}</span>
            <button className="secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
