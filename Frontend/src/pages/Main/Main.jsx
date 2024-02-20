import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

import './Main.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Main() {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(window.location.pathname);
        } else {
            navigate('/home');
        }
    }, []);

    return (
        <div className="main">
            <SideBar />
            <Outlet />
        </div>
    );
}