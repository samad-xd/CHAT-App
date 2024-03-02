import { useState } from 'react';
import { signup } from '../../APIs/authAPI';
import './Form.css';

import { Link, useNavigate } from 'react-router-dom';
import Submitting from '../LoadingComponents/Submitting/Submitting';
import { toast } from 'sonner';

export default function SignupForm() {

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);
        const signupData = Object.fromEntries(formData);
        if (signupData.password !== signupData.confirmPassword) {
            setIsSubmitting(false);
            toast.error('Passwords do not match', { duration: 2000 });
            return;
        }
        if (signupData.password.length < 8) {
            setIsSubmitting(false);
            toast.error('Password requires atleast 8 characters', { duration: 2000 });
            return;
        }
        const response = await signup(signupData);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            navigate('/login');
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <div className='login'>
                <h1>Sign Up</h1>
                <form className='login-form'>
                    <input type='text' name='name' placeholder='Name' required={true} />
                    <input type='email' name='email' placeholder='Email' required={true} />
                    <input type="file" name="image" accept='image/*' />
                    <input type='password' name='password' placeholder='Password' required={true} />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' required={true} />
                    {isSubmitting ? <Submitting /> : <button type='submit'>Sign up</button>}
                </form>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </div>
        </div>
    );
}