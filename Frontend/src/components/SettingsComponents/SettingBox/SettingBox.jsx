import BlockedUsers from './BlockedUsers/BlockedUsers';
import EditProfile from './EditProfile/EditProfile';
import './SettingBox.css';
import { motion } from 'framer-motion';

export default function SettingBox({ selectedOption }) {

    return (
        <motion.div
            className="setting-box-container"
            initial={{ x: +80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
        >
            {selectedOption === 'blocked-users' && <BlockedUsers />}
            {selectedOption === 'edit-profile' && <EditProfile />}
        </motion.div>
    );
}