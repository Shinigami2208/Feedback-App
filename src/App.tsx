import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutIconLink from './components/AboutIconLink'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from './components/Header'
import { FeedbackProvider } from './context/FeedbackContext'
import AboutPage from './pages/AboutPage'

const App = () => {

  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header
          text="Feedback App"
          bgColor="rgba(0,0,0,0.4)"
          textColor="#ff6a95"
        />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />

            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  )
}

export default App
