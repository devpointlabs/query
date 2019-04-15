import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { Card } from 'semantic-ui-react';

const Results = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("/api/student_submissions") 
      .then( res => {
        debugger 
      })
      .catch( err => console.log(err))
  }, [])

  const renderSubmissions = () => {

    return submissions.map( sub => {
      debugger
      return (
      <Card key={sub.id}>
        <Card.Header></Card.Header>
      </Card>)
    })
  }


  return (
    <>
      <Card.Group>
       { renderSubmissions()}
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