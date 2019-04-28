import React from 'react';
import { Button } from "react-bootstrap";

import API from '../../../utils/API';

const listStyle = {
        height: '100%',
        width: '100%',
        position: 'fixed',
        display: 'inline-block'
}

const botMessageStyle = {
        float: 'left'
}

const humanMessageStyle = {
        float: 'right'
}

const ulStyle = {
        display: 'block'
}

const liStyle = {
        display: 'block',
        display: 'block',
        position: 'relative',
        float: 'left',
        minWidth: '250px',
        background: '#a6acba',
        border: '4px solid transparent',
        borderRadius: '4px',
        padding: '5px',
        color: '#fff',
        fontWeight: '700',
        marginBottom: '15px'
}

export class ListView extends React.Component {
        constructor(props){
                super(props);
        }
        sendMessage = event => {
                API.sendMessage(event.target.value);
                window.location = "/";
        }
        render() {
                return(
                        <div className="clearfix">
                                <ul className="messages clearfix">
                                {this.props.messages && this.props.messages.map((message, index) => {
                                        console.log(message)
                                        if (message && message.generated == true) {
                                                return (
                                                        <li key={message.created_at}>
                                                                <div>Your personnal assistant</div>
                                                                <div>{message.text}</div>
                                                        </li>
                                                )
                                        } else if (message) {
                                                return (
                                                        <li style={liStyle} key={message.created_at}>
                                                                <div>You</div>
                                                                <div>{message.text}</div>
                                                        </li>
                                                )
                                        }
                                })}
                                </ul>

                        </div>
                )
        }
}
