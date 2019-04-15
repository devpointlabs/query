import React from "react"
import axios from "axios"
import styled from "styled-components"
import { List, Radio, Form } from "semantic-ui-react";


class MC extends React.Component {
    state = { answer: "", }

    handleOptionChange = changeEvent => {
        let student_answer = changeEvent.target.value
        this.setState({ answer: student_answer })
       
    }

    handleSubmit = (e) => {
        let student_answer = this.state.answer
        this.props.addStudentAnswer(student_answer)
        debugger
    }


    render() {
        return (
            <ListItem>
                <strong style={{ fontFamily: 'menlo' }}>{this.props.question}</strong>
                {/* <fieldset> */}
                    {this.props.choices.map(choice => {
                        return (
                            <ChoiceItem key={choice.id}>
                                <input
                                    type="radio"
                                    name={choice.answer}
                                    id={choice.id}
                                    value={choice.answer}
                                    onChange={this.handleOptionChange}
                                    checked={this.state.answer === choice.answer}
                                    handleSubmit={this.props.handleSubmit}
                                />
                                {choice.answer}
                            </ChoiceItem>
                        )
                    })}
                {/* </fieldset> */}
            </ListItem>
        )
    }
}

const ListItem = styled.li`
    padding: 10px;
    font-size: 1.5rem;
    margin: 0 0 20px 0;
    list-style-type: none;
    font-family: menlo;
    `
const ChoiceItem = styled.li`
    margin: 10px;
    font-size: 1rem;
    list-style-type: none;
    font-family: menlo;
    `

export default MC;