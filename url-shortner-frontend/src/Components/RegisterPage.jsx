import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/api';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post('/api/auth/public/register', data);
      reset();
      navigate('/login');
      toast.success('Registration Successful!');
    } catch (error) {
      console.error(error);
      toast.error('Registration Failed!');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex justify-center items-center px-4 py-10">
      <motion.form
        onSubmit={handleSubmit(registerHandler)}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 border border-slate-500"
      >
        <h1 className="text-center font-extrabold text-3xl text-btnColor mb-1 tracking-tight">
          Register Here
        </h1>
        <hr className="mt-2 mb-6 border-slate-300" />

        <div className="flex flex-col gap-5">
          <TextField
            label="UserName"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 mt-6 rounded-md hover:text-slate-200 hover:shadow-lg transition-all duration-200"
        >
          {loader ? 'Loading...' : 'Register'}
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?
          <Link
            className="ml-1 font-semibold underline hover:text-black text-btnColor"
            to="/login"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
