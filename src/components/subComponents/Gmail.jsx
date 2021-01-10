import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { login } from "./googleAuth";
import GoogleIcon from "../../images/googleIcon.png";
import "../../CSS/signIn.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default (props) => {
  const [googleProfile, setGoogleProfile] = useState({});

  const responseGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "api/users/googlelogin",
      data: { token: response.tokenId },
    })
      .then((res) => {
        // console.log(res.data.user)
        localStorage.setItem("usertoken", res.data.token);
        // const decoded = jwt_decode(res.data.token);
        // console.log(decoded)
        // props.history.push("/");

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-page">
      <GoogleLogin
        autoLoad={false}
        clientId="104590688028-biofee5gi73s9i0dc9gm9u1mmi956ub1.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className="btn btnGoogle"
        icon={false}
      >
        <img
          src={GoogleIcon}
          alt=""
          style={{
            width: "25px",
            marginRight: "15px",
            marginLeft: "4px",
          }}
        />
        <span>Sign In with Google</span>
      </GoogleLogin>
    </div>
  );
};
