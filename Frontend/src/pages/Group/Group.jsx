import Groups from '../../components/GroupComponents/Groups/Groups';
import GroupChatbox from '../../components/GroupComponents/GroupChatbox/GroupChatbox';
import './Group.css';
import { useState } from 'react';
import GroupDetailsBox from '../../components/GroupComponents/GroupDetailsBox/GroupDetailsBox';

export default function Group() {

    const [showGroupDetails, setShowGroupDetails] = useState(false);

    return (
        <div className="group">
            <Groups />
            {showGroupDetails ?
                <GroupDetailsBox setShowGroupDetails={setShowGroupDetails} /> :
                <GroupChatbox setShowGroupDetails={setShowGroupDetails} />
            }
        </div>
    );
}