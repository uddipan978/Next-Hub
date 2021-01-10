import React, { Component } from 'react';
import image from '../../images/image 2.png';
import '../../CSS/InfluencerDealInProgress.css';
import Checkout from '../subComponents/AddDealCheckOut';
import back from '../../images/back.png';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {DealAdd } from '../functions/notifications'

// import { DropzoneArea } from 'material-ui-dropzone';
// import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
class InfluencerCreateDeal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			price: '',
			image: '',
			description: '',
			userId: '',
			files: []
		};
		this.onChangeImage = this.onChangeImage.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangeImage = (e) => {
		this.setState({
			image: e.target.files[0]
		});
	};
	handleChange(files) {
		this.setState({
			files: files
		});
	}

	onChangeTitle = (e) => {
		this.setState({
			title: e.target.value
		});
	};
	onChangeDescription = (e) => {
		this.setState({
			description: e.target.value
		});
	};
	onChangePrice = (e) => {
		this.setState({
			price: e.target.value
		});
	};
	jwtDecode = () => {
		let token;
		token = localStorage.usertoken
			? localStorage.usertoken
			: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY';
		const decoded = jwt_decode(token);
		let currentId = decoded._id;

		return currentId;
	};
	onSubmit(e) {
		e.preventDefault();

		var obj = {
			userId: this.jwtDecode(),
			title: this.state.title,
			image: this.state.image,
			price: this.state.price,
			description: this.state.description
		};
		var form_data = new FormData();
		for (var key in obj) {
			form_data.append(key, obj[key]);
		}
		axios
			.post('api/infulencerOffer/addOffer', form_data)
			.then((res) => {
				console.log(res);
				//alert('Your Offer Added SuccessFully');
				DealAdd()
				this.setState({
					title: '',
					image: '',
					price: '',
					description: ''
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				{/* <div className="row">
					<Link to="/InfluencePageOffering"><img src={back} style={{ width: '30px', height: '30px' }} alt="" /></Link>
				</div>
				<br/> */}
				<div className="row">
					<div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12">
						<div className="container">
						<div className="row">
							<div className="col-2">
							<Link to="/InfluencePageOffering"><img src={back} style={{ width: '30px', height: '30px' }} alt="" /></Link>
							</div>
							<div className="col-9">
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<input
									style={{
										color: 'rgba(73, 80, 86, 0.6)',
										fontSize: '24px',
										textAlign: 'center',
										fontWeight: 'bold',
										width: '250px',
										display: 'flex',
										justifyContent: 'center'
									}}
									type="text"
									placeholder="Enter Offering title here"
									className="form-control"
									value={this.state.title}
									onChange={(event) => this.onChangeTitle(event)}
									name="title"
								/>
							</div>
							</div>
						</div>
						<br/>
						<div className="row">
							<div className="col-2"></div>
							<div className="col-9">
							<div className="row" style={{
								borderRadius: '5px',
								border: '1px solid lightgrey'
						}}>
							

							<div class="file btn-lg btn-info" style={{
								position: 'relative',
								overflow: 'hidden',
								marginTop: '100px',
								marginBottom: '100px',
								marginInline: 'auto'
							}}>
								Add Photo
								<input type="file" name="image" onChange={(event) => this.onChangeImage(event)} style={{
									position : 'absolute',
									fontSize: '50px',
									opacity: 0,
									right: 0,
									top: 0
								}} />
							</div>
							
						</div>
							</div>
						</div>

						<br/>
						<div className="row">
						<textarea style={{
							fontSize: '24px',
							height:"100px"
						}}
							type="text"
							placeholder="Enter Description Here"
							className="form-control"
							value={this.state.description}
							onChange={(event) => this.onChangeDescription(event)}
							name="description"
							/>
						</div>
						<br/>
						<br/>
						<div className="row">
							<div className="col-3">
							<strong style={{ color: '#495056', fontSize: '16px' }}>Offering Price</strong>
							</div>
							<div className="col-3">
							<input
								style={{ color: '#495056', fontSize: '16px' , borderRadius:"5px", border: '1px solid lightgrey'}}
								type="text"
								className=""
								placeholder="$"
								value={this.state.price}
								onChange={(event) => this.onChangePrice(event)}
								name="price"
							/>
							</div>
						</div>
						</div>
					</div>


					<div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-xs-12" className="createWebsite">
					
						<Checkout />
						<div className="text-center">
							
							<div className="row" style={{
                                justifyContent: 'center'
                            }}>
								<button className="btn-lg btn-info" style={{
                                    border: 'none',
                                }} type="submit" onClick={(e) => this.onSubmit(e)}>Submit</button>
							</div>
                            
						</div>
					</div>

					
				</div>
			</div>
		);
	}
}

export default InfluencerCreateDeal;


// {/* <div> */}
// 				<div>
// 					<Link to="/InfluencePageOffering"><img src={back} style={{ width: '30px', height: '30px' }} alt="" /></Link>
// 				</div>

// 				<div className="row">
// 					<div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12">
// 						<div className=" text-center mt-5 mb-4">
							// <div style={{ display: 'flex', justifyContent: 'center' }}>
							// 	<input
							// 		style={{
							// 			color: 'rgba(73, 80, 86, 0.6)',
							// 			fontSize: '24px',
							// 			textAlign: 'center',
							// 			fontWeight: 'bold',
							// 			width: '250px',
							// 			display: 'flex',
							// 			justifyContent: 'center'
							// 		}}
							// 		type="text"
							// 		placeholder="Enter Offering title here..."
							// 		className="form-control"
							// 		value={this.state.title}
							// 		onChange={(event) => this.onChangeTitle(event)}
							// 		name="title"
							// 	/>
							// </div>
// 						</div>

// 						<div className="mb-4">
// 						{/*	<DropzoneArea
// 								style={{ border: 'solid' }}
// 								type="file"
// 								className="form-control"
// 								name="image"
// 								onChange={this.handleChange.bind(this)}
// 						/>*/}
							
//               			<label>Image: </label>
// 						{/* <input
// 						type="file"
// 						className="form-control"
// 						name="image"
// 						onChange={(event) => this.onChangeImage(event)}
// 						/> */}
						// <div class="custom-file">
						// 	<input type="file" class="custom-file-input" id="customFile" onChange={(event) => this.onChangeImage(event)} />
						// 	<label class="custom-file-label" for="customFile">Add Photo</label>
						// </div>
// 						</div>
// 						<div className="text-center">
			// 				<textarea style={{
			// 							fontSize: '24px',
            //         height:"100px"
            //   }}
			// 					type="text"
			// 					placeholder="Enter Description Here"
			// 					className="form-control"
			// 					value={this.state.description}
			// 					onChange={(event) => this.onChangeDescription(event)}
			// 					name="description"
			// 				/>
// 						</div>
// 						<div className="row">
// 							<div style={{ float: 'left' }}>
//                 <div className="col-lg-8 col-md-8 col-sm-8">
//                 <div className="row mt-2">
//                 <div className="col-lg-8 col-md-8 col-sm-8">
//                 <span style={{ color: '#495056', fontSize: '16px' }}>
//                 <strong>Offering Price</strong>
//               </span>
//                 </div>
//                 <div className="col-lg-4 col-md-4 col-sm-4">

                // <input
				// 	style={{ color: '#495056', fontSize: '16px' , borderRadius:"10px"}}
				// 	type="text"
				// 	className=""
				// 	placeholder="$"
				// 	value={this.state.price}
				// 	onChange={(event) => this.onChangePrice(event)}
				// 	name="price"
				// />
//                 </div>
                
                
//                 </div>
								
// 								</div>
// 								<div className="col-lg-4 col-md-4 col-sm-4">
									
// 								</div>
// 							</div>
// 						</div>
//  <div className="text-center mt-4">
// 						<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>
						
// 							Submit
//             </button>
//             </div>
// 					</div>
// 					<Divider orientation="vertical" flexItem />
// 					{/* <div className="col-lg-1 col-md-1 idipmobileHide">
// 						<div className="idipvl idipmobileHide" />
// 					</div> */}
// 					<div className="col-lg-5 col-xl-5 col-md-6 col-sm-12 col-xs-12">
// 						<Checkout />
// 					</div>
// 				</div>
// 			</div>