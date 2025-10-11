import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import css from './SignInForm.module.css';
import Logo from '../Logo/Logo';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const signInValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(7, 'Password must be at least 7 characters long')
        .required('Password is required')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must contain at least one letter and one number, only Latin letters are allowed'
        ),
});

export default function SignInForm() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInValidationSchema),
    });

    const onSubmit = (data) => {
        dispatch(login(data))
            .unwrap()
            .then(() => {
                toast.success('Welcome back! Stay fit! 💪', {
                    duration: 2000,
                });
            })
            .catch((error) => {
                toast.error(
                    "Your email or password is incorrect🙈",
                    {
                        duration: 4000,
                    }
                );
            });
    };

    return (
        <div className={css.container}>
            <div className={css.section}>
                <Logo />
                <h1 className={css.title}>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.field}>
                        <label className={css.email}>Email</label>
                        <input
                            className={errors.email ? css.errorInput : css.firstInput}
                            type="text"
                            placeholder="Enter your email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className={css.error}>{errors.email.message}</p>
                        )}
                    </div>
                    <div className={css.field}>
                        <label className={css.password}>Password</label>
                        <div className={css.toggle}>
                            <input
                                className={errors.password ? css.errorIn : css.secondInput}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...register('password')}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className={css.iconOne}
                            >
                                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </div>
                        </div>
                        {errors.password && (
                            <p className={css.error}>{errors.password.message}</p>
                        )}
                    </div>

                    <button type="submit" className={css.button}>
                        Sign In
                    </button>
                    <p className={css.text}>
                        Don`t have an account?
                        <Link to="/signup" className={css.link}>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
