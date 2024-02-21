import './EditProfile.css';
import EditImage from './EditImage';
import EditName from './EditName';
import EditPassword from './EditPassword';
import DeleteAccount from './DeleteAccount';

export default function EditProfile() {

    return (
        <div className="setting-box">
            <h1>Edit Profile</h1>
            <hr />
            <div className='edit-profile'>
                <EditImage />
                <EditName />
                <EditPassword />
                <DeleteAccount />
            </div>
        </div>
    );
}