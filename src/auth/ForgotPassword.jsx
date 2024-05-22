import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import InputField from '../components/inputs/InputFields';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateInputs = () => {
    const newErrors = [];


    if (!email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    }
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 1500);
    return newErrors.length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      setIsLoading(true);
      const { success, error } = await forgotPassword(email);
      setIsLoading(false);

      if (success) {
        setEmail('')
        setMessage('Password reset email sent successfully!');
      } else {
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Error sending password reset email. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Account Recovery - Forgot Password</title>
      </Helmet>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recover your Account here by entering your Registered Email
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {message && <p className="mt-2 text-center text-sm text-green-500">{message}</p>}
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? 'Sending Verification...' : 'Forgot'}
              </button>
            </div>
          </form>



          <p className="mt-10 text-center text-sm text-gray-500">
            Account remembered?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
