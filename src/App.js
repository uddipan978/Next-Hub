import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Route, Switch } from "react-router-dom";
import SignIn from './components/subComponents/SignIn'
import Header from './components/layouts/header';
import Landing from './components/pages/landingPage'
import SignUp from './components/subComponents/signUp';
import Search from "./components/pages/searchPage"
import InfluencePage from './components/pages/influencerLinkPage'
import InfluencePageOffering from "./components/pages/influencerOfferingPage"
import InfluencerDealInProgress from './components/pages/InfluencerDealInProgress';
import SignInn from './components/pages/signInn';
import EditProduct from './components/subComponents/EditProduct'
import InfluencerLinkPage from './components/pages/influencerLinkPage'
import axios from "axios"
import InfluencerCreateDeal from './components/pages/influencerCreateDeal';


// axios.defaults.baseURL = "http://18.216.12.52/api/"
axios.defaults.baseURL = "http://localhost:5000/"
function App() {
  return (
   
        
        <div style={{
          fontFamily : 'Jaldi, sans-serif'
        }}>
          <Header />
          <div className=" container-fluid mt-5">
              <Switch>
              <Route path="/signUp" component={SignUp}/>
              <Route path="/sign" component={SignIn}/>
              <Route path="/signInn" component={SignInn}/>
              <Route path="/searchMarketPlace" component={Search}/>
              <Route path="/InfluencerLinkPage" component={InfluencerLinkPage}/>
              <Route path="/InfluencePage" component={InfluencePage} />
              <Route path="/InfluencePageOffering" component={InfluencePageOffering} />
              <Route path="/InfluencerDealInProgress/:id" component={InfluencerDealInProgress} />
              <Route path="/InfluencerCreateDeal" component={InfluencerCreateDeal} />
              <Route path="/editProduct" component={EditProduct} />

              
              <Route path="/" component={Landing}/>
       
            </Switch>
          </div>
        </div>
        
        
  );
}

export default App;
