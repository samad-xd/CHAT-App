import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/Forms/LoginForm';

export default function Login() {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return (
        <LoginForm />
    );
}