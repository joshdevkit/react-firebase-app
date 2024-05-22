import React, { useState } from 'react';
import InputField from '../components/inputs/InputFields';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import defaultAvatar from '../assets/default.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState(defaultAvatar);

  const { signUpAccount } = useAuth();

  const validateInputs = () => {
    const newErrors = [];

    if (!firstName.trim()) {
      newErrors.push({ field: 'firstName', message: 'First Name is required' });
    }

    if (!lastName.trim()) {
      newErrors.push({ field: 'lastName', message: 'Last Name is required' });
    }

    if (!imageFile) {
      newErrors.push({ field: 'imageFile', message: 'Please upload an avatar' });
    }

    if (!email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    }

    if (!password.trim()) {
      newErrors.push({ field: 'password', message: 'Password is required' });
    }

    if (!confirmPassword.trim()) {
      newErrors.push({ field: 'confirmPassword', message: 'Confirm Password is required' });
    }

    if (password !== confirmPassword) {
      newErrors.push({ field: 'confirmPassword', message: 'Password and Confirm Password do not match' });
    }

    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 1500);
    return newErrors.length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview(defaultAvatar);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
      console.log("Submitting registration form...");
      await signUpAccount(email, password, firstName, lastName, imageFile);
      console.log("Registration successful.");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors([{ field: 'email', message: 'Email is already in use' }]);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Authentication Page - Register</title>
      </Helmet>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 sm:px-10">
            <h2 className="mb-6 text-3xl font-bold text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-x-4">
                <InputField
                  id="firstName"
                  placeholder={"First Name"}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.find((error) => error.field === 'firstName')}
                />
                <InputField
                  id="lastName"
                  placeholder={"Last Name"}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.find((error) => error.field === 'lastName')}
                />
              </div>
              <InputField
                id="email"
                placeholder={"Email Address"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.find((error) => error.field === 'email')}
              />
              <InputField
                id="password"
                placeholder={"Password"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.find((error) => error.field === 'password')}
              />
              <InputField
                id="confirmPassword"
                placeholder={"Confirm Password"}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.find((error) => error.field === 'confirmPassword')}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <label htmlFor="profileImageInput" className="cursor-pointer">
                  <div className="w-36 h-36 rounded-lg overflow-hidden  flex items-center justify-center ml-28">
                    <img src={preview} alt="Profile Preview" className="object-cover flex-shrink-0" />
                  </div>
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {errors.find((error) => error.field === 'imageFile') && (
                  <p className="mt-2 text-sm text-yellow-500 text-center">{errors.find((error) => error.field === 'imageFile').message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
