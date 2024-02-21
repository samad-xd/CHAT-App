import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import './GroupDetailsBox.css';
import MembersActions from './MembersActions';
import EditGroupImage from './EditGroupImage';
import EditGroupName from './EditGroupName';
import GroupLeaveOrDelete from './GroupLeaveOrDelete';
import { useSelector } from 'react-redux';

export default function GroupDetailsBox({ setShowGroupDetails }) {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    return (
        <motion.div
            className="group-details-container"
            initial={{ x: +80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
        >
            {group &&
                <div className="group-details-box">
                    <div className='close-button' onClick={() => setShowGroupDetails(false)}><CloseIcon /></div>
                    <h1>Edit Group</h1>
                    <hr />
                    <div className='edit-group'>
                        <EditGroupImage />
                        <EditGroupName />
                        <MembersActions />
                        <GroupLeaveOrDelete setShowGroupDetails={setShowGroupDetails} />
                    </div>
                </div>
            }
        </motion.div>
    );
}