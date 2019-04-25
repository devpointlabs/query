import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import SubChoices from './SubChoices'
import QuizSideInfo from './QuizSideInfo'
import Navbar from '../Navbar'
import {useWindowWidth, } from '../../hooks/useWindowWidth'

const StudentResults = (props) => {
  const { quiz_id, sub_id, } = props.location.state
  const width = useWindowWidth();

  if (width < 500)
    return(
      <>
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
      </>

    )
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
  grid-template-columns: 40vw auto; 
  margin: 0;
`

const Purple = styled.div`
  background: #5906A3;
  position: fixed;
  width: 40vw;
  height: 100vh
`

const Questions = styled.div`
  grid-column-start: 2;
  bakground-color: white !important;
  padding: 25px;
`

const QDiv = styled.div`
  padding: 25px;
  bakground-color: white !important;
`

const QHead = styled.h3`
  font-family: menlo;
`

// const QDiv = styled.div`
//   font-family: menlo;
//   padding: 10px;
// `

export default StudentResults
