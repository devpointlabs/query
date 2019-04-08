import React from 'react';
import axios from 'axios';
import Timer from './Timer'
import { Button, Header, } from 'semantic-ui-react';
import MultiForm from './MultiForm';
import OpenAnswerForm from './OpenAnswerForm';
import TrueFalse from './TrueFalse';

class TakeQuiz extends React.Component {

    render() {
        return (
            <div style={{ display: "flex", height: "1000px" }}>
                <div style={{ backgroundColor: "#6D55A3", width: "40%", height: "100%" }}>
                </div>
                <div style={{ backgroundColor: "#fff", width: "60%", height: "100%" }}>
                </div>
            </div>
        )
    }
}

export default TakeQuiz