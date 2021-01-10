import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import profilepic from "../../images/profilePic.png";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Card } from "react-bootstrap";
import "../../CSS/signIn.css";
import FacebookLogin from "../subComponents/FaceBook";
import GoogleLogin from "../subComponents/Gmail";
import EmailIcon from "@material-ui/icons/Email";
import Sign from "../pages/signInn";
import axios from "axios";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import SignIn from "../subComponents/SignIn";
import Dialog from "@material-ui/core/Dialog";
import "../../CSS/header.css";
import { signOutMessage } from "./../functions/notifications";

class Header extends Component {



  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      open: false,
      signInModal: false,
      signModal: false,
      profile: "",
      active: false
    };
  }

  jwtDecode = () => {
    let token;
    token = localStorage.usertoken
      ? localStorage.usertoken
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY";
    const decoded = jwt_decode(token);
    let currentId = decoded._id;

    return currentId;
  };

  componentDidMount() {
    axios
      .get("api/auth/getUserProfile/" + this.jwtDecode())
      .then((res) => {
        this.setState({ profile: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  userLogOut() {
    localStorage.removeItem("usertoken");
    window.localStorage.clear();
    // window.location.reload()

    signOutMessage();
    this.props.history.push("/");

    // console.log(localStorage)
  }

  render() {
    const loginNave = (
      <div id="header-container">
        <Navbar className={`${this.state.isOpen === true ? 'active' : ''}`} color="light" light expand="md">
          <NavLink to="/">
            <NavbarBrand href="#NextHub-Landing-Page" className="logo">
              <span className="logo-span1">Next</span>
              <span className="logo-span2">Hub</span>
            </NavbarBrand>
          </NavLink>
          <NavbarToggler onClick={this.toggle}  >
            <div id="close-icon" className={this.state.isOpen ? "open" : ""}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavLink id="content-link" to="/searchMarketPlace">
                <NavItem>
                  <b
                    className="nav-links"
                    onClick={() => {
                      this.setState({
                        isOpen: !this.state.isOpen,
                      });
                    }}
                  >
                    Marketplace
                  </b>
                </NavItem>
              </NavLink>
              {/* <NavItem>
                        <span onClick={this.handleOpen}>
                        <b className="nav-links" 
                        // onClick={() => {
                        //     this.setState({
                        //       isOpen : !this.state.isOpen
                        //     })
                        //   }}
                          >
                          Sign in
                        </b>
                        </span>
                    </NavItem> */}

              <NavItem>
                <span
                  onClick={() => {
                    this.setState({
                      signInModal: !this.state.signInModal,
                    });
                    // console.log(this.state.signInModal)
                  }}
                  style={{
                    float: "inherit",
                  }}
                >
                  <b className="nav-links">Sign in</b>
                </span>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        {/* <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.signInModal}>
           hgh
      </Dialog> */}
        {/* {
        this.state.signInModal === true
        ?
        <Dialog onClose={false} aria-labelledby="customized-dialog-title" open={true}>
           hgh
        </Dialog>
      :
      <div>
        <Dialog onClose={false} aria-labelledby="customized-dialog-title" open={false}>
           hgh
        </Dialog>
      </div>
      } */}
        <Dialog
          onClose={() => {
            this.setState({
              signInModal: false,
            });
          }}
          aria-labelledby="customized-dialog-title"
          open={this.state.signInModal}
        >
          <div
            style={{
              fontFamily: "Jaldi, sans-serif",
              fontSize: "16px",
            }}
          >
            <Card className="card-signin">
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "60px",
                    color: "#df362d",
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </Card.Title>
                <br />
                <br />
                <br />
                <GoogleLogin />
                <br />
                <FacebookLogin />

                <br />
                <div className="login-page">
                  <button className="btn btn-danger btn-email btn-lg w-100 btn-email">
                    <div className="btn-email-icon">
                      <EmailIcon fontSize="large" />
                    </div>
                    <div
                      className="btn-email-text"
                      onClick={() => {
                        this.setState({
                          signModal: true,
                          signInModal: false,
                        });
                      }}
                    >
                      Sign in with Email
                    </div>
                  </button>
                  {/* <button class="btn btn-danger btn-email btn-lg w-100 btn-email">
                    <div className="row">
                      <div className="col-1">
                        <EmailIcon fontSize="large" />
                      </div>
                      <div
                        className="col-11"
                        style={{
                          maxWidth: "46%",
                          fontSize: "16px",
                          marginTop: "5px",
                        }}
                        onClick={() => {
                          this.setState({
                            signModal: true,
                            signInModal: false,
                          });
                        }}
                      >
                        Sign in with Email
                      </div>
                    </div>
                  </button> */}
                </div>
                <br />
              </Card.Body>
            </Card>
          </div>
        </Dialog>

        <Dialog
          onClose={() => {
            this.setState({
              signModal: false,
            });
          }}
          aria-labelledby="customized-dialog-title"
          open={this.state.signModal}
        >
          <Sign />
          <br />
        </Dialog>
      </div>
    );
    const userNave = (
      <div id="header-container">
        <Navbar color="light" light expand="lg">
          <NavLink to="/">
            <NavbarBrand href="#NextHub-Landing-Page" className="logo">
              <span className="logo-span1">Next</span>
              <span className="logo-span2">Hub</span>
            </NavbarBrand>
          </NavLink>
          <NavbarToggler onClick={this.toggle}>
            <div id="close-icon" className={this.state.isOpen ? "open" : ""}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavLink id="content-link" to="/searchMarketPlace">
                <NavItem>
                  <b
                    className="nav-links"
                    onClick={() => {
                      this.setState({
                        isOpen: !this.state.isOpen,
                      });
                    }}
                  >
                    Marketplace
                  </b>
                </NavItem>
              </NavLink>
              <NavItem onClick={() => this.userLogOut()}>
                <span>
                  <b className="nav-links">Sign Out</b>
                </span>
              </NavItem>

              <NavItem>
                <span onClick={this.handleOpen}>
                  <b
                    className="nav-links"
                    onClick={() => {
                      this.setState({
                        isOpen: !this.state.isOpen,
                      });
                    }}
                  >
                    <img
                      src={"" + this.state.profile.profilePic}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "26px",
                      }}
                      alt="#####"
                    />
                  </b>
                </span>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <SignIn />
        </Dialog>
      </div>
    );

    return <div>{localStorage.usertoken ? userNave : loginNave}</div>;
  }
}

export default withRouter(Header);
