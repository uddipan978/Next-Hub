// @flow
import * as React from 'react';
import Face from '../../images/dp.png'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import '../../CSS/influencer.css'
import  {useState } from "react";
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react';
 import axios from 'axios' 
 import Button from '@material-ui/core/Button';
 import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputLabel } from '@material-ui/core';
import swal from 'sweetalert';

import {successfullyUpdateProfile,socialUpdate, addSocialProfile} from '../functions/notifications'
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({




    
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  }));
function InfluencerLinkPage() {

  const [editData,setEditData]=React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [editopen,setEditOpen]=React.useState(false);
    const [editprofileopen,setEditProfileOpen]=React.useState(false);
    const [editprofileopen1,setEditProfileOpen1]=React.useState(false);
    
    const handleClickOpen = () => {
    setOpen(true);




  };

  const handleClickOpen1 = (item) => {
    setEditOpen(true);
    setEditData(item)
    setSocialAccountId(item._id)
    setPopUpEditLink(item.link)
    console.log(popUpEditLink)
    console.log(item._id)
console.log(item)




  };

  const handleClickOpen2 = () => {
  setEditProfileOpen(true);
   





  };

  
  const handleClickOpen3 = () => {
    setEditProfileOpen1(true);
     
  
  
  
  
  
    };
  





  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setEditOpen(false);
  };

  const handleClose2 = () => {
    setEditProfileOpen(false);
  };
  const handleClose3 = () => {
    setEditProfileOpen1(false);
  };


  


    const [profile,setProfile] = useState("");
    const classes = useStyles();

  
  
    const jwtDecode = () => {
      let token;
      token = localStorage.usertoken ? localStorage.usertoken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRjNjEyZjgzZDc5YzBlYWNiNGE1MjgiLCJuYW1lIjoiaGFtemEiLCJlbWFpbCI6ImRmZ2RnZGdnQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQGhhbXphamFtc2hlZCIsInByb2ZpbGVQaWMiOiIuLlxcaW1hZ2VzXFw1ZmRjNjZlOTQ2OGY2MjQyZjRmNTA3ZmVpbWFnZSAyLnBuZyIsImlhdCI6MTYwODM2NDM2OX0.n5LJTr_tMja6AIQXh7yUZCQzTS2fFHC29FlCJpwCUrY"
      const decoded = jwt_decode(token)
      let currentId = decoded._id
  
      return currentId;
  
  
    }

    // add new Social Account !st time

  const   onAddNewAccount = () =>{

    const userSocial= {

userId: jwtDecode(),
scoial:[{

title:"",
link:""
}
]

    }

axios.post('api/social/adduserSocialAccounts',userSocial).then(res=>{

console.log(res)


}).catch(err=>{

console.log(err)

})



  }
  
    useEffect(() => {
              
   
  
      axios.get('api/auth/getUserProfile/'+jwtDecode())
      .then((res) => {

        setProfile(res.data)
        setName(res.data.name);
        setUsername(res.data.username)
        
      console.log(username);
      console.log(name)
        console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
      
  },[])





  // check the user social Accounts and get
const [socialProfile, setSocialProfile]=useState([])
const [socialId, setSociaId]=useState("")
  useEffect(() => {
              
   
  
    axios.get('api/social/getSocialAccounts/'+jwtDecode())
    .then((res) => {

     
      setSociaId(res.data._id)
      console.log(res.data)
      console.log(res.data._id)
      console.log(socialId)
    })
    .catch((err) => {
        console.log(err)
    })
    
},[])

useEffect(() => {
              
   
  
    axios.get('api/social/getSocialAccounts/'+jwtDecode())
    .then((res) => {

     
      setSocialProfile(res.data.social)
      
      
    //   console.log(res.data.social[0])
    })
    .catch((err) => {
        console.log(err)
    })
    
},[socialId])

useEffect(() => {
    console.log(socialProfile)
},[socialProfile])


//---------------------pop up  for addnew Social Work--------------//

//  set states of pop up fields

const [socialTitle,setSocialTitle]= useState("");
const [socialLink, setSocialLink]=useState("");
const handleChangeTitle =(event)=>{

    setSocialTitle(event.target.value)
} 
const handleChangeLink =(event)=>{

    setSocialLink(event.target.value)
}

// add new Social Profile


const addNewSocialProfile = ()=>{
 
axios.post("api/social/addNewLink/"+socialId,{
    title:socialTitle,
    link:socialLink
}).then(res=>{
    console.log(res)
    window.location.reload();
    addSocialProfile()
    handleClose1 ();


    
}).catch(err=>console.log(err))


}
// edit social pop up work
const [popUpEditLink ,setPopUpEditLink]= useState("")
const [socialAccountId,setSocialAccountId]=useState("")
// const handleChangeEditLink =(event)=>{

//    setPopUpEditLink(event.target.value)
//    console.log(event.target.value)

// }
const submitNewLink=()=>{
  console.log(socialId)
  console.log(socialAccountId)

  let objId = socialId
   let   linkId=socialAccountId
axios.put("api/social/update/"+ objId +"/"+ linkId,{
  link:popUpEditLink
})
.then(res=>{
  console.log(res)
socialUpdate()
  window.location.reload();
  
  swal("Your Social profile Link Succesfully Updated", "", "success");
  handleClose1 ();


}).catch((err)=>{console.log(err)})

}


//----------------Edit Profile name and user name------------------//
const [name ,setName]= useState("")
const [username,setUsername]=useState("")

const updateProfile =()=>{

  const newData ={

    name:name,
    username:username

  }

axios.put("api/users/updateprofile/"+jwtDecode(),newData).then(res=>{

console.log(res)
successfullyUpdateProfile()

//swal("Profile Update  Successfull", "", "success");
  handleClose2 ();
  handleClose3 ();
  // alert('Successfully Update your Profile')
setProfile(newData)
return 

  //window.location.reload();

  

}).catch(err=>{

console.log(err)

})


}


  return (<div>
    {!localStorage.usertoken?(   <div className="container mb-5">
    <div className="row" style={{
        backgroundColor : '#f0f3f5',
        width: '45%',
        borderRadius : '10px',
        marginLeft : '30%'
    }}>
        <div className="col-6 mt-2 mb-2">
            <Avatar alt="Remy Sharp" src={Face} className={classes.large} />
        </div>
        <div className="col-6 mt-2 mb-2">
            
                <br/>
                    <b className="ml-4" style={{
                            color : '#495056',
                            fontSize : '35.79px'
                            }}>Name</b>
                <br/>
                <div style={{
                    textAlign : 'center'
                }}>
                    <b style={{
                    color: '#df362d',
                    fontSize : '23.86px'
                    }}>@username</b>
                </div>
                <br/>
                <div style={{
                    textAlign : 'center'
                }}>
                  
                    <button to="/InfluencePageOffering" className="my-button">
                    <Link to="/InfluencePageOffering">
                        Offerings
                        </Link>
                    </button>
                </div>
                
        </div>
    </div>
        <br/>
        <div className="linkedSocialApps">
            YouTube    
        </div>
        <br/>
        <div className="linkedSocialApps">
            Instagram    
        </div>
        <br/>
        <div className="linkedSocialApps">
            Art Instagram    
        </div>
        <br/>
        <div className="linkedSocialApps">
            Tik Tok    
        </div>
</div>):(   <div className="container mb-5">
<div className="row" style={{
    backgroundColor : '#f0f3f5',
    width: '65%',
    borderRadius : '10px',
    marginLeft : '20%'
}}>
    <div className="col-4 mt-2 mb-2">
        <Avatar alt="Remy Sharp" src={""+profile.profilePic} className={classes.large} />
    </div>
    <div className="col-8 mt-2 mb-2">
        
            <br/>
            <div className="row">
            <div className="col-8 text-center"><b className="" style={{
              color : '#495056',
              fontSize : '35.79px'
              }}>{profile.name}</b></div>
            <div className="col-4"
            style={{marginTop:"4px", textAlign:"center"}}
            
            ><button 
            className="btn btn-md" 
            style={{ textAlign : 'center' , backgroundColor:"#617691",color:"white", width:"120px"}}
            onClick={handleClickOpen2}>Edit Name</button></div>
            </div>
               <br/>

               <div className="row">
               <div className="col-8 text-center"><b style={{
                color: '#df362d',
                fontSize : '23.86px'
                }}>@{profile.username}</b></div>
               <div className="col-4">
               <button className="btn btn-md"
                onClick={handleClickOpen3}
                 style={{ textAlign : 'center', backgroundColor:"#617691",color:"white", width:"120px"}}
                 >
                 Edit Username
                 </button>
                 </div>
               </div>

            <br/>

            <div className="row">
            <div className="col-8 text-center"><div style={{
              textAlign : 'center'
          }}>
          <Link to="/InfluencePageOffering" className="my-button">
          
              Offerings
              </Link>
          
          </div></div>
            <div className="col-4"></div>
            </div>
            
            
    </div>
</div>


    <br/>
    {  socialProfile.map((item,i)=> 
       <div> <div className="linkedSocialApps">
       <div className="row">
       <div className="col-9 text-center"><div className="linkedSocialApps">
   {item.title}</div>
   </div>
       <div
       className="col-3"><button 
       className="btn btn-lg"
       style={{backgroundColor:"#617691",color:"white", width:"70px"}}
       onClick={() => {
        handleClickOpen1(item)
       }}>Edit</button></div>
       </div>
       </div><br/></div>
   
       
   
   
   )}

    
<br/>
    <div className="linkedSocialApps">
    
 <button 
    className="btn btn-lg" 
    style={{backgroundColor:"#617691",color:"white", width:"130px"}}
  onClick={handleClickOpen}


  
    >Add New</button>
            
    </div>
    <br/>
    
</div>)}




<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Social Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add your Social Account Add the title  and the url of your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={event=>handleChangeTitle(event)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Social Account Link"
            fullWidth
            type="text"
            
            onChange={event=>handleChangeLink(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewSocialProfile} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>





      <Dialog open={editopen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit your Social Account Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add your Social Account Add the url link again.
          </DialogContentText>

         
          <TextField
          autoFocus
          margin="dense"
          id="link"
          label={editData.title + " Account Link"}
          fullWidth
          type="text"
         value={popUpEditLink}
          onChange={event =>setPopUpEditLink(event.target.value)}
        />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={submitNewLink } color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>







    {/*   Profile Update Route*/ }
    <Dialog open={editprofileopen} onClose={handleClose2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit your profile Name</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="Name"
          value={name}
          onChange={(event)=>setName(event.target.value)}
          fullWidth
          type="text"
        
          
        />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Cancel
          </Button>
          <Button  color="primary" onClick={updateProfile}>
            Add
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog open={editprofileopen1} onClose={handleClose2} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit your profile username</DialogTitle>
      <DialogContent>
        <TextField
        autoFocus
        margin="dense"
        id="UserName"
        value={username}
        onChange={(event)=>setUsername(event.target.value)}
        
        fullWidth
        type="text"
      
        
      />
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3} color="primary">
          Cancel
        </Button>
        <Button  color="primary" onClick={updateProfile}>
          Add
        </Button>
      </DialogActions>
    </Dialog>




</div>  











      

 
  );
};
export default InfluencerLinkPage
