import React from 'react';
import axios from 'axios';
import Timer from './Timer'
import { Grid, Form, Button, Icon, } from "semantic-ui-react"
import { AuthConsumer, } from "../providers/AuthProvider"
import styled from "styled-components"
import MC from "../quiz_components/MC"
import Open from "../quiz_components/Open"
import TorF from "../quiz_components/TorF"



class TakeQuiz extends React.Component {
    state = { quiz: {}, questions: [], choices: [], questionsIds: [], student_answer: [], }

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
                            this.state.questions.sort()
                        })
                }
            })
    }

    handleSubmit = () => {
        // debugger
        // this.addStudentAnswer()
    }

    addStudentAnswer = (answer) => {
        this.setState({ student_answer: [...this.state.student_answer, answer]})
        // debugger
    }


    render() {
        const quiz_name = this.state.quiz.name
        const quiz_info = this.state.quiz.info
        const quiz_id = this.state.quiz.id
        const anon = this.state.quiz.anon
        document.body.style = 'background: #fff'

        return (

            <Grid divided='vertically'>
                <DescContainer>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "30px", marginTop: "260px", }}>
                        <HeaderText fSize="medium">{quiz_name}</HeaderText>
                        <HeaderText>{quiz_info}</HeaderText>
                        <hr style={{
                            backgroundColor: "#fff",
                            borderRadius: "15px",
                            width: "100%",
                            height: "1px",
                        }} />

                        {anon ?
                            <HeaderText fSize="small">Submission is <strong>Anonymous</strong></HeaderText>
                            :
                            <HeaderText fSize="small">Submission is <strong>Identified</strong></HeaderText>
                        }
                        {anon ?
                            <HeaderText fSize="tiny">The creator of this query won't know who you are.</HeaderText>
                            :
                            <HeaderText fSize="tiny">The creator of this query will know who you are.</HeaderText>
                        }
                        <HeaderText fSize="tiny">Time Remaining:</HeaderText>
                        <HeaderText fSize="tiny">5 minutes</HeaderText>
                    </div>
                </DescContainer>
                <QuesContainer>
                    {/* Depending on the question type it will render a component that formats the question */}
                    <Form onSubmit={this.handleSubmit}>
                        {this.state.questions.map(question => {
                            if (question.qType === "MC") {
                                return <MC
                                    handleSubmit={this.handleSubmit}
                                    question={question.name}
                                    addStudentAnswer={this.addStudentAnswer}
                                    choices={question.choices}
                                    quiz_id={quiz_id}
                                />
                            } else if (question.qType === "open") {
                                return <Open
                                    handleSubmit={this.handleSubmit}
                                    question={question.name}
                                    addStudentAnswer={this.addStudentAnswer}
                                    quiz_id={quiz_id}
                                    handleSubmit={this.handleSubmit}
                                />
                            } else if (question.qType === "TorF") {
                                return <TorF
                                    handleSubmit={this.handleSubmit}
                                    question={question.name}
                                    addStudentAnswer={this.addStudentAnswer}
                                    choices={question.choices}
                                    quiz_id={quiz_id}
                                />
                            }
                        })}
                        <Button style={{ marginTop: "-20", backgroundColor: "#5906A3", borderRadius: "100%", position: "fixed", right: "0", bottom: "0" }} icon>
                            <Icon inverted size="huge" name="paper plane" />
                        </Button>
                    </Form>
                </QuesContainer>
            </Grid>
        )
    }
}


const DescContainer = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// flex-direction: column;
background: #5906A3;
height: 120vh;
width: 40%;
position: fixed;
`

const QuesContainer = styled.div`
// display: flex;
// justify-content: flex-end;
// align-items: center;
// flex-direction: column;
height: 100vh;
width: 60%;
margin-top: 100px;
position: absolute;
right: 0;
top: 0;
`

const HeaderText = styled.h1`
color: white !important;
font-family: menlo;
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