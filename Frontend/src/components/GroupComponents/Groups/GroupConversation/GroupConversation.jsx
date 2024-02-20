import { useDispatch } from 'react-redux';
import './GroupConversation.css';

import { motion } from 'framer-motion';
import { changeSelectedGroup } from '../../../../store/group';

export default function GroupConversation({ group, isSelected }) {

    const dispatch = useDispatch();

    let classes = "conversation";
    let style = { scale: 1.05 };

    if (isSelected) {
        classes += " selected";
        style = {};
    }

    function handleSelect() {
        dispatch(changeSelectedGroup(group));
    }

    return (
        <motion.div
            className={classes}
            whileHover={style}
            onClick={handleSelect}
        >
            {group.imageUrl ? <img src={group.imageUrl} alt="profile-picture" /> : <img src="profile-picture.png" alt="profile-picture" />}
            <div className='group-conversation-details'>
                <div>{group.name}</div>
            </div>
        </motion.div>
    );
}