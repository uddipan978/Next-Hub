import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import FacebookLogin from "react-facebook-login";
import "../../CSS/signIn.css";
import axios from "axios";
function FaceBook(props) {
  const responseFacebook = (response) => {
    console.log(response.picture.data.url);
    console.log(response.userID);
    console.log(response.accessToken);
    const data = {
      accessToken: response.accessToken,
      userID: response.userID,
      email: response.email,
      id: response.id,
      picture: response.picture.data.url,
      name: response.name,
    };
    axios.post("api/users/facebooklogin", data).then((response) => {
      console.log("Facebook login success , client side", response.data);

      localStorage.setItem("usertoken", response.data);

      window.location.reload();
      // props.history.push("/");
    });
  };
  return (
    <div className="login-page">
      <FacebookLogin
        autoLoad={false}
        appId="147442823493810"
        cookie={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="btn btnFacebook"
        icon={
          <FacebookIcon
            style={{
              fontSize: "37px",
            }}
          />
        }
        textButton="&nbsp;&nbsp;Sign In with Facebook"
      />
    </div>
  );
}

export default FaceBook;
