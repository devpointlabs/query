import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { Card } from 'semantic-ui-react';
import Choices from './Choices'
import Grade from './Grade'
import Navbar from '../Navbar'

const Results = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("/api/student_submissions") 
      .then( res => {
        setSubmissions(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const renderSubmissions = () => {

    return submissions.map( sub => {
      return (
      <Card key={sub.submission.id}>
        <Card.Header>{sub.quiz}</Card.Header>
        <Card.Meta>{sub.email}</Card.Meta>
        <Card.Content>
          <ul>
            <Choices id={sub.submission.id} />
          </ul>
        </Card.Content>
        <Card.Content extra>
          <Grade id={sub.submission.id} />
        </Card.Content>
      </Card>)
    })
  }

  document.body.style = 'background: #5906A3;'

  return (
    <>
      <Navbar />
      <Card.Group>
       { renderSubmissions() }
       
      </Card.Group>
    </>
  )
}


// class Results extends React.Component {
//   state = { submissions: []}

//   componentDidMount() {
//     axios.get("/api/student_submissions") 
//       .then( res => this.setState({submissions: res.data}))
//       .catch( err => console.log(err))

//   }

//   render() {
//     return (
//       <>
//         <Card.Group>
//           {this.state.submissions.map( sub => (
//             <Card key={sub.id}>
//               <Card.Header>balls</Card.Header>
//             </Card>
//           ))}
//         </Card.Group>
//       </>
//     )
//   }
// }
export default Results;