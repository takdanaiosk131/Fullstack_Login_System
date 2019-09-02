import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                        <a className="navbar-brand" href="#">
                            <img src="./logo192.png"  width="100" height="50"/>
                        </a>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile" > Profile </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin"> SignIn </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup"> SignUp </Link>
                            </li>
                        </ul>
                </nav>
            </div>
        )
    }
}

export default Header