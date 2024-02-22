import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ReplayIcon from '@mui/icons-material/Replay';
import './Groups.css';
import { useEffect, useRef, useState } from 'react';
import GroupConversation from './GroupConversation/GroupConversation';
import NewGroupForm from './NewGroupForm/NewGroupForm';
import { changeGroups } from '../../../store/group';
import { getAllGroupsData } from '../../../APIs/GroupsAPI';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../LoadingComponents/Loading/Loading';

export default function Groups() {

    const groups = useSelector(state => state.groupReducer.groups);

    const selectedGroup = useSelector(state => state.groupReducer.selectedGroup);

    const [filteredGroups, setFilteredGroups] = useState([]);

    const [showDialog, setShowDialog] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const searchRef = useRef('');

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchGroups() {
            setIsLoading(true);
            const response = await getAllGroupsData();
            dispatch(changeGroups(response.data.groups));
            setIsLoading(false);
        }
        fetchGroups();
    }, []);

    function handleSearch() {
        const name = searchRef.current.value;
        const filteredGroupsArray = groups.filter(group => group.name === name);
        setFilteredGroups(filteredGroupsArray);
    }

    function handleReset() {
        searchRef.current.value = '';
        dispatch(changeGroups([...groups]));
    }

    return (
        <motion.div
            className="groups-container"
            initial={{ x: +40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
        >
            <NewGroupForm showDialog={showDialog} setShowDialog={setShowDialog}/>
            <div className="chats">
                <h1>Groups</h1>
                <hr />
                <div className='new-group' onClick={() => setShowDialog(true)}>
                    <span>Create Group</span>
                    <GroupAddIcon />
                </div>
                <div className='search-field'>
                    <input type='text' placeholder='Search' ref={searchRef} />
                    <SearchIcon className='search-icon-2' onClick={handleSearch} />
                    <ReplayIcon className='search-icon-2' onClick={handleReset} />
                </div>
                {isLoading && <Loading />}
                {!isLoading && (
                    <div className="chats-list">
                        {searchRef.current.value === '' &&
                            groups.map(group =>
                                <GroupConversation
                                    key={group._id}
                                    group={group}
                                    isSelected={selectedGroup && selectedGroup._id === group._id}
                                />
                            )
                        }
                        {searchRef.current.value !== '' &&
                            filteredGroups.map(group =>
                                <GroupConversation
                                    key={group._id}
                                    group={group}
                                    isSelected={selectedGroup && selectedGroup._id === group._id}
                                />
                            )
                        }
                    </div>
                )}
            </div>
        </motion.div>
    );
}