/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {InputForm} from '../components/InputForm';
import { signup } from '../api/ApiCalls';
import {withTranslation} from 'react-i18next';
import {withApiProgress} from '../shared/ApiProgress';

import {Form,Container,Row,Col} from  'reactstrap';
import ButtonWithProgress from '../components/ButtonWithProgress';

 class UserSignupPage extends Component{ //class component statefull component
    state= {
        username: null, // 
        agreedClicked: false,
        displayName:null,
        password:null,
        passwordRepeat:null,

        pendingApiCall: false,
        errors :{}

    }

    //her input için ayrı ayrı change fonksiyonu yazmak yerine: 
    //bu metodu yazmadan önce inputların her birine name attribute vermeliyiz ve bunların değerleri state değişkenleriyle aynı olmalı
    onChange = event => {
        const {name, value} = event.target; // destructuring //parçalama
        const errors = {...this.state.errors}; // spread operatörüyle state deki errors objesinin kopyasını aldık
        errors[name] = undefined;
        if(name === 'password' || name === 'passwordRepeat'){
            if(name ==='password' && value !== this.state.passwordRepeat ){
                errors.passwordRepeat = this.props.t('Password mismatch');
            }else if(name === 'passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = this.props.t('Password mismatch');
            }else{
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name] : value, //state deki inputların değerini günceller
            errors // erros objesinin içerisindeki inputlarla ilgili hata mesajlarını da günceller
        });

    }

    
    // onChangeAgree= event =>{
    //     this.setState({
    //         agreedClicked: event.target.checked
    //     });
    // }
    
   /*
    onChangeUserName=(event)=>{
        console.log(event.target.value);
        this.setState({
            username:event.target.value
        }); 

*/

    onClickSignup = async event =>{
        event.preventDefault(); //browserın bizim yerimize formu göndermye calısmasını engelliyoruz
        
        const {username, displayName, password }= this.state;
        
        const body = {
            /**Eğer key ve value için kullanılan isimlendirmeler aynıysa sadece bir tanesini kullanmak yeterli 
            username: username,
            displayName:displayName,
            password:password
            */
           username, 
           displayName,
           password
        };
        //body objesini axios ile backende gödneriyoruz.  
        //*aşağıdkai şekilde yaparsak backende post metoduna @crossorigin eklemeliyiz  
        
        // axios.post('http://localhost:8080/api/1.0/users', body);  !! çalışır ama sağlıklı değil
    
        this.setState({pendingApiCall: true});
        
        //aşağıdaki gibi ayarlarsak crossorigine de gerek kalmaz.(row84)
       // axios.post('/api/1.0/users', body) //package.json da proxy ayarına backend portunu belirtmeliyiz.

       
            // signup(body).then(response => {
            //     this.setState({pendingApiCall: false});
            // })
            // .catch(error => {
            //     this.setState({ pendingApiCall: false});
            // });

        /**-row 85-90- axios.post asenkron çalışan bir kod bloğu
          *asenkron javascript
          *promise özelliği
          *success ve fail durumları burayı ekleyeceğimiz fonksıyonlarla çözümlenebilir.
          *post success ise then çalışır. then içerisinde response dönülür
          *fail ise catch bloğu çalışır.
        */
        /**asenkron çalışan kod bloğunun bitmesini beklememiz gerekiyorsa, success ve fail durumları
         *için gereken callback fonksiyonları tanımlamamız lazım (then-catch)
         *bu callback foksyionların çağrılmasını bekliyoruz ancak o durumda bu asenkron blogun çalışmasının bittiğinden emin olabiliriz.
        */

       try {
        const response = await signup(body);
      } catch (error) {
        if(error.response.data.validationErrors){
            this.setState({
                errors: error.response.data.validationErrors});
        }
        
      }
  
      this.setState({ pendingApiCall: false });


    };
   



    render(){ /**override method */
        const {errors} = this.state;
        const {username, displayName, password,passwordRepeat} = errors;
        const { t, pendingApiCall} = this.props;

        return(
            <Container>
            <Row>
            <Col xs="3"></Col>
            <Col xs="6">
            <Form>
                <h3 align="center">{this.props.t('Sign Up')}</h3>
                <InputForm name="username" label={t('Username')} error={username} onChange={this.onChange}/>
                <InputForm name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}/>
                <InputForm name="password" label={t('Password')}error={password} onChange={this.onChange}  type="password"/>
                <InputForm name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password"/> 
        
                  {/*  <div className="form-group">
                   <Label>Username</Label>
                    <Input name="username" type="text" onChange={ this.onChange
                        //function(event){console.log(event.target.value);} inputun değerine erişebiliyoruz.
                        // classın altında arrow functionla yazalım
                    } invalid={username} />
                    <FormFeedback>{username}</FormFeedback> 
                    </div> 
                  */}      
                  
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={ this.onClickSignup}
                        disabled={pendingApiCall || passwordRepeat !== undefined}
                        pendingApiCall = {pendingApiCall}
                        text= {t('Sign Up')}
                    />
                </div>
                <p className="forgot-password text-right">
                    {t('Already registered')} <b>{t('sign in?')}</b>
                </p>

                
            </Form>
            </Col>
            </Row>
            </Container>     
       
        );
    }
}

// translation özellikli bir usersignuppage i import ediyoruz
//high order componenet => componentimizi baska bir componenetin içine ekleyip, ordan bazı özellikler kazandırmak

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, '/api/1.0/users');

const UserSignupPageWithTranslation =  withTranslation()(UserSignupPageWithApiProgress);
export default UserSignupPageWithTranslation;