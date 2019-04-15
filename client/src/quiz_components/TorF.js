import React from "react"
import axios from "axios"
import styled from "styled-components"
import { Radio, Form } from "semantic-ui-react"


class TorF extends React.Component {
    state = { answer: "" }

    handleOptionChange = changeEvent => {
        let student_answer = changeEvent.target.value
        this.setState({ answer: student_answer })
        this.props.addStudentAnswer(student_answer)
    }


    render() {
        return (
            <ListItem>
                <strong style={{ fontFamily: 'menlo' }}>{this.props.question}</strong>
                {this.props.choices.map(choice => {
                    return (
                        <ChoiceItem key={choice.id}>
                            <Form.Field>
                                <input
                                    type="radio"
                                    name={choice.answer}
                                    id={choice.id}
                                    value={choice.answer}
                                    onChange={this.handleOptionChange}
                                    checked={this.state.answer === choice.answer}
                                />
                                {choice.answer}
                            </Form.Field>
                        </ChoiceItem>
                    )
                })}
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

export default TorF;