import './ChatAI.css';

import { motion } from 'framer-motion';

export default function ChatAI({ AI, selectUser, isSelected }) {

    let classes = "conversation";
    let style = { scale: 1.05 };

    if (isSelected) {
        classes += " selected";
        style = {};
    }

    return (
        <motion.div
            className={classes}
            whileHover={style}
            onClick={() => selectUser(AI)}
        >
            <img src="bot-face.png" alt="bot-face" />
            <div className='conversation-details'>
                <div>Friendly AI</div>
                <div>Online</div>
            </div>
        </motion.div>
    );
}