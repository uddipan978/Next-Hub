import React, {useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {message} from 'antd';

import axios from "axios";
import {SignUpMessage} from '../functions/notifications';
const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [userName, setuserName] = useState("");
  const[phoneNumber,setphoneNumber]= useState("");
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  

  const onSignUp = async(e) => {
    e.preventDefault();
        axios.post("api/users", {
        name: firstName,
        username:userName,
       
       
        email: email  ,
        phoneNumber:phoneNumber,
        
        password: password,
      })
      .then(function (response) {
        console.log(response);
       SignUpMessage()
       
        history.push("/");

        
        
      
        //set states here to render in map from response.data
      })
      .catch(function (error) {
        alert(error)
        message.config({
          top:"60"
          
        })
         message.danger(this.response);
       
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div className="signup-block">
      <div className="signup-wrapper">
       
        <form onSubmit={onSignUp}>
          <div className="signup-container">
            <h4 className="form-title text-center" style={{
              backgroundColor: '#DF362D',
              color: 'white',
              paddingTop: '15px',
              paddingBottom : '15px'
            }}>Create Account</h4>
            <div className="container">
            <div className="form-group">
               <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Name"
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
               <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="User Name"
                onChange={(event) => setuserName(event.target.value)}
                required
              />
            </div>
         
            <div className="form-group">
            <input
               type="text"
               className="form-control"
               id="phoneNumber"
               placeholder="Phone number"
               onChange={(event) => setphoneNumber(event.target.value)}
               requierd
             />
           </div>
          
            <div className="form-group">
             <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                requierd
              />
            </div>
           
            <div className="form-group password-sec">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
             
            </div>
            </div>
          </div>
          <div style={{
            paddingLeft : '15px',
            paddingRight : '15px',
            marginBottom: '25px'
          }}>
{(
firstName==="" ||
userName==="" ||
email===""||
password===""||
phoneNumber==="")?(
   <button disabled style={{hover:"none"}} className="btn btn-secondary float-right">Create Account </button>):(
     <button type="submit"  className="my-button btn-primary float-right"  >Create Account</button>)}
            
            
         

            <span>
              Already have an account ? log in
              <Link to="/" className="account-link">
                here
              </Link>
            </span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default SignUp;
