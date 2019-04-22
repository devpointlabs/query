import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import SubChoices from './SubChoices'
import QuizSideInfo from './QuizSideInfo'
import Navbar from '../Navbar'

const StudentResults = (props) => {
  const { quiz_id, sub_id, } = props.location.state
  

  return (
    <>
    <Grid>
      <Purple>
        <Navbar />
        <QuizSideInfo quiz_id={quiz_id} sub_id={sub_id}  />
      </Purple>
      <Questions>
        <SubChoices
        quiz_id={quiz_id}
        sub_id={sub_id}
        />
      </Questions>
    </Grid>
    </>
  )

}

const Grid = styled.div`
  display: grid;
  font-family: menlo;
  grid-template-columns: 2fr 3fr;
  height: 100vh;
  margin: 0;
`

const Purple = styled.div`
  display: grid;
  background: #5906A3;
  align-items: center;
  padding: 15px;
`

const Questions = styled.div`
  padding: 25px;
  bakground-color: white !important;
`

const QHead = styled.h3`
  font-family: menlo;
`

const QDiv = styled.div`
  font-family: menlo;
  padding: 10px;
`

export default StudentResults
