import { format } from 'timeago.js';
import { useEffect, useRef } from 'react';
import Loading from "../../../Loading/Loading";
import { useSelector } from 'react-redux';

export default function GroupMessages({ messages, isLoading }) {

    const user = useSelector(state => state.authReducer.user);

    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='messages'>
            {isLoading && <div className='loading'><Loading /></div>}
            {messages.map((message, index) => (
                <div key={index} ref={scroll} className={message.senderId === user._id ? 'message own' : 'message'}>
                    {message.senderId !== user._id && <span className='sender-name'>{message.senderName}</span>}
                    <div>{message.text}</div>
                    <span className='time-ago'>{format(message.createdAt)}</span>
                </div>
            ))}
        </div>
    );
}