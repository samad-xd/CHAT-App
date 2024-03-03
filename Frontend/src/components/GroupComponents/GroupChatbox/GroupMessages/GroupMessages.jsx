import { format } from 'timeago.js';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../LoadingComponents/Loading/Loading';

export default function GroupMessages({ messages, isLoading }) {

    const user = useSelector(state => state.authReducer.user);

    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='messages'>
            {isLoading && <Loading />}
            {messages.map((message, index) => (
                <div key={index} ref={scroll} className={message.senderId === user._id ? 'message own' : 'message'}>
                    {message.senderId !== user._id && <span className='sender-name'>{message.senderName}</span>}
                    {message.type === 'image' ?
                        <img src={message.text} alt='Image' /> :
                        <div>{message.text}</div>
                    }
                    <span className='time-ago'>{format(message.createdAt)}</span>
                </div>
            ))}
        </div>
    );
}