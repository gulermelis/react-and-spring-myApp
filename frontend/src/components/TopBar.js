import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
// import { Authentication } from '../shared/AuthenticationContext';
 

class TopBar extends Component {

    // static contextType= Authentication;

    /* //lifting state up için app.js e kopyalıyoruz. üst componentn old. içib
    state={
        isLoggedIn: true,
        username: "user1"
    } */
/* 
    onClickLogout = () => {
      
      // const action = {   //reducer a düşen action //action ı dispatch ediyoruz / boş olamaz
      //   type: 'logout-success'
      // };
        
      this.props.dispatch(logoutSuccess());
    } */



    render() {    
       // const { isLoggedIn, username} = this.state;
      const { t, username, isLoggedIn, onLogoutSuccess} = this.props;
     
      
      
      let links= (
               <ul className="navbar-nav ml-auto ">
                   <li className=" nav-item">
                     <Link className="nav-link" to="/login">
                       {t('Login')}
                     </Link>
                   </li>
                   <li className=" nav-item">
                     <Link className="nav-link" to="/signup">
                       {t('Sign Up')}
                     </Link>
                   </li>
                 </ul>
        );
   
        if(isLoggedIn){
               links=(
                   <ul className="navbar-nav ml-auto ">
                   <li >
                      <Link className="nav-link" to={`/user/${username}`}>
                           {username}
                      </Link>
                   </li>
                   <li onClick = {onLogoutSuccess} style={{CURSOR: 'pointer'}}>  
                   {/* Logout a tıkladığımızda app deki onLogoutSuccess fonks na callback yapacak. */}
                       <Link className="nav-link" to="/">
                       {t('Logout')}
                       </Link>
                   </li>
                 </ul>
               );
        }
   
       return (
         <div className="shadow-sm bg-dark mb-2">
           <nav className="navbar navbar-dark text-white container navbar-expand sticky-top">
             <Link className="navbar-brand" to="/">
               SocialAPP
             </Link>
               {links}
           </nav>
         </div>
       );
       

   
    }
}

const TopBarWithTranslation = withTranslation()(TopBar);

//redux ın store ını alır
const mapStateToProps = (store) => {   //bu fonks ile redux daki state bilgisini alıyoruz
  return{
    //store //boyle dersek statedeki tüm bilgileri alırız
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  };
};

//redux ın disptach fonks nun property olarak bu compenente donusturulmesi
//redux ın disptach fonks alır
const mapDispatchToProps = dispatch  => {
  return{
    onLogoutSuccess: () => dispatch(logoutSuccess())
    
  };
};

// redux, store daki state i topbar componentine property olarak alacağımız bir fonks. yazıyrouz
//redux terminolojiside aksiyon gönderme işine dispatch diyoruz
export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);

//connect: redux a connect olurken reduxtan neyi alacağımız ile ilgili opsiyonlar sunuyor