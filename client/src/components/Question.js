import React from 'react';
import axios from 'axios';

class Question extends React.Component {
  state = { choices: []}
  componentDidMount() {
    axios.get(`/api/questions/${this.props.id}/choices`)
      .then( res => (
        this.setState({ choices: res.data, })
      ))
  }

  render() {
    const { name, qType, explanation } = this.props
    const { choices, } =  this.state;
    return (
      <>
        <li>{name} : {qType} : explanation : {explanation}</li>
        <ul>
          {choices.map( c => (
            <li key={c.id}>{c.answer}</li>
          ))}
        </ul>
      </>
    )
  }
}
export default Question