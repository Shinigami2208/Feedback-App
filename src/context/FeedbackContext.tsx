import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

interface Props {
  children: React.ReactNode
}

interface ContextType {
  feedback: Feedback[]
  deleteFeedback: (id: string) => void
  addFeedback: (newFeedback: Feedback) => void
  editFeedback: (newFeedback: Feedback) => void
  feedbackEdit: { item: Feedback | null; edit: boolean }
  updateFeedback: (id: string, updFeedback: Feedback) => void
}

export const FeedbackContext = createContext<ContextType>({
  feedback: [],
  deleteFeedback: (id: string) => {},
  addFeedback: (newFeedback: Feedback) => {},
  editFeedback: (newFeedback: Feedback) => {},
  updateFeedback: (id: string, updFeedback: Feedback) => {},
  feedbackEdit: { item: null, edit: false },
})

export const FeedbackProvider = ({ children }: Props) => {
  const [feedback, setFeedback] = useState<Feedback[]>(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState<{
    item: Feedback | null
    edit: boolean
  }>({
    item: null,
    edit: false,
  })

  const deleteFeedback = (id: string) => {
    setFeedback(() => {
      return feedback.filter((feedback: Feedback) => feedback.id !== id)
    })
  }

  const addFeedback = (newFeedback: Feedback) => {
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item: Feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = (id: string, updItem: Feedback) => {
    setFeedback(
      feedback.map((item: Feedback) =>
        item.id === id ? { ...item, ...updItem } : item
      )
    )
    setFeedbackEdit({
      item: null,
      edit: false,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
