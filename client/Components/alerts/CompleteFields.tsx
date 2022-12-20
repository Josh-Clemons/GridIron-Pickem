import React from 'react';
import Alert from '@mui/material/Alert';

const CompleteFields = (email, password) => {
    return (
        <div>
            {(email === '' || password === '' ) ? <Alert severity="error">This is an error alert — check it out!</Alert>: <></> }
        </div>
    )
}

export default CompleteFields;