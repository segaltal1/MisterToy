import React from 'react'
import { toyService } from '../services/toy.service'
import { NavLink } from 'react-router-dom'
import chat from '../assets/img/chat.png'
import toyImg from '../assets/img/toy.jpg'
import starImg from '../assets/img/star.png'
import escKey from '../assets/img/esc-key.png'
import { ChatApp } from '../cmps/chat-app'
import { connect } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { Loader } from '../cmps/laoder'
import { loadReviews, addReview, removeReview, resetReviews } from '../store/review.actions';
import Skeleton from '@material-ui/lab/Skeleton';
import { socketService } from '../services/socket.service'




function PopUp(props) {
    return (
        <section className="my-popup">
            <header className="flex align-center">
                <img src={escKey} alt="" /> To Exit
                <button onClick={props.toggleChat}>X</button>
            </header>
            <main>
                {props.children}
            </main>
            <footer> </footer>
        </section>
    )
}


class _ToyDetails extends React.Component {

    state = {
        toy: null,
        isChatOpen: false,
        content: '',
    }
    componentDidMount() {

        window.addEventListener('keydown', this.escFunction, false);
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) {
                    this.props.history.push('/');
                    return
                }
                this.props.loadReviews({ toyId: toy._id })
                // console.log('toy from server:', toy);
                this.setState(prevState => ({
                    ...prevState,
                    toy
                }))
            })
    }
    componentWillUnmount() {
        this.props.resetReviews()
        window.removeEventListener('pkeydown', this.escFunction, false);
    }
    escFunction = (event) => {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.toggleChat()
        }
    }

    toggleChat = () => {
        const isChatOpen = !this.state.isChatOpen
        this.setState({ isChatOpen })
    }
    handleChange = (ev) => {
        this.setState(prevState => ({
            ...prevState,
            content: ev.target.value
        }))
    }

    addReview = async (ev) => {
        ev.preventDefault()
        const review = {
            content: this.state.content,
            toyId: this.state.toy._id,
        }
        await this.props.addReview(review)
        this.setState(prevState => ({
            ...prevState,
            content: ''
        }))


    }

    removeReview = async (reviewId) => {
        await this.props.removeReview(reviewId)
    }
    render() {
        const { toy, isChatOpen, content } = this.state
        const { user, reviews, isLoading } = this.props
        if (!toy) return <Loader />
        return (
            <section className="toy-details-container flex align-center justify-center gap">
                <section className="toy-details flex align-center justify-center gap column">
                    <h1>Toy Details</h1>
                    <h2>Toy Name: {toy.name}</h2>
                    <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                    <img src={toy.img || toyImg} alt="toy" />
                </section>
                <div className="toy-reviews flex column justify-center gap">
                    {user?.isAdmin &&
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                        ><NavLink to={`/toy/edit/${toy._id}`}>Edit Toy</NavLink>
                        </Button>
                    }
                    <section className="flex gap">
                        <h2>Comments</h2>
                    </section>
                    <section className="comments flex column">
                        <form onSubmit={this.addReview} className="flex gap">
                            <TextField
                                id="content"
                                type="text"
                                onChange={this.handleChange}
                                value={content}
                                multiline
                                size="small"
                                maxRows={3}
                                label="Comment"
                                variant={'outlined'}
                                color={'secondary'} />
                            <Button type="submit" variant="outlined" color="primary">Add </Button>
                        </form>
                    </section>
                    {isLoading &&
                        <section className="skeleton-loading">
                            <Skeleton width={100} height={40} />
                            <Skeleton width={80} height={40} />
                            <Skeleton width={100} height={40} />
                            <Skeleton width={80} height={40} />
                        </section>
                    }
                    <ul className="flex column">
                        {
                            reviews.map((review, idx) => <li key={idx}>
                                <span>{`${review.user?.fullname}: `}</span>{review.content}
                                <p>{'⭐'.repeat(review.rate)} <span onClick={() => this.removeReview(review._id)}
                                >🗑</span> </p>
                            </li>)
                        }
                    </ul>
                </div>
                <img src={chat} alt="chat" className="chat-icon" onClick={this.toggleChat} />
                {isChatOpen &&
                    <PopUp toggleChat={this.toggleChat}>
                        <ChatApp toyId={toy._id} user={user} />
                    </PopUp>}
            </section>
        )
    }

}

//ASKING FROM GLOABAL STATE
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        reviews: state.reviewModule.reviews,
        isLoading: state.systemModule.isLoading
    }
}

const mapDispatchToProps = {
    loadReviews,
    addReview,
    removeReview,
    resetReviews
}



export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)