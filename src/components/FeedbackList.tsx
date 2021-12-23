import React, { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import { motion, AnimatePresence } from 'framer-motion'
import { FeedbackContext } from '../context/FeedbackContext'

const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext)
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback yet</p>
  }
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((feedbackItem: Feedback) => (
          <motion.div
            key={feedbackItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem feedbackItem={feedbackItem} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList
