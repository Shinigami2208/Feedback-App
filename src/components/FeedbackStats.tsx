import React, { useContext } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'
import { Feedback } from '../models/feedback'

const FeedbackStats = () => {
  const {feedback} = useContext(FeedbackContext)

  let average =
    feedback.reduce((acc, currentItem: Feedback) => {
      return acc + currentItem.rating
    }, 0) / feedback.length

  average = +average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
