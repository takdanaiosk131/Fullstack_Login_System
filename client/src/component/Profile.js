import React from 'react';
import Header from './Header'
import Footer from './Footer'

const Profile = (props) => {
// console.log(props)
return (
    <div>
        <Header />
        <h1>Hello {props.email}</h1>
        <button type="button" onClick={() => props.onLogOut()} >LOGOUT</button>
         <Footer company="Takdanai" email="Petch@gmail.com" />
    </div>
)
}

export default Profile