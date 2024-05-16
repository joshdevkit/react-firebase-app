import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/inputs/InputFields';
import { Helmet } from 'react-helmet-async';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, loginWithEmailPassword } = useAuth();
  const [errors, setErrors] = useState([]);
  const validateInputs = () => {
    const newErrors = [];


    if (!email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    }

    if (!password.trim()) {
      newErrors.push({ field: 'password', message: 'Password is required' });
    }

    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2500);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      await loginWithEmailPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrors([{ field: 'password', message: 'Invalid Credentails' }]);
      } else if (error.code === 'auth/too-many-requests') {
        setErrors([{ field: 'email', message: 'Too many Attempt please try again later' }]);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Authentication Page - Login</title>
      </Helmet>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>

              <InputField
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.find((error) => error.field === 'email')}
              />


            </div>

            <div>
              <div className="flex items-center justify-between">

              </div>
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.find((error) => error.field === 'password')}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
