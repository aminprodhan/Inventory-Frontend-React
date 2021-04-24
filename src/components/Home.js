import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login , isPropCheck} from '../actions/authActions';
import LoginPage from './Login';
import { withRouter,Redirect } from "react-router-dom";

class Home extends React.Component {

  constructor(props) {
    super(props);
    //const storedToken = localStorage.getItem("jwtToken");
    //this.loggedIn = localStorage.getItem('jwtToken') === 'true';
  }
  
  render() {

    //console.log("abcd = "+localStorage.getItem('jwtToken'));
    if(false) {       
      //this.context.router.push('/');
      //this.props.history.push('/dashboard');
      return <Redirect to={{ pathname: '/dashboard', state: { from: this.props.location } }} />
     } 
    return (
      <div className='d-flex flex-column'>
          <LoginPage/>
      </div>
    );
  }
}
Home.contextTypes = {
  //router: PropTypes.object.isRequired
}
Home.propTypes = {
  login: PropTypes.func.isRequired,
  isPropCheck: PropTypes.func.isRequired

}
const mapStateToProps= (state) => {
  return{
          isAuthenticated: state.auth.isAuthenticated,
          isUserLogin: state.auth.isUserLogin,
          userStatus: state.auth.userStatusType,
  }

}
export default connect(mapStateToProps, { login,isPropCheck })(Home);

//export default App;
