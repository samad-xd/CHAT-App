import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from '../../components/Forms/SignupForm';

export default function Signup() {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to='/chat' />
    }

    return (
        <SignupForm />
    );
}