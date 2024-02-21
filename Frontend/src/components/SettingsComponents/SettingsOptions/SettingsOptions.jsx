import { motion } from 'framer-motion';

import './SettingsOptions.css';

export default function SettingsOptions({ selectedOption, setSelectedOption }) {

    return (
        <motion.div
            className="settings-container"
            initial={{ x: +40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
        >
            <div className="settings-box">
                <h1>Settings</h1>
                <hr />
                <div className='settings-options'>
                    <motion.div
                        className={selectedOption === 'edit-profile' ? 'settings-option-active' : 'settings-option'}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedOption('edit-profile')}
                    >
                        Edit Profile
                    </motion.div>
                    <motion.div
                        className={selectedOption === 'blocked-users' ? 'settings-option-active' : 'settings-option'}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedOption('blocked-users')}
                    >
                        Blocked Users
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}