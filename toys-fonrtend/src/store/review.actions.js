import { showErrorMsg } from '../services/event-bus.service'
import { reviewService } from '../services/review.service'


export function loadReviews(filterBy) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const reviews = await reviewService.query(filterBy)
      dispatch({ type: 'SET_REVIEWS', reviews: reviews })
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
    finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function addReview(review) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const addedReview = await reviewService.add(review)
      dispatch({ type: 'ADD_REVIEW', review: addedReview })
    } catch (err) {
      showErrorMsg('Cannot Add review')
      console.log('ReviewActions: err in addReview', err)
    }
    finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeReview(reviewId) {
  return async dispatch => {
    try {
      await reviewService.remove(reviewId)
      dispatch({ type: 'REMOVE_REVIEW', reviewId })
    } catch (err) {
      console.log('ReviewActions: err in removeReview', err)
    }
  }
}
export function resetReviews() {
  return async dispatch => {
    try {
      dispatch({ type: 'RESET_REVIEWS' })
    } catch (err) {
      console.log('ReviewActions: err in removeReview', err)
    }
  }
}


