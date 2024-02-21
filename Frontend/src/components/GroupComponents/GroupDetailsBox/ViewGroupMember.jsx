import { Link } from 'react-router-dom';

export default function ViewGroupMember({ member }) {

    return (
        <div className="friend-detail">
            <Link to={`/profile/${member._id}`} className='friend-name-image'>
                {member.imageUrl ?
                    <img src={member.imageUrl} alt="profile-picture" /> :
                    <img src="profile-picture.png" alt="profile-picture" />
                }
                <div>{member.name}</div>
            </Link>
        </div>
    );
}