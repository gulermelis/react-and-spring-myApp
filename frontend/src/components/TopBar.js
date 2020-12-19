import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

 class TopBar extends Component {

    /* //lifting state up için app.js e kopyalıyoruz. üst componentn old. içib
    state={
        isLoggedIn: true,
        username: "user1"
    } */

    render() {
        const { t } = this.props;
       // const { isLoggedIn, username} = this.state;
       const { isLoggedIn, username, onLogoutSuccess} = this.props;

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

export default withTranslation()(TopBar);