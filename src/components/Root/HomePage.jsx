import React from 'react'
import Home from '../Home/Home'

export default function HomePage(props) {
    return (
        <div>
            <Home user={props.user}></Home>
        </div>
    )
}
