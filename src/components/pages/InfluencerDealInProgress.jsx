import React, { Component } from 'react';
import image from '../../images/image 2.png';
import '../../CSS/InfluencerDealInProgress.css';
import Checkout from '../subComponents/CheckOutForm'
import back from '../../images/back.png'
import axios from 'axios'
import { Link } from 'react-router-dom';
// let url1 = 'http://localhost:5000/';
class InfluencerDealInProgress extends Component {
	state = {

		offer:""
	};


componentDidMount(){

axios.get("api/infulencerOffer/getSpecificProduct/"+ this.props.match.params.id)
.then((res) => {
	this.setState({

		offer:res.data
	})
	console.log(res.data)
  })
  .catch((err) => {
	  console.log(err)
  })
}

	render() {
		return (
      <div className="row">
      
			<div><Link to="/InfluencePageOffering"> <img src={back} style={{width:"30px",height:"30px"}} alt="" /></Link></div>

			<div className="row">
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					<h2 className="text-center"><strong>{this.state.offer.title} (${this.state.offer.price})</strong></h2>

					<div className="text-center">
						<img src={axios.defaults.baseURL + this.state.offer.image} style={{ width: '450px', height: '250px' }} alt="###" />
					</div>
					<p>
						{this.state.offer.description}
					</p>

					<div className="text-center">
						<button className="filter-btn btn-block">More Influencer Offers</button>
					</div>
				</div>
			<div className="col-lg-1 col-md-1 idipmobileHide">
			<div className="idipvl idipmobileHide"></div>
			</div>
				<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
						<Checkout />
				</div>
			</div>
			</div>
		);
	}
}

export default InfluencerDealInProgress;
