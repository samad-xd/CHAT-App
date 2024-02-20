import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';

export default function GroupChatboxHeader({ setShowGroupDetails }) {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    return (
        <div>
            <div className="chatbox-header">
                {group.imageUrl ? <img src={group.imageUrl} alt="profile-picture" /> : <img src="profile-picture.png" alt="profile-picture" />}
                <div className='chat-profile'>
                    <div>
                        <div className='chat-name'>{group.name}</div>
                    </div>
                    <div className='profile-details' onClick={() => setShowGroupDetails(true)}>
                        <InfoIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}