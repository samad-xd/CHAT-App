import './SideBar.css'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';

import SidebarElement from './SidebarElement/SidebarElement';
import SidebarLogout from './SidebarLogout/SidebarLogout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function SideBar() {

    const user = useSelector(state => state.authReducer.user);

    const [open, setOpen] = useState(true);

    const path = window.location.pathname;

    const [activeElement, setActiveElement] = useState('');

    useEffect(() => {
        setActiveElement(path);
    }, [path])

    function handleOpen() {
        setOpen(!open);
    }

    const sidebarVariants = {
        true: {
            width: "13rem"
        },
        false: {
            width: "4rem",
            transition: {
                delay: 0.15
            }
        }
    }

    const profileVariants = {
        true: {
            width: "5rem",
            height: "5rem"
        },
        false: {
            width: "3rem",
            height: "3rem"
        }
    }

    const nameVariants = {
        true: {
            opacity: "100%",
            transition: {
                delay: 0.15,
            }
        },
        false: {
            opacity: "0%",
            transition: {
                duration: 0
            }
        }
    }

    return (
        <div className="sidebar-container">
            <motion.div
                className='sidebar'
                initial={`${open}`}
                animate={`${open}`}
                variants={sidebarVariants}
            >
                <motion.div
                    className="toggle-icon"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.07 }}
                    onClick={handleOpen}
                >
                    {open ? <SwitchRightIcon /> : <SwitchLeftIcon />}
                </motion.div>
                {user &&
                    <motion.div
                        className="profile-pic"
                        initial={`${open}`}
                        animate={`${open}`}
                        variants={profileVariants}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Link to={`/profile/${user._id}`}>
                            {user?.imageUrl ?
                                <img src={user.imageUrl} alt="profile-picture" /> :
                                <img src="profile-picture.png" alt="profile-picture" />
                            }
                        </Link>
                        <motion.div
                            initial={`${open}`}
                            animate={`${open}`}
                            variants={nameVariants}
                        >
                            {user.name.split(' ')[0]}
                        </motion.div>
                    </motion.div>
                }
                <div className="sidebar-elements">
                    <SidebarElement
                        open={open}
                        isActive={activeElement === '/chat'}
                        setActiveElement={setActiveElement}
                        icon={<ChatBubbleIcon />}
                        name={'Chats'}
                        path='/chat'
                    />
                    <SidebarElement
                        open={open}
                        isActive={activeElement === '/groups'}
                        setActiveElement={setActiveElement}
                        icon={<GroupsIcon />}
                        name={'Groups'}
                        path='/groups'
                    />
                    <SidebarElement
                        open={open}
                        isActive={activeElement === '/friends'}
                        setActiveElement={setActiveElement}
                        icon={<PersonAddIcon />}
                        name={'Add Friends'}
                        path='/friends'
                    />
                    <SidebarElement
                        open={open}
                        isActive={activeElement === '/notifications'}
                        setActiveElement={setActiveElement}
                        icon={<NotificationsIcon />}
                        name={'Notifications'}
                        path='/notifications'
                    />
                    <SidebarElement
                        open={open}
                        isActive={activeElement === '/settings'}
                        setActiveElement={setActiveElement}
                        icon={<SettingsIcon />}
                        name={'Settings'}
                        path='/settings'
                    />
                </div>
                <SidebarLogout open={open} />
            </motion.div>
        </div >
    );
}