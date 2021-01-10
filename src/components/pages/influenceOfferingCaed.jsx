import React, { useEffect, useState } from 'react';
import '../../CSS/influenceOffering.css';
import Avatar from '@material-ui/core/Avatar';
import Face from '../../images/dp.png';
// import cardImage from "../../images/image2.png"
// import cardImage2 from "../../images/image1.png"
import { Card } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import '../../CSS/editProduct.css';
import { Link } from 'react-router-dom';

// import FilterResults from 'react-filter-search';
import { EditOffer } from './../functions/notifications';
function InfluenceOfferingCaed() {
	const [ dataArray, setArray ] = useState([]);
	const [ editModal, setEditModal ] = useState(false);
	const [ productId, setProductId ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ clickedProduct, setClicketProduct ] = useState({});
	// let url1 = 'http://localhost:5000/';
	// let url1 = 'http://18.217.95.60/backend/'
	let token;
	token = localStorage.usertoken
		? localStorage.usertoken
		: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY';
	const decoded = jwt_decode(token);
	let currentId = decoded._id;

	useEffect(() => {
		console.log(currentId);

		axios
			.get('api/infulencerOffer/getSpecificUserProducts/' + currentId)
			.then((res) => {
				setArray(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(
		() => {
			if (productId === '') {
				console.log('Failed to get product Id');
			} else {
				setEditModal(true);
			}
		},
		[ productId ]
	);

	useEffect(
		() => {
			axios
				.get('api/infulencerOffer/getSpecificProduct/' + productId)
				.then((res) => {
					setClicketProduct(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ editModal ]
	);

	useEffect(
		() => {
			console.log(clickedProduct);
		},
		[ clickedProduct ]
	);

	const closeEdit = () => {
		setEditModal(false);
		setClicketProduct({});
		setProductId('');
	};

	const mySubmitHandler = (event) => {
		event.preventDefault();

		// if (!Number(price)) {
		// 	alert('Price must Be Number');
		// }
		let productObj = {
			price: price,
			title: title,
			image: null
		};

		var form_data = new FormData();
		for (var key in productObj) {
			form_data.append(key, productObj[key]);
		}
		console.log(form_data);
		axios
			.put('api/infulencerOffer/editProduct/' + productId, form_data)
			.then((res) => {
                // setArray(res.data);
                axios
					.get('api/infulencerOffer/getSpecificUserProducts/' + currentId)
					.then((res) => {
						setArray(res.data);
						EditOffer()
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};


	useEffect(() => {
		setEditModal(false)
	},[dataArray])
	
	const [ userName, setuserName ] = useState('');
	const [ profile, setProfile ] = useState('');

	const jwtDecode = () => {
		let token;
		token = localStorage.usertoken
			? localStorage.usertoken
			: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY';
		const decoded = jwt_decode(token);
		let currentId = decoded._id;

		return currentId;
	};

	useEffect(() => {
		axios
			.get('api/auth/getUserProfile/' + jwtDecode())
			.then((res) => {
				setProfile(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
    }, []);
    

    const updateOffer=(offer)=>{
        axios.put('api/infulencerOffer/' + offer._id,
        {
            title:title,
            price:price,
            description:offer.description

                    }
                    
        )
        .then((res) => {
            setProfile(res.data);
            window.location.reload()
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });



    }

	return (
		<div>
			<div className="webView">
				{dataArray.map((obj, index) => {
					return (
                        	<div
							style={{
								textAlign: 'center',
								fontFamily: 'Inika, serif'
							}}
						>
							<Card>
								<div className="row">
									<div className="col-8">
										<Card.Body>
                                        <Link to={"/InfluencerDealInProgress/" + obj._id}><Card.Title>
												<h2>{obj.title}</h2>
												<h2>Promotion (${obj.price})</h2>
											</Card.Title></Link>
										</Card.Body>
										<br />
										<br />
										<br />
										{token === undefined ? (
											<button className="my-button">See More</button>
										) : (
											<button
												className="my-button1"
												onClick={() => {
													setProductId(obj._id);
												}}
											>
												Edit
											</button>
										)}
									</div>
									<div className="col-4">
										<div className="container">
											<img
												src={axios.defaults.baseURL + obj.image}
												alt=""
												style={{
													paddingRight: '50px',
													paddingTop: '20px',
													paddingBottom: '20px',
													width: '200px'
												}}
											/>
										</div>
									</div>
								</div>
								<div
									style={{
										paddingLeft: '30px'
									}}
								>
									<div
										className="row"
										style={{
											paddingLeft: '20px'
										}}
									>
										<Avatar alt="Remy Sharp" src={'' + profile.profilePic} />
									</div>
									<div className="row">
										<b
											style={{
												color: '#df362d',
												fontSize: '16px',
												textTransform: 'lowercase'
											}}
										>
											@{profile.username}
										</b>
									</div>
								</div>
							</Card>
                            
							<br />
						</div>
				);
				})}
            </div>
            
			<div className="mobView">
        {
            dataArray.map((obj,index) => {
                return(
                    <div style={{
                        textAlign : 'center',
                        fontFamily: 'Inika, serif'
                    }}>
                        <Card>
                            
                        <div className="row">
                            <div className="col-12">
                             <Card.Body>
                                <Card.Title>
                                    <h2 style={{
                                        fontSize : '24px'
                                    }}>
                                        {obj.title}
                                    </h2>
                                    <h2 style={{
                                        fontSize : '24px'
                                    }}>
                                        {obj.price}
                                    </h2>
                                </Card.Title>
                                
                            </Card.Body>
                            
                            </div>
                            
                        </div>
                        <div className="row">
                               <div className="container">
                                   <div style={{
                                       
                                    display : 'flex',
                                    justifyContent : 'center'
                                   }}>
                                        <img src={ axios.defaults.baseURL + obj.image} alt="" style={{
                                    paddingTop : '20px',
                                    paddingBottom : '20px',
                                    width: '200px'
                                }} />
                                   </div>
                                
                                </div>
                                
                            
                        </div>
                        <div className="row">
                            <div className="col-2">
                            <div style={{
                                paddingLeft : '20px'
                                }}>
                                    <div className="row">
                                        <Avatar alt="Remy Sharp" src={profile.profilePic} />
                                        
                                    </div>
                                    <div className="row">
                                    <b style={{
                                        color: '#df362d',
                                        fontSize : '14px',
										textTransform: 'lowercase'
                                        }}>@{profile.username}</b>
                                    </div>
                        </div>
                            </div>
                            <div className="col-9">
                            {
                                token === undefined
                                ?
                                <button className="my-button">
                                    See More
                                </button>
                                :
                                <button className="my-button1">
                                    Edit
                                </button>
                            }
                            </div>
                            
                        </div>
                        
                        
                        </Card>
                        
                        <br/>
                    </div>
                )
            })
        }
        </div>

			{token === undefined ? (
				<div />
			) : (
				<div className="row">
					<div className="col-12">
						<Card
							style={{
								alignItems: 'center'
							}}
						>
							<div
								className="row"
								style={{
									marginTop: '30%',
									marginBottom: '30%'
								}}
							>
								<div>
									<Link className="my-button1" to="/InfluencerCreateDeal">
										Add New
									</Link>
								</div>
							</div>
						</Card>
					</div>
					<br />
				</div>
			)}
			<Dialog aria-labelledby="customized-dialog-title" open={editModal} onClose={closeEdit}>
				<DialogTitle
					id="alert-dialog-title"
					style={{
						borderBottom: '1px solid lightgrey'
					}}
				>
					{'Update Product'}
				</DialogTitle>
				<DialogContent>
					<form class="form-horizontal" onSubmit={mySubmitHandler}>
						<br />
						<input
							class="form-control form-control-lg"
							type="text"
							name="title"
							defaultValue={clickedProduct.title}
							placeholder="Title"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<br />
						<input
							class="form-control form-control-lg"
							type="text"
							name="price"
							placeholder="Price"
							defaultValue={clickedProduct.price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
						<br />
						<br />
						<div
							style={{
								float: 'right'
							}}
						>
							<button type="submit" className="my-button1" onClick={updateOffer(clickedProduct)}>
								Update
							</button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default InfluenceOfferingCaed;

// .then(function (response) {
//   console.log(response);
//   alert("Profile Added Succesfully",5000)
//   history.push("/profile");
//   //set states here to render in map from response.data
// })
// .catch(function (error) {

//   alert('Something Went Wron Check All Fields And Fill it ')
// })
// .then(function () {
//   // always executed

// });
// axios.put('api/infulencerOffer/editProduct/', formData, config)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });

// axios.put('api/infulencerOffer/editProduct/',user)
