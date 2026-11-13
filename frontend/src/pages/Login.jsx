import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthField from '../components/AuthField';
import { MailIcon, LockIcon, AlertIcon, ArrowIcon } from '../components/AuthIcons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      headline="Welcome Back!"
      description="Pick up where you left off. Manage your tasks, keep your day organized and stay focused on the work that matters most."
    >
      <div className="auth-form-heading">
        <span className="auth-eyebrow">Sign in</span>
        <h2>Welcome Back</h2>
        <p>Enter your details below to continue to your dashboard.</p>
      </div>

      {error && (
        <div className="auth-error" role="alert">
          <AlertIcon />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <AuthField
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<MailIcon />}
          required
        />
        <AuthField
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          icon={<LockIcon />}
          required
        />

        <button type="submit" className="auth-submit">
          Sign In
          <ArrowIcon />
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Create Account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
