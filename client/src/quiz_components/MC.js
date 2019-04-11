import React from "react"
import axios from "axios"
import styled from "styled-components"
import { List, Radio, Form } from "semantic-ui-react";


class MC extends React.Component {
    state = { answer: "" }

    handleChange = (e, { name, value, }) => this.setState({ [name]: value,});


    render() {
        return (
            <ListItem>
                <strong style={{ fontFamily: 'menlo' }}>{this.props.question}</strong>
                {this.props.choices.map(choice => {
                    return (
                        <Form.Field>
                            <ChoiceItem key={choice.id}>
                                <Radio 
                                label={choice.answer} 
                                name="answer" 
                                value={this.state.answer}
                                onChange={this.handleChange}
                                />
                            </ChoiceItem>
                        </Form.Field>
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

export default MC;