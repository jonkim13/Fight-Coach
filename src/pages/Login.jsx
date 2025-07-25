import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      let userCred;
      if (isNewUser) {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        setMessage(`Account created for ${userCred.user.email}`);
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
        setMessage(`Welcome back ${userCred.user.email}`);
      }
  
      const user = userCred.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        console.log('Profile exists, redirecting to dashboard');
        navigate('/dashboard');
      } else {
        console.log('Profile missing, redirecting to setup');
        navigate('/setup-profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  


  return (
    <div className="login-container">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Left Panel */}
      <div className="login-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={isNewUser ? 'signup' : 'login'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="login-transition"
          >
            <h1>{isNewUser ? 'Create Your Account' : 'Login to Your Account'}</h1>

            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="sign-in-btn">
                {isNewUser ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={isNewUser ? 'signup-right' : 'login-right'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="login-transition"
          >
            <h2>{isNewUser ? 'Already have an account?' : 'New Here?'}</h2>
            <p>
              {isNewUser
                ? 'Login to access your account!'
                : 'Sign up and unlock your full potential!'}
            </p>
            <button
              className="sign-up-btn"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              {isNewUser ? 'Sign In' : 'Sign Up'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Login;
