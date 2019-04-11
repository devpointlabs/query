import React from 'react';
import axios from 'axios';
import Timer from './Timer'
import { Grid, } from "semantic-ui-react"
import { AuthConsumer, } from "../providers/AuthProvider"
import styled from "styled-components"
import MC from "../quiz_components/MC"
import Open from "../quiz_components/Open"
import TorF from "../quiz_components/TorF"



class TakeQuiz extends React.Component {
    state = { quiz: {}, questions: [], choices: [], questionsIds: [], student_choice: "", }

    componentDidMount() {
        const quiz_id = this.props.match.params.id
        axios.get(`/api/quizzes/${quiz_id}`)
            .then(res => {
                this.setState({ quiz: res.data })
            })
        axios.get(`/api/quizzes/${quiz_id}/questions`)
            .then(res1 => {
                for (let ques of res1.data) {
                    let ques_id = ques.id
                    axios.get(`/api/questions/${ques_id}/choices`)
                        .then(res => {
                            this.setState({ questions: [{ ...ques, choices: res.data }, ...this.state.questions] })
                        })
                }
            })
    }


    render() {
        const quiz_name = this.state.quiz.name
        const quiz_info = this.state.quiz.info

        return (
            <Grid divided='vertically'>
                <DescContainer>
                    <div >
                        <HeaderText fSize="medium">{quiz_name}</HeaderText>
                        <HeaderText>{quiz_info}</HeaderText>
                        <HeaderText fSize="small">Submission is <strong>Anonymous</strong></HeaderText>
                        <HeaderText fSize="tiny">The creator of this query won't know</HeaderText>
                        <HeaderText fSize="tiny">which submission belongs to you.</HeaderText>
                        <HeaderText fSize="tiny">Time Remaining:</HeaderText>
                        <HeaderText fSize="tiny">5 minutes</HeaderText>
                    </div>
                </DescContainer>
                <QuesContainer>
                    {/* Depending on the question type it will render a component that formats the question */}
                    {this.state.questions.map(question => {
                        if (question.qType === "MC") {
                            return <MC question={question.name} choices={question.choices} />
                        } else if (question.qType === "open") {
                            return <Open question={question.name} />
                        } else if (question.qType === "TorF") {
                            return <TorF question={question.name} choices={question.choices} />
                        }
                    })}
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
// justify-content: center;
// align-items: center;
flex-direction: column;
height: 100vh;
width: 60%;
`

const HeaderText = styled.h1`
color: white !important;
font-size: ${props => fontSize(props.fSize)} !important;
`
const fontSize = (size) => {
    switch (size) {
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

const QuizList = styled.ul`
    `



export default TakeQuiz



        // <ListItem key={question.id}>
        //     <strong>
        //         {question.qType}
        //     </strong>
        //     <QuizList>
        //         {question.choices.map(choice => {
        //             debugger
        //             return (
        //                 <ChoiceItem>
        //                     {choice.answer}
        //                 </ChoiceItem>
        //             )
        //         })}
        //     </QuizList>
        // </ListItem>