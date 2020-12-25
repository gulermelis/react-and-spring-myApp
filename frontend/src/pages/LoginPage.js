import {InputForm} from '../components/InputForm';
import {withTranslation} from 'react-i18next';
import {Form,Container,Row,Col} from  'reactstrap';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { loginHandler } from '../redux/authActions';
import React, { useEffect, useState } from "react";


const LoginPage = (props) => {
   
    // static contextType= Authentication;

    // state={
    //     username: null,
    //     password: null,
    //     error:null,
  
    // }

    const [username, setUsername] = useState(); //username için state objesi
    const [password, setPassword] = useState();
    const [error, setError] = useState();
  
    //Bir etki oldugunda tetiklenecek fonks. //inputlar değiştirilmeye başlandığında error mesajı kaybolsun
    //birinci parametre=>çalıştırılacak fonks , ikinci parametre => nelere etki edildiğinde
    useEffect(() => {
        setError(undefined);
    }, [username, password])
//    const onChange = event =>{
//         const {name, value} = event.target;
//         // this.setState({
//         //     [name]: value,
//         //     error: null
//         // })

//     };
  
   const onClickLogin =async event =>{
        event.preventDefault();
        // const {username,password} = this.state;
        // const onLoginSuccess = () => { };
        const creds = {  
            username,  // username: this.state.username,  //key-value aynı kelime old. için kısalttık
            password   //password: this.state.password,
        };

        const {history, dispatch } = props;
        const { push } = history;

        // this.setState({
        //     error: null
        // });
       
       setError(undefined);
       try{
            await dispatch(loginHandler(creds))
            push('/');  
       }catch(apiError){
            setError(apiError.response.data.message)
            // this.setState({
            //     error: apiError.response.data.message
            // });
           
       }
    }

    const { t, pendingApiCall } = props;
    //pendingApiCall u, child olarak aldık

    const buttonEnabled = username && password;

    return (
        <Container>
        <Row>
        <Col xs="3"></Col>
        <Col xs="6">
        <Form>
            <h3 align="center">{t('Login')}</h3>
            <InputForm  
                label={t('Username')}  
                onChange={(event) => { 
                    setUsername(event.target.value);
                    // setError(undefined);  //useEffect den sonra gerek kalmadı
                }
             } 
             />
            <InputForm  label={t('Password')}  onChange={(event) => setPassword(event.target.value)} type="password"/>    
            { error && <div className="alert alert-danger">
                 {error}
            </div> }
            <div className="text-center">
                <ButtonWithProgress 
                    onClick={ onClickLogin}
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
const LoginPageWithTranslation = withTranslation()(LoginPage);

/* const mapDispatchToProps = (dispatch) => {
    return{
        onLoginSuccess: (authState) => dispatch(loginSuccess(authState))
    }
}
 */
export default connect()(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));