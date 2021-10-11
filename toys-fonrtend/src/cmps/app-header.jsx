import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router";


import { onLogin, onLogout, onSignup } from '../store/user.actions.js'
import { UserMsg } from './user-msg.jsx'
import { Button } from '@material-ui/core';
import Hamburger from 'hamburger-react';

class _AppHeader extends React.Component {
    state = {
        isOpen: false
    }
    onLogout = () => {
        this.props.onLogout()
        this.props.history.push('/')
    }
    setOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }




    render() {
        const { isOpen } = this.state
        const { user } = this.props
        return (
            <header className="main-header">
                <div className="header-content main-container">

                    <h1 className="logo" onClick={() => this.props.history.push('/')}>Toys</h1>
                    <Hamburger toggled={isOpen} toggle={this.setOpen} />
                    <nav className={isOpen ? 'main-nav open' : 'main-nav'} onClick={() => this.setState({ isOpen: false })}>
                        <NavLink to="/" name="check">Home</NavLink>
                        <NavLink to="/toy" name="check">Toys</NavLink>
                        <NavLink to="/toy/dashboard">Dashboard</NavLink>
                        <NavLink to="/about">About</NavLink>
                        {!user && <NavLink to="/login">Login</NavLink>}
                        {user &&
                            <div className="user-info flex column align-center">
                                <NavLink className="user-link" to="/userdetails"><span>Hello, {user.fullname} </span></NavLink>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={this.onLogout}
                                >Logout</Button>
                            </div>}


                    </nav>
                </div>
                {/* {user && <section className="user-info">
                    <p>{user.fullname} <span>{user.score}</span></p>
                    <button onClick={this.onLogout}>Logout</button>
                </section>}
                {!user && <section className="user-info"> */}
                {/* <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} /> */}
                {/* </section>} */}


                <UserMsg />
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout
}



export const AppHeader = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AppHeader))