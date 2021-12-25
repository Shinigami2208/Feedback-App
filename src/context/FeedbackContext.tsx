import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { Feedback } from '../models/feedback'

interface Props {
  children: React.ReactNode
}

interface ContextType {
  feedback: Feedback[]
  deleteFeedback: (item: Feedback) => void
  addFeedback: (newFeedback: Feedback) => void
  editFeedback: (newFeedback: Feedback) => void
  feedbackEdit: { item: Feedback | null; edit: boolean }
  updateFeedback: (updFeedback: Feedback) => void
  isLoading: boolean
}

export const FeedbackContext = createContext<ContextType>({
  feedback: [],
  deleteFeedback: (item: Feedback) => {},
  addFeedback: (newFeedback: Feedback) => {},
  editFeedback: (newFeedback: Feedback) => {},
  updateFeedback: (updFeedback: Feedback) => {},
  feedbackEdit: { item: null, edit: false },
  isLoading: true,
})

export const FeedbackProvider = ({ children }: Props) => {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [feedbackEdit, setFeedbackEdit] = useState<{
    item: Feedback | null
    edit: boolean
  }>({
    item: null,
    edit: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`/feedback?_sort=id&_order=desc`)
      setFeedback(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFeedback = async (item: Feedback) => {
    try {
      await axios.delete(`/feedback/${item.id}`)
      setFeedback(() => {
        return feedback.filter((feedback: Feedback) => feedback.id !== item.id)
      })
    } catch (error) {}
  }

  const addFeedback = async (newFeedback: Feedback) => {
    console.log(newFeedback)
    try {
      let res = await axios.post('/feedback', newFeedback)
      setFeedback([res.data, ...feedback])
    } catch (error) {
      console.log(error)
    }
  }

  const editFeedback = (item: Feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = async (updItem: Feedback) => {
    try {
      await axios.put(`/feedback/${updItem.id}`, updItem)
      setFeedback(
        feedback.map((item: Feedback) =>
          item.id === updItem.id ? { ...item, ...updItem } : item
        )
      )
      setFeedbackEdit({
        item: null,
        edit: false,
      })
    } catch (error) {
      console.log(error)
    }
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
