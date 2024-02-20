import './SidebarLogout.css';

import { motion } from 'framer-motion';

import LogoutIcon from '@mui/icons-material/Logout';
import { updateLogoutState } from '../../../store/auth';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetChatState } from '../../../store/chat';
import { resetGroupState } from '../../../store/group';

export default function SidebarLogout({ open }) {

    const spanVariants = {
        true: {
            opacity: "100%",
            transition: {
                duration: 0.4
            }
        },
        false: {
            opacity: "0%",
            display: "none",
            transition: {
                duration: 0.4
            }
        }
    }

    const iconVariants = {
        true: {},
        false: {
            alignSelf: "center"
        }
    }

    const variants = {
        true: {
            flexDirection: "row",
            width: "70%",
            padding: "10px"
        },
        false: {
            flexDirection: "column",
            width: "50%",
            padding: "5px",
            transition: {
                delay: 0.2
            }
        },
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(updateLogoutState());
        dispatch(resetChatState());
        dispatch(resetGroupState());
        navigate('/login');
    }

    return (
        <motion.div
            className="sidebar-logout"
            initial={`${open}`}
            animate={`${open}`}
            variants={variants}
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
        >
            <motion.span
                initial={`${open}`}
                animate={`${open}`}
                variants={spanVariants}
            >
                Logout
            </motion.span>
            <motion.div
                className="logout-icon"
                initial={`${open}`}
                animate={`${open}`}
                variants={iconVariants}
            >
                <LogoutIcon />
            </motion.div>
        </motion.div>
    );
}