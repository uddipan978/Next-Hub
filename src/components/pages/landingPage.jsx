import React, { useState } from "react";
import "../../CSS/landing.css";
import Dialog from "@material-ui/core/Dialog";
import SignUp from "../subComponents/signUp";
import landingImage from "../../images/landingBanner.png";
function LandingPage(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let token = localStorage.usertoken
    ? localStorage.usertoken
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY";
  if (!token) {
    console.log("toekn");
    return <div>no token</div>;
  }
  // else{
  return (
    <div className="Landing">
      <div
        className="container-fluid"
        style={{
          borderRadius: "10px",
          background: "#F0F3F5",
        }}
      >
        <div className="">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-xl-6 col-xs-12">
              <div className="mt-4 mb-5">
                <h1 className="mainHead">
                  A Marketplace for <br />
                  <span> Influencer Brand Deals </span>
                </h1>
                <p className="landing-para">
                  An easy way for influencers to create promotion listings and
                  work with top brands.
                </p>
                {token ===
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY" ? (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <button className="my-button" onClick={handleOpen}>
                      <b>Sign up</b>
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-xl-6 col-xs-12">
              <div className="container">
                {/* <div className="landingBanner" /> */}
                <img src={landingImage} alt="" className="landingImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <SignUp />
      </Dialog>
    </div>
  );
  // }
}

export default LandingPage;
