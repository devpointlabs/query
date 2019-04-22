import React from 'react'
import Navbar from './Navbar'

const QuizTimeOut = () => {
  return (
    <>
      <Navbar />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white"
        }}
      >
        This quiz has timed out. 
      </h1>
    </>
  )
}

export default QuizTimeOut;