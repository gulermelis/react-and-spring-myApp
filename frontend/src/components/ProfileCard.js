import React from 'react';
import { withRouter} from 'react-router-dom';
// import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

/* Eski //Silinen //Lifting
    // burada 2 tane veriye ihtiyacımız var, login olan kullanıcı bilgisi ve bulundugumuz sayfa bilgisi.
    // login olan kullanıcı ile bulundugumuz sayfa 
    // eşitse o zaman kullaıcı sayfasındayız demektir edit yapılabilir.
    // pathi nasıl alırız? devtools=> userpage comp => birtakım propertyler var, history,match..
    // ueserpage react router ile render edild. için, bazı propertyleri geliyor, devtools dan gorebiliriz.
    // match in içersinde params dan username blgisine erişebiliyoruz. userpage de
    //profilecard da bu bilgilere erişmek için userpage de profile card ı cagırarak parametre geçiyoruz. */
    
    /*  Yeni
    fonks. tipinde componentlere context type set edmiyıryz   
    */

const ProfileCard = props => {

                const pathUsername = props.match.params.username; 
        //       const loggedInUsername = value.state.username;
         //         const loggedInUsername = props.username; // store dan aldık
                let message= 'we cannot edit';

                if(pathUsername === props.loggedInUsername){
                    message= 'We can edit';
                }
                return <div> {message } </div>
        
           };

//{...this.props} bunu aşağıdaki sınıftan match prop lara erişmek için ekledik

//  class ProfileCardContextWrapperr extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <div>
//                 <ProfileCard {...this.props} username= { this.context.state.username } />
//             </div>
//         )
//     }
// }


//bu şekilde aldığımız state i componente props vermiş oluyoruz
const mapStateToProps = (store) => {  
    return{
        loggedInUsername: store.username
    };
  };

// react router bize aradığımız parametreleri withRouter componenti aracılığıyla versin.
export default connect(mapStateToProps)( withRouter(ProfileCard));