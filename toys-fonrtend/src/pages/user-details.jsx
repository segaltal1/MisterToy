import { Button } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'
import { loadReviews, resetReviews } from '../store/review.actions';

class _UserDetails extends React.Component {
    state = {
        isShowAll: false
    }
    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/')
            return
        }
        this.props.loadReviews({ userId: this.props.user._id })

    }

    toggleReviews = () => {
        this.props.resetReviews()
        const isShowAll = !this.state.isShowAll
        this.setState({ isShowAll }, () => {
            if (!isShowAll) {
                console.log('USER USER');
                this.props.loadReviews({ userId: this.props.user._id })
                return
            }
            this.props.loadReviews()
        })
    }


    render() {
        const { reviews, user } = this.props
        const { isShowAll } = this.state
        return (
            <section className="user-details  flex column align-center gap">
                <h1>  Your Comments</h1>
                {user?.isAdmin &&
                    <Button
                        className="review-admin-btn"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={this.toggleReviews}
                    >Show {isShowAll ? 'Yours' : 'All'}</Button>
                }
                <section className="user-comments flex gap column">
                    {reviews.map((review) => {
                        return <section key={review._id}>
                            <strong>{review.user.fullname}:  </strong>
                            {review.content}
                            <p>{'⭐'.repeat(review.rate)}</p>
                        </section>
                    })

                    }
                </section >
            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        reviews: state.reviewModule.reviews,
    }
}
const mapDispatchToProps = {
    loadReviews,
    resetReviews
}



export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)