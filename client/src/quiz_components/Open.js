import React from "react"
import axios from "axios"
import styled from "styled-components"
import { Form, TextArea, } from "semantic-ui-react"


class Open extends React.Component {

    
    render() {
        return (
            <ListItem>
                <strong style={{fontFamily: 'menlo'}}>
                    {this.props.question}
                </strong>
                <br />  
                <br />
                <Form>
                    <TextArea style={{fontFamily: 'menlo'}} placeholder='Input your answer...' />
                </Form>
            </ListItem>
        )
    }
}

const ListItem = styled.li`
    padding: 10px;
    font-size: 1.5rem;
    margin: 0 0 20px 0;
    list-style-type: none;
    `
const ChoiceItem = styled.li`
    margin: 10px;
    font-size: 1rem;
    list-style-type: none;
    `


export default Open;