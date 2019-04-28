import React from 'react';
import { Button } from "react-bootstrap";
import { Header } from './Header/Header.js';
import { SendMessage } from './SendMessage/SendMessage.js';
import { ListView } from './ListView/ListView.js';
import API from '../../utils/API';

const dashboardStyle = {
        height: '100%'
}

export class Messages extends React.Component {
        constructor(props){
                super(props);
                this.componentDidMount = this.componentDidMount.bind(this)
                this.state = {
                        messages: []
                }
        }
        componentDidMount() {
                var messages = [];
                API.getMessages().then((data) => {
                        data.data.forEach(msg => {
                                console.log(msg);
                                messages.push(msg);
                        })
                        this.setState({messages: messages});
                }, function(error) {
                        console.log(error);
                        return;
                });
                console.log("this.state.messages = ", this.state.messages);
                console.log("this.state.messages = ", this.state.messages)
        }
        sendMessage = message => {
                API.sendMessage(message).then(data => {
                        this.setState({
                                messages: [...this.state.messages, data.new_message]
                        })
                });
        }
        render() {
                return(
                        <div className="Dashboard" style={dashboardStyle}>
                                <Header/>
                                <ListView messages={this.state.messages}/>
                                <SendMessage sendMessage={this.sendMessage}/>
                        </div>
                )
        }
}

export default Messages;
