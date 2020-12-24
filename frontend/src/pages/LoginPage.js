import React, { Component } from 'react'
import {InputForm} from '../components/InputForm';
import {withTranslation} from 'react-i18next';
import { login } from '../api/ApiCalls';
import {Form,Container,Row,Col} from  'reactstrap';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from '../shared/ApiProgress';
// import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { loginSuccess } from '../redux/authActions';



class LoginPage extends Component {
   
    // static contextType= Authentication;

    state={
        username: null,
        password: null,
        error:null,
  
    }

  

    onChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            error: null
        })

    };
  
    onClickLogin =async event =>{
        event.preventDefault();
        const {username,password} = this.state;
        // const onLoginSuccess = () => { };
        const creds = {  
            username,  // username: this.state.username,  //key-value aynı kelime old. için kısalttık
            password   //password: this.state.password,
        };
        const { push } = this.props.history;

        this.setState({
            error: null
        });

       try{
           const response = await login(creds);  //success senaryo
            push('/');  

            const authState = {
                ...response.data,
                password
               /*  username: username,
                displayName: response.data.displayName ,  //response dan erişiyoruz, response data 3 ünü de veriyor
                image:response.data.ima */
            };

            // onLoginSuccess(authState);
      /*   
        const action = {            
            type: 'login-success', //must
            payload: authState  
        } */

        this.props.onLoginSuccess(authState);

       }catch(apiError){
            
            this.setState({
                error: apiError.response.data.message
            });
           
       }
    }

    render() {
        const { t, pendingApiCall } = this.props;
        //pendingApiCall u, child olarak aldık

        const buttonEnabled = this.state.username && this.state.password;
        return (
            <Container>
            <Row>
            <Col xs="3"></Col>
            <Col xs="6">
            <Form>
                <h3 align="center">{t('Login')}</h3>
                <InputForm name="username" label={t('Username')}  onChange={this.onChange}/>
                <InputForm name="password" label={t('Password')} onChange={this.onChange}  type="password"/>    
                { this.state.error && <div className="alert alert-danger">
                     {this.state.error}
                </div> }
                <div className="text-center">
                    <ButtonWithProgress 
                        onClick={ this.onClickLogin}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text= {t('Login')}
                      />               
                </div>
                <p className="forgot-password text-right">
                    {t('Not a member?')} <b>{t('Sign up now!')}</b>
                </p>
            </Form>
            </Col>
            </Row>
            </Container> 
        );
    }
}
const LoginPageWithTranslation = withTranslation()(LoginPage);

const mapDispatchToProps = (dispatch) => {
    return{
        onLoginSuccess: (authState) => dispatch(loginSuccess(authState))
    }
}

export default connect(null, mapDispatchToProps)(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));