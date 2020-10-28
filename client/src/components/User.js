import React from 'react';


function User(props) {
    return (
        <>
            <strong>Username:</strong> {props.user.username}<br />
            <strong>Email:</strong> {props.user.email}<br />
            <strong>Email:</strong> {props.user.bio}<br />
            <hr />
        </>
    );
}
export default User;