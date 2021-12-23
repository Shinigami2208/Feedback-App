import React, { FormEvent, useContext, useEffect, useState } from 'react'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'
import { v4 as uuidv4 } from 'uuid'
import { FeedbackContext } from '../context/FeedbackContext'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState<string>('')
  const [rating, setRating] = useState(10)

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit && feedbackEdit.item) {
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setBtnDisabled(false)
    }
  }, [feedbackEdit])

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    let currentText = event.currentTarget.value
    if (currentText === '') {
      setBtnDisabled(true)
      setMessage('')
    } else if (currentText !== '' && currentText.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage('')
      setBtnDisabled(false)
    }
    setText(currentText)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (feedbackEdit.edit && feedbackEdit.item) {
      const feedbackUpdated = { text, rating, id: feedbackEdit.item.id }
      updateFeedback(feedbackUpdated.id, feedbackUpdated)
    } else if (feedbackEdit.edit === false) {
      const newFeebback = { text, rating, id: uuidv4() }
      addFeedback(newFeebback)
    }
    setText('')
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          rating={rating}
          select={(selected: number) => setRating(selected)}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write your review"
            value={text}
            onChange={handleTextChange}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            {feedbackEdit.edit ? 'Update' : 'Send'}
          </Button>
        </div>
        {message.trim() !== '' && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
