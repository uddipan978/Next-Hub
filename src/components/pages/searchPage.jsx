// @flow
import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "../../CSS/search.css"
import CloseIcon from '@material-ui/icons/Close';
// import Image from "../../images/image1.png"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '30ch',
      },
    },
  }));
    function SearchPage() {
        const [ offers,setOffers ] = useState([]);
        const [ search,setSearch ] = useState('')
        const [filter,setFilter] = useState(false)
        const [ searchDefault,setDefault] = useState('Search')
        const [minPrice, setMinPrice] = useState('')
        const [maxPrice, setMaxPrice] = useState('')
        const [error, setError] = useState('')
        const classes = useStyles();
        // let searchDefault = 'Search'
        // let url1 = 'http://localhost:5000/';
        //  let url1 = 'http://18.217.95.60/backend/'
            useEffect(() => {
                axios.get("api/infulencerOffer/getAllOffers")
                .then((res) => {
                    setOffers(res.data)
                    
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
                
            },[])

       const onSearch = (e) => {

        
             setSearch(e.target.value)
        }

        const resetIt = () => {
            setSearch('')
            axios.get("api/infulencerOffer/getAllOffers")
                .then((res) => {
                    setOffers(res.data)
                     console.log(res.data)
                     
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const callSearchApi = () => {
            axios.get("api/infulencerOffer/getSearchProducts/"+search)
                .then((res) => {
                    setOffers(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

            console.log(search)
        }

        const filterNow = (e) => {
            e.preventDefault()
            console.log(maxPrice,minPrice)

            if(minPrice !== '' && maxPrice !== '')
            {
                if(maxPrice < minPrice) {
                    setError('Min price should be less than max price*')
                }else{
                    axios.post("api/infulencerOffer/getPrice",{
                        maxPrice:maxPrice,
                        minPrice:minPrice
                    })
                        .then((res) => {
                            setOffers(res.data)
                            setFilter(false)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }else if(minPrice === '' && maxPrice === ''){
                setError('Fields cannot be empty*')
            }else{
                setError('')
                axios.get("api/infulencerOffer/getPrice/"+maxPrice+'/'+minPrice)
                .then((res) => {
                    setFilter(false)
                    setOffers(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            

        }


  return (


        // #F0F3F5
    <div className="container-fluid">
            <div className="row">
                <div className="col-lg-9 col-xl-9 col-md-9 col-xs-12 col-sm-12">
                        
                        <div className="row"  style={{
                        backgroundColor : '#F0F3F5',
                        borderRadius : '55px',
                        
                    }}>
                            <div className="col-1">
                                <button type="submit" style={{
                                    border : 'none',
                                    backgroundColor: '#F0F3F5',
                                    verticalAlign: '-webkit-baseline-middle'
                                }}
                                className="form-control form-control-lg"
                                onClick={callSearchApi}
                                ><SearchIcon /></button>
                            </div>
                            <div className="col-10" style={{
                                verticleAlign: 'sub'
                            }}>
                                
                            {
                                search === ''
                                ?
                                <input type="text" placeholder="Search" name="search" style={{
                                    width : '100%',
                                    border : 'none',
                                    backgroundColor: '#F0F3F5',
                                    verticalAlign: '-webkit-baseline-middle'
                                }}
                                onChange={onSearch}
                                 className="form-control form-control-lg"
                                />
                                :
                                <input type="text" placeholder={search} name="search" style={{
                                    width : '100%',
                                    border : 'none',
                                    backgroundColor: '#F0F3F5',
                                    verticalAlign: '-webkit-baseline-middle'
                                }}
                                onChange={onSearch}
                                />
                            }
                            </div>
                            <div className="col-1">
                                    {
                                        search !== ''
                                        ?
                                        <span onClick={resetIt} style={{
                                            cursor : 'pointer',
                                            color: '#DF362D'
                                        }}>
                                            <CloseIcon />
                                        </span>
                                        :
                                        <span></span>
                                    }
                            </div>
                        </div>
                        
                    
  	                
                      
                </div>
                <div className="col-lg-3 col-xl-3 col-md-3 col-xs-4 col-sm-4" style={{
                    marginInline: 'auto'
                }}>
                    <span  className="filterButton">
                        <button className="filter-btn btn-block" onClick={() => {
                            setFilter(true)
                        }}>
                            Filters
                        </button>                        
                    </span>

                </div>
            </div>
            <br/>
            <br/>
            <div className="container-fluid">
                <div className="row">
                
                    {
                        offers.map((obj,i) => (
                            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12 col-xs-12" style={{
                                marginBottom : '15px'
                            }}>
                                    <div class="card img-fluid">
                                        <img class="card-img-top" src={axios.defaults.baseURL+obj.image} alt="Card image"
                                        style={{
                                            height: '-webkit-fill-available'
                                        }} />
                                        <div class="card-img-overlay" style={{
                                            color : 'white',
                                            backgroundColor : 'rgba(0, 0, 0, 0.5)',
                                            textAlign: 'center',
                                            position: 'absolute',
                                            display : 'grid',
                                            marginBlockStart: 'auto',
                                            height: '30%'
                                        }}>
                                            <h4> {obj.title} </h4>
                                            <h5>
                                                    ${obj.price}
                                            </h5>
                                        </div>
                                    </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <Dialog onClose={() => {setFilter(false)}} aria-labelledby="customized-dialog-title" open={filter}>
                       Hello from filter page
                        <br/>
                        
                </Dialog> */}
                <Drawer anchor={'right'} open={filter} onClose={() => {setFilter(false)}} >
                        
                            <br/>
                            <h3 style={{
                                textAlign : 'center',
                                color: '#DF362D',
                                fontWeight: 'bold'
                            }}>Filter Box</h3>
                            <br/>
                            <Divider />
                            <br/>
                            <p style={{
                                color: 'red',
                                fontSize : '12px',
                                textAlign: 'center'
                            }}> {error} </p>
                        <div className="container-fluid">
                            
                            <form className={classes.root} onSubmit={filterNow} noValidate autoComplete="off">
                            
                            <div className="row">
                                <TextField fullWidth={true} color='secondary' id="outlined-basic" label="Min Price" variant="outlined" type="number" onChange={(e) => {
                                    setMinPrice(e.target.value)
                                }} />
                            </div>

                            <div className="row">
                                <TextField fullWidth={true} color='secondary' id="outlined-basic" label="Max Price" variant="outlined" type="number" onChange={(e) => {
                                    setMaxPrice(e.target.value)
                                }} />
                            </div>

                              <div className="row">
                            
                                    <button className="my-button1 btn-block" type="submit">
                                        Search
                                    </button>

                              </div>
                               
                            </form>
                            </div>
                </Drawer>
    </div>
  );
};
export default SearchPage