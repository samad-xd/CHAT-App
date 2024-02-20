import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Notifications.css';
import { getAllNotifications, readNotification } from '../../APIs/notificationAPI';
import Loading from '../../components/Loading/Loading';

export default function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);

    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchNotifications() {
            setIsLoading(true);
            const responseData = await getAllNotifications();
            setNotifications(responseData.notifications);
            setIsLoading(false);
        }
        fetchNotifications();
    }, []);

    async function handleClick(notification) {
        await readNotification(notification._id);
        if (notification.type === 'friends') {
            if (notification.action === 'sent') {
                navigate('/friends');
            } else if (notification.action === 'accepted') {
                navigate('/chat');
            }
        } else if (notification.type === 'groups') {
            navigate('/groups')
        }
    }

    function renderNotification(notification) {
        let data;
        if (notification.type === 'friends') {
            let content;
            if (notification.action === 'sent') {
                content = 'sent you a friend request.';
            } else if (notification.action === 'accepted') {
                content = 'accepted your friend request.';
            }
            data = (
                <div className={notification.isRead ? "notification" : "notification unread"}>
                    {notification.from.imageUrl ?
                        <img src={notification.from.imageUrl} alt="profile-picture" /> :
                        <img src="profile-picture.png" alt="profile-picture" />
                    }
                    <div className="notification-content">
                        <strong>{notification.from.name}</strong> {content}
                    </div>
                </div>
            );
        }
        else if (notification.type === 'groups') {
            data = (
                <div className={notification.isRead ? "notification" : "notification unread"}>
                    {notification.group.imageUrl ?
                        <img src={notification.group.imageUrl} alt="profile-picture" /> :
                        <img src="profile-picture.png" alt="profile-picture" />
                    }
                    {notification.from.imageUrl ?
                        <img src={notification.from.imageUrl} alt="profile-picture" /> :
                        <img src="profile-picture.png" alt="profile-picture" />
                    }
                    <div className="notification-content">
                        <strong>{notification.from.name}</strong> added you to a group <strong>{notification.group.name}</strong>
                    </div>
                </div>
            );
        }
        return data;
    }

    return (
        <motion.div
            className="notifications-container"
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
        >
            <div className="notifications">
                <h1>Notifications</h1>
                <hr />
                {isloading && <div className='loading'><Loading /></div>}
                {!isloading &&
                    <div className="notifications-list">
                        {notifications.map(notification => (
                            <div key={notification._id} onClick={() => handleClick(notification)}>
                                {renderNotification(notification)}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </motion.div>
    );
}