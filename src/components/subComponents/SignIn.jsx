import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../../CSS/signIn.css";
import FaceBook from "./FaceBook";
import GoogleLogin from "./Gmail";
import EmailIcon from "@material-ui/icons/Email";
import Sign from "../pages/signInn";

import Dialog from "@material-ui/core/Dialog";
function SignIn(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Card className="card-signin">
          <Card.Body>
            <Card.Title className="siginInForntSize">Sign In</Card.Title>
            <br />
            <br />
            <br />
            <GoogleLogin />
            <br />
            <FaceBook />
            <br />
            <div className="login-page">
              <button className="btn btn-danger btn-email btn-lg w-100 btn-email">
                <div className="btn-email-icon">
                  <EmailIcon fontSize="large" />
                </div>
                <div className="btn-email-text">Sign in with Email</div>
              </button>
            </div>
            <br />
          </Card.Body>
        </Card>
      </div>
    );
  };
}
export default SignIn;
