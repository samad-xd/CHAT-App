import { format } from 'timeago.js';
import { useEffect, useRef } from 'react';
import Loading from "../../../Loading/Loading";
import { useSelector } from 'react-redux';

export default function Messages({ isLoading, messages }) {

    const user = useSelector(state => state.authReducer.user);

    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='messages'>
            {isLoading && <div className='loading'><Loading /></div>}
            {!isLoading && messages.map((message, index) => (
                <div key={index} ref={scroll} className={message.senderId === user._id ? 'message own' : 'message'}>
                    <div>{message.text}</div>
                    <span className='time-ago'>{format(message.createdAt)}</span>
                </div>
            ))}
        </div>
    );
}