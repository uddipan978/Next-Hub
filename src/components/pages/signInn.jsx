import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signInnMessage } from "../functions/notifications";
import axios from "axios";
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === "" && (valid = false);
  });

  return valid;
};
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class SignInn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
      },
    };
    this.onChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      default:
        break;
    }
    this.setState({
      formErrors,
      [name]: value,
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      axios.post("api/auth", user).then((res) => {
        localStorage.setItem("usertoken", res.data);
        signInnMessage();

        // swal("Payment Successfull", "", "success");
        //    import swal from 'sweetalert';
        this.history.push("/InfluencePageOffering");
        //alert(res.message)
      });
    } else {
      // swal("Payment Successfull", "", "success");
      alert("fill All Fields");
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="container ">
        <form noValidate onSubmit={this.handleSubmit}>
          <div className="container">
            <div
              className="row"
              style={{
                justifyContent: "center",
              }}
            >
              <h6
                style={{
                  fontSize: "60px",
                  color: "#df362d",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Sign In
              </h6>
            </div>
            <div className="form-group">
              <input
                type="email"
                className={
                  formErrors.email.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                name="email"
                placeholder="Enter your Email"
                value={this.state.email}
                onChange={this.handleChange}
                autoFocus
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div
              className="row"
              style={{
                float: "right",
              }}
            >
              {this.state.email === "" || this.state.password === "" ? (
                <button disabled className="my-button1">
                  Sign in
                </button>
              ) : (
                <button type="submit" className="my-button1 btn-primary">
                  Sign in
                </button>
              )}
            </div>
          </div>

          {/* <Link to="/forget-password" className="text-center">Forgot password?</Link> */}
        </form>
      </div>
    );
  }
}

export default SignInn;
