import React from 'react'
import { connect } from 'react-redux'

import logo from '../assets/img/logo.jpg'
import carToy from '../assets/img/car-toy.webp'
import cubeToy from '../assets/img/cube-toy.webp'
import toolsToy from '../assets/img/tools-toy.webp'

class _HomePage extends React.Component {
    state = {}

    changeCount = (diff) => {
        console.log('Changing count by:', diff);
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }

    render() {
        return (
            <section className="home-page main-container  fs30 flex column align-center">
                <img src={logo} alt="Logo" />
                <section className="main-text">
                    <p>Welcome Toys  </p>
                    <p>Shop.</p>
                </section>
                <h1>OUR LATEST ARRIVALS</h1>
                <section className="cards-img flex column gap">
                    <img src={carToy} alt="carToy" />
                    <img src={cubeToy} alt="cubeToy" />
                    <img src={toolsToy} alt="toolsToy" />
                </section>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)