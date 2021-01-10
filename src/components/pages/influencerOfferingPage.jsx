// @flow
import * as React from 'react';
import  {useState } from "react";
import InfluenceOfferingCard from './influenceOfferingCaed'
import "../../CSS/influenceOffering.css"
import Face from '../../images/dp.png'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react';
 import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  }));

function InfluencerOfferingPage() {

  const [firstName, setFirstName] = useState("");
  const [userName, setuserName] = useState("");
  const [profile,setProfile] = useState("");
  
  const jwtDecode = () => {
    let token;
    token = localStorage.usertoken ? localStorage.usertoken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY"
    const decoded = jwt_decode(token)
    let currentId = decoded._id

    return currentId;


  }

  useEffect(() => {
            
 

    axios.get('api/auth/getUserProfile/'+jwtDecode())
    .then((res) => {
      setProfile(res.data)
      console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    
},[])

    const classes = useStyles();
  return (
    <div>
      <div>
            <div className="row">
              <div className="col-lg-3 col-xl-3 col-sm-12 col-xs-12 col-md-12">
                    <div style={{
                      backgroundColor: '#f0f3f5',
                      padding: '15px',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div className="row">
                        <div className="col-6 col-lg-12 col-xl-12">
                            <Avatar alt="Remy Sharp" src={profile.profilePic} style={{
                            width: '100%',
                            height: '100%'
                          }} />
                        </div>
                        <div className="col-6 col-lg-12 col-xl-12" style={{
                          margin: 'auto'
                        }}>
                                  <div>
                                  <b style={{
                                    color : '#495056',
                                    fontSize : '35.79px'
                                    }}>{profile.name}</b>
                                    <br/>
                                    <b style={{
                                      color: '#df362d',
                                      fontSize : '23.86px',
                                      textTransform: 'lowercase'
                                      }}>@{profile.username}</b>
                                      <br/>

                                      {/* <Link to="/InfluencerLinkPage"> */}
                                        <Link to="/influencePage" className="my-button">
                                            Social Media Links
                                        </Link>
                                      {/* </Link> */}
                                  
                                  </div>
                        </div>
                        

                      </div>
                      
                        <br/>

                    </div>
              </div>
              <div className="col-lg-9 col-xl-9 col-sm-12 col-xs-12 col-md-12" style={{
                marginTop : '15px'
              }}>
                
                  <InfluenceOfferingCard />
              </div>
            </div>
      </div>
    </div>
  );
};

export default InfluencerOfferingPage


{/* <div className="webView">
            <div className="row">
                <div className="col-lg-4 col-xl-4 col-md-12 col-xs-12 col-sm-12" style={{
              maxInlineSize : 'fit-content'
            }}>
                    <div className="profileDisplay">
                        <Avatar alt="Remy Sharp" src={""+profile.profilePic} className={classes.large} />
                        <br/>
                        <b className="ml-4" style={{
                                    color : '#495056',
                                    fontSize : '35.79px'
                                    }}>{profile.name}</b>
                        <br/>
                        <div style={{
                            textAlign : 'center'
                        }}>
                            <b style={{
                            color: '#df362d',
                            fontSize : '23.86px',
                            textTransform: 'lowercase'
                            }}>@{profile.username}</b>
                        </div>
                        <br/>
                        <div style={{
                            textAlign : 'center'
                        }}>
                            <button className="my-button btn-block">
                                Social Media Links
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xl-8 col-md-12 col-xs-12 col-sm-12">
                
                    <InfluenceOfferingCard />
                </div>
            </div>
            </div>
            <div className="mobView">
              <div className="container-fluid">
                <div className="row">
                      <div className="profileDisplay">
                        <div className="row">
                          <div className="col-3">
                            <Avatar alt="Remy Sharp" src={profile.profilePic} className={classes.small} />
                          </div>
                          <div className="col-2"></div>
                          <div className="col-7">
                            <div style={{
                              textAlign : 'center'
                            }}>
                            <b className="ml-4" style={{
                                    color : '#495056',
                                    fontSize : '21px',
                                    letterSpacing : '2px'
                                    }}> {profile.name} </b>
                        <br/>
                        <div style={{
                            textAlign : 'center'
                        }}>
                            <b style={{
                            color: '#df362d',
                            fontSize : '14px',
                            textTransform: 'lowercase'
                            }}>@{profile.username}</b>
                        </div>
                        <br/>
                        <div style={{
                            textAlign : 'center'
                        }}>
                            <button className="my-button btn-block">
                                Social Media Links
                            </button>
                        </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-12">
                  <InfluenceOfferingCard />
                  </div>
                </div>
              </div>
            </div> */}