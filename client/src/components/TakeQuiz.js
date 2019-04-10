import React from 'react';
import axios from 'axios';
import Timer from './Timer'
import {Grid, } from "semantic-ui-react"
import { AuthConsumer, } from "../providers/AuthProvider"
import styled from "styled-components"



class TakeQuiz extends React.Component {
    state = { quiz: {}, questions: [], choices: [], student_choice: "", }
    componentDidMount() {
        axios.get(`/api/quizzes/${this.props.match.params.id}`)
        .then(res => {
            this.setState({ quiz: res.data })
        });
    }
    render() {
       

        const { name, info } = this.state.quiz
        
        return (
        <Grid divided='vertically'>
          <DescContainer>
              <div >
                <HeaderText fSize="medium">{name}</HeaderText>
                <HeaderText>{info}</HeaderText>
                <HeaderText fSize="small">Submission is <strong>Anonymous</strong></HeaderText>
                <HeaderText fSize="tiny">The creator of this query won't know</HeaderText>
                <HeaderText fSize="tiny">which submission belongs to you.</HeaderText>
                <HeaderText fSize="tiny">Time Remaining:</HeaderText>
                <HeaderText fSize="tiny">5 minutes</HeaderText>
              </div>
            </DescContainer>
            <QuesContainer>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
            </QuesContainer>
        </Grid>
        )
    }
}


const DescContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background: #6D55A3;
height: 100vh;
width: 40%
`

const QuesContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
width: 60%;
`

const HeaderText = styled.h1`
  color: white !important;
  font-size: ${props => fontSize(props.fSize)} !important;
`
const fontSize = (size) => {
    switch(size) {
    case 'large':
        return '4rem';
    case 'medium':
        return '2rem';
    case 'small':
        return '1.5rem';
    case 'tiny':
        return '.75rem';
    default:
        return '1rem';
    }
  }


export default TakeQuiz