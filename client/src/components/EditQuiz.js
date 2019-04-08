import React from "react"
import axios from "axios"
import { Form, Button,  } from "semantic-ui-react"


class EditQuiz extends React.Component {
    state = { name: "", info: ""}

    componentDidMount() {
        const id = this.props.quiz.id
        if (id)
        axios.get(`/api/quizzes/${id}`)
            .then(res => {
                this.setState({ name: res.data.name, info: res.data.info})
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.quiz.id
        const quiz = { ...this.state }
        if (id) 
            axios.put(`/api/quizzes/${id}`, quiz)
            .then( res => {
                this.props.updateQuiz(res.data)
                this.props.toggle()
            })
    }

    handleChange = (e, { name, value, }) => this.setState({ [name]: value,});

    render() {
        const { name, info } = this.state
        return(
            <div style={{ textAlign: "center" }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  placeholder="Update Quiz Name"
                  name="name"
                  value={name}
                  required
                  onChange={this.handleChange}
                />
                <Form.Input
                  placeholder="Update Quiz Description"
                  name="info"
                  value={info}
                  required
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button inverted>Change</Button>
            </Form>
            </div>
        )
    }
}

export default EditQuiz