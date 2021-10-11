import { showSuccessMsg } from '../services/event-bus.service.js'

import React from 'react'
import { connect } from 'react-redux'


class _AppFooter extends React.Component {

    state = {
        isCartShown: false,
    }

    componentDidMount() { }

    removeFromCart = (toyId) => {
        this.props.dispatch({
            type: 'REMOVE_FROM_CART',
            toyId
        })
    }
    checkout = () => {
        showSuccessMsg('Charged you: $' + this.cartTotal.toLocaleString())
        this.props.dispatch({
            type: 'CLEAR_CART',
        })
    }
    get cartTotal() {
        return this.props.cart.reduce((acc, toy) => acc + toy.price, 0)
    }

    render() {
        return <div></div>
        // const { isCartShown } = this.state
        // const { count, cart } = this.props;
        // return (
        //     <footer>
        /* <p>
                    coffeerights 2021 - count: {count}
                </p>
                {cart.length > 0 &&
                    <h5>
                        <span>{cart.length}</span> Products in your Cart
                        <button className="btn-link" onClick={(ev) => {
                            ev.preventDefault();
                            this.setState(prevState => ({ isCartShown: !prevState.isCartShown }))
                        }}>
                            ({(isCartShown) ? 'hide' : 'show'})
                        </button>
                    </h5>
                }
                {isCartShown && cart.length > 0 && <section className="cart" >
                    <h5>Your Cart</h5>
                    <ul>
                        {
                            cart.map((toy, idx) => <li key={idx}>
                                <button onClick={() => {
                                    this.removeFromCart(car._id)
                                }}>x</button>
                                {toy.vendor}
                            </li>)
                        }
                    </ul>
                    <p>Total: ${this.cartTotal.toLocaleString()} </p>
                    <button onClick={this.checkout}>Checkout</button>
                </section>} */}
    // </footer>
    // )
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        cart: state.toyModule.cart
    }
}

export const AppFooter = connect(mapStateToProps)(_AppFooter)