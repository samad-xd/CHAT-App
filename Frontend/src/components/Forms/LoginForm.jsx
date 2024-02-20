import './Form.css';

import { Link } from 'react-router-dom';

export default function LoginForm({ onSubmit }) {
    return (
        <div className="login-container" onSubmit={onSubmit}>
            <div className='login'>
                <h1>Welcome Back!</h1>
                <form className='login-form'>
                    <input type='email' name='email' placeholder='email' required={true}  />
                    <input type='password' name='password' placeholder='password' required={true}  />
                    <button type='submit'>Login</button>
                </form>
                <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
            </div>
        </div>
    );
}