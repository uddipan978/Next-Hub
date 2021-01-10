// import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import '../../CSS/editProduct.css'
// import axios from 'axios'
// class EditProduct extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             title: '',
//             price: null,
//             edit : true
//           };
//     }

//     componentDidMount = () => {
//         console.log(this.props)
//     }

//     mySubmitHandler = (event) => {
//         event.preventDefault();
//         let price = this.state.price;
//         if (!Number(price)) {
//           alert("Your price must be a number");
//         }

//         let newProfile = {
//             price : this.state.price,
//             title : this.state.title,
//             image : null
//         }

//         var form_data = new FormData();
//         for (var key in newProfile) {
//           form_data.append(key, newProfile[key]);
//         }
//         console.log(newProfile)
//         axios.put('api/infulencerOffer/editProduct/'+'5fd9e6f22276d42114e4144f',form_data )
//         .then((res) => {
//             console.log(res.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
        
//         // .then(function (response) {
//         //   console.log(response);
//         //   alert("Profile Added Succesfully",5000)
//         //   history.push("/profile");
//         //   //set states here to render in map from response.data
//         // })
//         // .catch(function (error) {
    
//         //   alert('Something Went Wron Check All Fields And Fill it ')
//         // })
//         // .then(function () {
//         //   // always executed
         
//         // });
//         // axios.put('api/infulencerOffer/editProduct/', formData, config)
//         //     .then(response => {
//         //         console.log(response);
//         //     })
//         //     .catch(error => {
//         //         console.log(error);
//         //     });

//         // axios.put('api/infulencerOffer/editProduct/',user)
//       }
//       myChangeHandler = (event) => {
//         let nam = event.target.name;
//         let val = event.target.value;
//         this.setState({[nam]: val});
//       }

//     closeEdit = () => {
//         this.setState(
//             {
//                 edit : false
//             }
//         )
//     }

//     render() {
//         return (
//             <Dialog
//             aria-labelledby="customized-dialog-title" 
//             open={this.state.edit}
//             onClose={this.closeEdit}
//             >
//                 <DialogTitle id="alert-dialog-title" style={{
//                     borderBottom : '1px solid lightgrey'
//                 }}>{"Update Product"}</DialogTitle>
//                 <DialogContent>
//                     <form class="form-horizontal" onSubmit={this.mySubmitHandler}>
//                         <br/>
//                     <input
//                         class="form-control form-control-lg"
//                         type='text'
//                         name='title'
//                         placeholder='Title'
//                         onChange={this.myChangeHandler}
//                     />
//                     <br/>
//                     <input
//                         class="form-control form-control-lg"
//                         type='text'
//                         name='price'
//                         placeholder='Price'
//                         onChange={this.myChangeHandler}
//                     />
//                     <br/>
//                     <br/>
//                     <div style={{
//                         float: 'right'
//                     }}>
//                     <button type='submit' className="my-button1">Update</button>
//                     </div>
//                     </form>
//                 </DialogContent>
              
//           </Dialog>
//         );
//     }
// }

// export default EditProduct;