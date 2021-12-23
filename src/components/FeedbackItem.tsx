import React, { useContext } from 'react'
import Card from './shared/Card'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { FeedbackContext } from '../context/FeedbackContext'
interface Props {
  feedbackItem: Feedback
}

const FeedbackItem = ({ feedbackItem }: Props) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  const handleDeleteItem = () => {
    let isOk = window.confirm('Are you sure you want to delete this feedback?')
    if (isOk) {
      deleteFeedback(feedbackItem.id)
    }
  }

  const handleEditItem = () => {
    editFeedback(feedbackItem)
  }

  return (
    <Card>
      <div className="num-display">{feedbackItem.rating}</div>
      <button onClick={handleEditItem} className="edit">
        <FaEdit color="purple" />
      </button>
      <button onClick={handleDeleteItem} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{feedbackItem.text}</div>
    </Card>
  )
}

export default FeedbackItem
