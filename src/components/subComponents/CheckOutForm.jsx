import React, { Component } from 'react';
import Visa from '../../images/123.jpeg'
import MasterCard from '../../images/masterCard.png'
import Discover from '../../images/discover.png'
import Payment from '../../images/paymentCard.png'
import PayPal from '../../images/payPal.png'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import swal from 'sweetalert';
let token;
token = localStorage.usertoken ? localStorage.usertoken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY";
const decoded = jwt_decode(token)
let currentId = decoded._id
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            cardName: '',
            cardNumber: '4242 4242 4242 4242',
            monthYear: '',
            cvc: ''
        }
    }


    
    

    componentDidMount() {

    }


    mySubmitHandler = (event) => {
        event.preventDefault();
        let monthYear = this.state.monthYear;
        let cardNumber = this.state.cardNumber;
        let cvc = this.state.cvc;
        if (monthYear.match("/^(0[1-9]|1[0-2])\/([0-9]{2})$/")) {
          alert("Your month and year must be a number (02/21)");
        }else if (cardNumber.match("/^([1-9]{4}|[0-2]{4}) ([1-9]{4}|[0-2]{4}) ([1-9]{4}|[0-2]{4}) ([1-9]{4}|[0-2]{4})$/")) {
            alert("Your card number must be a number");
        }else if (cvc.match("/^[0-9]{3,4}$/")) {
            alert("Your cvc should be of three or four characters");
        }

        var month = monthYear.substr(0, monthYear.indexOf('/'));
        var year = monthYear.substring(monthYear.indexOf('/') + 1);
        year = '20'+year
        let paymentForm = {
            email : this.state.email,
            cardName : this.state.cardName,
            cardNumber : this.state.cardNumber,
            month : month,
            year : year,
            cvc : this.state.cvc,
            userId : currentId,
            amount: '130.08'
        }

        

        console.log(paymentForm)

            axios.post('api/infulencerOffer/stripe/payment',paymentForm)
            .then((res) => {
                console.log(res.data.message)
                swal("Payment Successfull", "", "success");
            })
            .catch((err) => {
                console.log(err)
            })

      }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

    render() {
        return (
            <div>
                <form onSubmit={this.mySubmitHandler}>
                <h2 className="text-center"><strong> Payments </strong></h2>
						<div className="form-group">
							<label style={{ float: 'left' }}> Email</label>
							<input style={{borderRadius:"10px"}}
								type="email"
								className="form-control idipInput"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
								autoFocus
							/>
						</div>
						

						<div className="form-group">
							<label style={{ float: 'left' }}> Card Name</label>
							<input  style={{borderRadius:"10px"}}
								type="text"
								className="form-control idipInput"
								name="cardName"
								value={this.state.cardName}
								onChange={this.handleChange}
							/>
						</div>

						<div className="form-group" style={{
							display : 'inline-table'
						}}>
							<label className="text-left"> Card Details</label>
						</div>
						<br/>
						<div className="row">
								<div className="col-12">
								<span style={{display:"flex"}}>
								<input  style={{
									borderTopLeftRadius:"10px",
									borderTopRightRadius:"0px",
									borderBottomRightRadius:"0px",
									borderRight:"none",
								}}
									type="text"
									className="form-control idipInput"
									name="cardNumber"
                                    placeholder="1234 1234 1234 1234"
                                    onChange={this.handleChange}
									defaultValue="4242 4242 4242 4242"
								>
									
								</input>
								<input  style={{
									borderTopLeftRadius:"0px",
									borderTopRightRadius:"0px",
									borderBottomLeftRadius:"0px",
									borderBottomRightRadius:"0px",
									borderLeft:"none",
									borderRight:"none",
									width:"50px",
									height:"38px"
								}}
								    type="image" src={Visa} alt="Submit" 
								    className="form-control"
									name="images"
								
									// value={this.state.password}
									// onChange={this.handleChange}
							
								>
									
								</input>
								<input  style={{
									borderTopLeftRadius:"0px",
									borderTopRightRadius:"0px",
									borderBottomLeftRadius:"0px",
									borderBottomRightRadius:"0px",
									borderLeft:"none",
									borderRight:"none",
									width:"50px",
									height:"38px"
								}}
								type="image" src={MasterCard} alt="Submit" 
								
								
									className="form-control"
									name="images"
								
									// value={this.state.password}
									// onChange={this.handleChange}
							
								>
									
								</input>
								<input  style={{
									borderTopLeftRadius:"0px",
									borderTopRightRadius:"0px",
									borderBottomLeftRadius:"0px",
									borderBottomRightRadius:"0px",
									borderRight:"none",
									borderLeft:"none",
									width:"50px",
									height:"38px"
								}}
								type="image" src={PayPal} alt="Submit" 
								
								
									className="form-control"
									name="images"
								
									// value={this.state.password}
									// onChange={this.handleChange}
							
								>
									
								</input>
								<input  style={{
									borderTopLeftRadius:"0px",
									borderTopRightRadius:"10px",
									borderBottomLeftRadius:"0px",
								
									borderLeft:"none",
									width:"50px",
									height:"38px"
								}}
								type="image" src={Discover} alt="Submit" 
								
								
									className="form-control"
									name="images"
								
									// value={this.state.password}
									// onChange={this.handleChange}
							
								>
									
								</input>
								</span>

								<span style={{
									display : 'flex'
								}}>
								<input  style={{
									borderBottomLeftRadius:"10px",
									width: '50%',
								}}
									type="text"
									className="form-control idipInput"
									name="monthYear"
									placeholder="MM/YY"
									// value={this.state.password}
									onChange={this.handleChange}
								/>
								<input  style={{
									borderTopRightRadius:"0px",
									borderBottomRightRadius:"0px",
									borderRight:"0px",
									width: '50%'
								}}
									type="text"
									className="form-control idipInput"
									name="cvc"
									placeholder="CVC"
									// value={this.state.password}
									onChange={this.handleChange}
								/>
								<input  style={{
									borderTopLeftRadius:"0px",
									borderTopRightRadius:"0px",
									borderBottomLeftRadius:"0px",
									borderBottomRightRadius:"10px",
								
									borderLeft:"none",
									width:"50px",
									height:"38px"
								}}
								type="image" src={Payment} alt="Submit" 
								
								
									className="form-control"
									name="images"
								
									// value={this.state.password}
									// onChange={this.handleChange}
							
								></input>

								</span>
								</div>
								
								</div>
						
							


						<div className="text-center">
							<p>A 9% serivce fee will be added.</p>

							<div className="row">
								<div className="col-4"></div>
								<div className="col-4">
									<button className="filter-btn" type="submit">Pay $130.80</button>
								</div>
								<div className="col-4"></div>
							</div>
						</div>
                </form>
			</div>
        );
    }
}


export default CheckoutForm;