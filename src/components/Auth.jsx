import React, { useState } from 'react';
import { 
  Mail, Lock, User, Phone, Eye, EyeOff, Zap, 
  ArrowRight, CheckCircle, AlertCircle,
  X // <-- ADDED THE 'X' ICON HERE
} from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // Removed googleProvider
import './Auth.css'; // This will now load the new Neon CSS

const Auth = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    loginIdentifier: '' // for username or email login
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate phone number
  const isValidPhone = (phone) => {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
  };

  // Sign Up Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.username || formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.phoneNumber && !isValidPhone(formData.phoneNumber)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Update user profile with username
      await updateProfile(userCredential.user, {
        displayName: formData.username
      });

      // Store user data in Firestore
     await setDoc(doc(db, 'users', userCredential.user.uid), {
  uid: userCredential.user.uid,
  username: formData.username,
  email: formData.email,
  phoneNumber: formData.phoneNumber || '',
  createdAt: serverTimestamp(),
  lastLogin: serverTimestamp(),
  accountType: 'email',
  role: "user",   // ✅ default role assigned here
  isActive: true,
  preferences: {
    notifications: true,
    theme: 'dark'
  }
});


      setSuccess('Account created successfully!');
      setTimeout(() => {
        onAuthSuccess && onAuthSuccess(userCredential.user);
      }, 1500);

    } catch (error) {
      console.error('Sign up error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(error.message || 'Failed to create account');
      }
    } finally {
      setLoading(false);
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const identifier = formData.loginIdentifier;
    const password = formData.password;

    if (!identifier || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Check if identifier is email or username
      let email = identifier;
      
      // If it's not an email format, treat it as username
      if (!isValidEmail(identifier)) {
        // In a real app, you'd query Firestore to get email by username
        // For now, we'll show an error
        setError('Please use your email address to login');
        setLoading(false);
        return;
      }

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      // Update last login in Firestore
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        { lastLogin: serverTimestamp() },
        { merge: true }
      );

      setSuccess('Login successful!');
      setTimeout(() => {
        onAuthSuccess && onAuthSuccess(userCredential.user);
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else {
        setError(error.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Handler - REMOVED

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-header">
          <div className="auth-logo">
            <Zap size={32} />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to access your energy dashboard' : 'Join EnergyVerse 2.0 today'}</p>
        </div>

        {error && (
          <div className="auth-alert error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert success">
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleSignUp} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>
                <User size={18} />
                <span>Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label>
                <Mail size={18} />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-group">
              <label>
                <Mail size={18} />
                <span>Email or Username</span>
              </label>
              <input
                type="text"
                name="loginIdentifier"
                placeholder="Enter your email or username"
                value={formData.loginIdentifier}
                onChange={handleInputChange}
                required={isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>
              <Lock size={18} />
              <span>Password</span>
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>
                <Phone size={18} />
                <span>Phone Number (Optional)</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-footer">
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="btn-auth-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span>{isLogin ? 'Login' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* REMOVED Google Button and Divider */}

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

