import './Home.css';
import Landing from "../../components/Landing/Landing";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Home() {

    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to='/chat' />
    }

    return (
        <div className="home">
            <Landing />
        </div>
    );
}