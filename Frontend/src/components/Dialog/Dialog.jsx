import { useEffect, useRef } from 'react';
import './Dialog.css';

import CloseIcon from '@mui/icons-material/Close';

export default function Dialog({ showDialog, setShowDialog, children }) {

    const dialogRef = useRef(null);

    useEffect(() => {
        if (showDialog) {
            dialogRef?.current.showModal();
        }
        else {
            dialogRef?.current.close();
        }
    }, [showDialog]);

    return (
        <dialog ref={dialogRef}>
            <div className="modal">
                <CloseIcon className='close-button' onClick={() => setShowDialog(false)} />
                {children}
            </div>
        </dialog>
    );
}