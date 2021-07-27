import React from 'react'
import SignUp from '../SignUp/SignUp'

export default function SignUpPage(props) {
    return (
        <div style={{ backgroundImage: "URL('back2.jpg')" }}>
            <SignUp  user={props.user} setUser={props.setUser} update={props.update} userRole={props.userRole} />
        </div>
    )
}
