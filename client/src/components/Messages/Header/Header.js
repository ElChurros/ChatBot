import React from 'react';
import { Button } from "react-bootstrap";

import API from '../../../utils/API';

const headerStyle = {
        background:  '#475cff',
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-between"
}

const logoutStyle = {
        backgroundColor: 'transparent',
        border: 0,
        textAlign: 'center'
}

const nameStyle = {
        height: '100%',
        // flexGrow: 1,
        lineHeight: '100%'
}

const nameSpanStyle = {

}

export class Header extends React.Component {
        constructor(props){
                super(props);
                this.disconnect.bind(this);
        }
        disconnect = event => {
                API.logout();
                window.location = "/";
        }
        render() {
                return(
                        <div className="Header" style={headerStyle}>
                                <div style={nameStyle}><span style={nameSpanStyle}>Dashboard</span></div>
                                <Button variant="outline-light" style={logoutStyle} onClick={this.disconnect} type="submit">
                                        <i className="material-icons">logout</i>
                                </Button>
                        </div>
                )
        }
}
