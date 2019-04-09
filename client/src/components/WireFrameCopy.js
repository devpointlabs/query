import React, { Component } from "react";
import {
  Form,
  Input,
  FormField,
  TextArea,
  Header,
  Button
} from "semantic-ui-react";

export default class WireFrameCopy extends Component {
  render() {
    document.body.style = "background: #6D55A3;";

    return (
      <div style={divStyle}>
        <Form>
          <Form.Field
            style={{
              labelStyle,
              paddingTop: "5%",
              marginLeft: "5%",
              marginRight: "40%"
            }}
          >
            <label style={labelStyle}>Name</label>
            <input />
          </Form.Field>
          <Form.Field style={{ marginLeft: "5%", marginRight: "5%" }}>
            <label style={labelStyle}>Prompt</label>
            <input style={{ padding: "7%" }} />
          </Form.Field>
          <h2 style={{ color: "purple", marginLeft: "5%" }}>
            Identified / Anonymous
          </h2>
        </Form>
        <header style={{ marginLeft: "5%" }}>
          explanation of Identified and Anonymous
        </header>
        <h1 style={{ marginLeft: "5%" }}>Questions</h1>
        <button style={buttonStyle}> Poll </button>
        <button style={buttonStyle}> multiple choice</button>
        <button style={buttonStyle}> Free response </button>
        <h1 style={{ marginLeft: "5%", paddingBottom: '15%' }}>People</h1>
        <Button fluid color="purple">
          Save
        </Button>
      </div>
    );
  }
}

const divStyle = {
  marginBottom: '50px',
  // justifyContent: "center",
  backgroundColor: "white",
  textAlign: "left",
  color: "purple",
  // position: "relative",
  marginLeft: "15%",
  marginRight: "15%",
  // marginBottom: "20%",
  // bottom: "100",
  // border: "2px solid purple",
  borderRadius: "10px"
};

const labelStyle = {
  color: "purple"
};

const buttonStyle = {
  marginLeft: "5%",
  marginRight: "2%",
  border: "1px solid",
  color: "purple"
};

// import React from 'react'
// import { Card, Container, Form, Header, Button } from 'semantic-ui-react';

// const WireFrameCopy = () => {
//   document.body.style = 'background: #6D55A3;'

//   return (
//     <>
//     <div className={divStyle}>
//   <Form>
//     <Form.Field >
//       <label>First Name</label>
//       <input/>
//     </Form.Field>
//     <Form.TextArea label='Prompt'/>
//       </Form>
//     </div>
//     <Header as='h1'>Identified / Anonymous</Header>
//     <Header as='h6'>you will know which submission belongs to an indivdual</Header>
//     <Header as='h1'>Questions</Header>
//     <Button.Group>
//     <Button>poll</Button>
//     <Button>multiple choice</Button>
//     <Button>free response</Button>
//   </Button.Group>
//     <Header as='h2'> people </Header>
//       <br />

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//     <Button color='violet' fluid> Save </Button>

//     </>
//   )
// }

// export default WireFrameCopy

// const divStyle = {
//   margin: '500px',
//   border: '5px solid pink'
// };
