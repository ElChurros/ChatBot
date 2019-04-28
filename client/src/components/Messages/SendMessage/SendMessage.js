import React from 'react';
import { Button } from "react-bootstrap";

import API from '../../../utils/API';

const footerStyle = {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '50px',
        WebkitBoxShadow: '0px -1px 8px -1px rgba(0,0,0,0.53)',
        MozBoxShadow: '0px -1px 8px -1px rgba(0,0,0,0.53)',
        BoxShadow: '0px -1px 8px -1px rgba(0,0,0,0.53)',
        textAlign: 'center',
        lineHeight: '50px'
}

const inputStyle = {
        width: '100%',
        height: '100%',
        border: '0px',
}

export class SendMessage extends React.Component {
        constructor(props){
                super(props);
                this.state = {
                        message: ''
                }
                this.handleChange = this.handleChange.bind(this)
                this.handleSubmit = this.handleSubmit.bind(this)

        }
        handleChange(e) {
                this.setState({
                        message: e.target.value
                })
        }

        handleSubmit(e) {
                e.preventDefault()
                this.props.sendMessage(this.state.message)
                this.setState({
                        message: ''
                })
        }
        render() {
                return(
                        <div style={footerStyle}>
                        <form onSubmit={this.handleSubmit} style={inputStyle}>
                                <input onChange={this.handleChange} value={this.state.message}
                                placeholder="Type your message and hit Enter" type="text"
                                style={inputStyle} />
                        </form>
                        </div>
                )
        }
}
