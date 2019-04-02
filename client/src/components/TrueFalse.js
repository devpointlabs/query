import React from 'react'
import { Form, Input, Button, Grid } from 'semantic-ui-react';

const TrueFalse = () => {
  document.body.style = 'background: #6D55A3;'
  return (
    <Form>
      <Form.Field>
        <Input placeholder='Type your true or false question here' />
      </Form.Field>
      <Button.Group>
        <Button inverted>TRUE</Button>
        <Button.Or />
        <Button inverted>FALSE</Button>
      </Button.Group>
      <br/>
      <Grid>
        <Grid.Column textAlign="right">
          <Button circular inverted size="big" type='submit'>Submit</Button>
        </Grid.Column>
      </Grid>
    </Form>
  )
}

export default TrueFalse
