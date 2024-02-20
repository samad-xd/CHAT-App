import './Form.css';

import { Link } from 'react-router-dom';

export default function SignupForm({ onSubmit }) {
    return (
        <div className="login-container" onSubmit={onSubmit}>
            <div className='login'>
                <h1>Sign Up</h1>
                <form className='login-form'>
                    <input type='text' name='name' placeholder='Name' required={true} />
                    <input type='email' name='email' placeholder='Email' required={true}  />
                    <input type="file" name="image" />
                    <input type='password' name='password' placeholder='Password' required={true}  />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' required={true}  />
                    <button type='submit'>Sign up</button>
                </form>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </div>
        </div>
    );
}