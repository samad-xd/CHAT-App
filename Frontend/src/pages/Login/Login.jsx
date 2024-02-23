import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../components/Forms/LoginForm';
import { login } from '../../APIs/authAPI';
import { updateLoginState } from '../../store/auth';
import { makeToast } from '../../utils/toast';

export default function Login() {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const loginData = Object.fromEntries(formData);
            const response = await login(loginData);
            if(!makeToast(response)) return;
            localStorage.setItem('token', response.data.token);
            dispatch(updateLoginState({ user: response.data.user, AI: response.data.AI, isLoggedIn: true }));
            navigate('/chat');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LoginForm onSubmit={handleSubmit} />
    );
}