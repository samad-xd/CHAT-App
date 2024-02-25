import { useState } from 'react';
import './Form.css';

import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../APIs/authAPI';
import { useDispatch } from 'react-redux';
import { updateLoginState } from '../../store/auth';
import Submitting from '../LoadingComponents/Submitting/Submitting';
import { toast } from 'sonner';

export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);
        const loginData = Object.fromEntries(formData);
        const response = await login(loginData);
        setIsSubmitting(false);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            localStorage.setItem('token', response.data.token);
            dispatch(updateLoginState({ user: response.data.user, AI: response.data.AI, isLoggedIn: true }));
            navigate('/chat');
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <div className='login'>
                <h1>Welcome Back!</h1>
                <form className='login-form'>
                    <input type='email' name='email' placeholder='email' required={true} />
                    <input type='password' name='password' placeholder='password' required={true} />
                    {isSubmitting ? <Submitting /> : <button type='submit'>Login</button>}
                </form>
                <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
            </div>
        </div>
    );
}