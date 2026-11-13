import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthField from '../components/AuthField';
import { UserIcon, MailIcon, LockIcon, AlertIcon, ArrowIcon } from '../components/AuthIcons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout
      eyebrow="Get started"
      headline="Turn Plans Into Progress."
      description="Create your account and give every task, idea and deadline a clear place to live so you can focus on making real progress."
    >
      <div className="auth-form-heading">
        <span className="auth-eyebrow">Create account</span>
        <h2>Create Your Account</h2>
        <p>Set up your workspace in a few seconds and start moving forward.</p>
      </div>

      {error && (
        <div className="auth-error" role="alert">
          <AlertIcon />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <AuthField
          id="register-name"
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Morgan"
          autoComplete="name"
          icon={<UserIcon />}
          required
        />
        <AuthField
          id="register-email"
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
          id="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a secure password"
          autoComplete="new-password"
          minLength={6}
          icon={<LockIcon />}
          hint="Use at least 6 characters."
          required
        />

        <button type="submit" className="auth-submit">
          Create Account
          <ArrowIcon />
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
