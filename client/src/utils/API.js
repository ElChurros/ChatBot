import axios from 'axios';
const headers = {
        'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
        login : function(email,password) {
                return axios.post(burl + '/user/login',{
                        'email' : email,
                        'password' : password
                },{
                        headers: headers
                })
        },
        register : function(send){
                return axios.post(burl + '/user/register',send,{headers: headers})
        },
        getMessages : function() {
                var token = localStorage.getItem('token');
                console.log("[getMessages]: token = ", token);
                return axios.post(burl + '/messages', {
                        'token' : token,
                }, {headers: headers});
        },
        sendMessage : function(message) {
                var token = localStorage.getItem('token');
                return axios.post(burl + '/messages/new', {
                        'token': token,
                        'new_message' : message
                }, {headers: headers});
        },
        isAuth : function() {
                return (localStorage.getItem('token') !== null);
        },
        logout : function() {
                localStorage.clear();
        }
}
