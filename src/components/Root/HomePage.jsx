import React from 'react'
import Footer from '../Footer/Footer'
import Home from '../Home/Home'

export default function HomePage(props) {
    return (
        <div>
            <Home getDate={props.getDate} user={props.user}></Home>
            
        </div>
    )
}
