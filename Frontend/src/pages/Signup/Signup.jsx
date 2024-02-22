import { Navigate, useNavigate } from 'react-router-dom';

import { signup } from '../../APIs/authAPI';
import SignupForm from '../../components/Forms/SignupForm';
import { useSelector } from 'react-redux';
import { makeToast } from '../../utils/toast';

export default function Signup() {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to='/chat' />
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const signupData = Object.fromEntries(formData);
            const response = await signup(signupData);
            if(!makeToast(response)) return;
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SignupForm onSubmit={handleSubmit} />
    );
}