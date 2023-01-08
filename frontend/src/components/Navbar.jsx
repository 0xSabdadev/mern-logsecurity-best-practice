import axios from 'axios'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const Logout = async () => {
        try {
            const response = axios.delete('http://localhost:5000/logout')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className='navbar is-light' role='navigation' aria-label='main navigation'>
            <div className='container'>
                <div className='navbar-brand'>
                    <a className='navbar-item' href='https://bulma.io'>
                        <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' />
                    </a>

                    <a
                        role='button'
                        className='navbar-burger burger'
                        aria-label='menu'
                        aria-expanded='false'
                        data-target='navbarBasicExample'>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </a>
                </div>

                <div id='navbarBasicExample' className='navbar-menu'>
                    <div className='navbar-start'>
                        <Link to='/dashboard'>
                            {' '}
                            <a className='navbar-item'>Home</a>
                        </Link>
                    </div>

                    <div className='navbar-end'>
                        <div className='navbar-item'>
                            <div className='buttons'>
                                <button onClick={Logout} className='button is-danger'>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
