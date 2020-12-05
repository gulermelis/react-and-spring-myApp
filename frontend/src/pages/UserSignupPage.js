/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { signup } from '../api/ApiCalls';

import {Form,Container,Row,Col,Button, Label, Input,Spinner, FormFeedback} from  'reactstrap';

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
        //const value = event.target.value;
        //const  name = event.target.name;
        this.setState({
            [name] : value
        });

    }

    
    onChangeAgree= event =>{
        this.setState({
            agreedClicked: event.target.checked
        });
    }
    
   /*
    onChangeUserName=(event)=>{
        console.log(event.target.value);
        this.setState({
            username:event.target.value
        }); 
    }
    onChangeDisplayName= event =>{
        this.setState({
            displayName: event.target.value
        });
    }
    onChangePassword= event =>{
        this.setState({
            password: event.target.value
        });
    }
    onChangePasswordRepeat= event =>{
        this.setState({
            passwordRepeat: event.target.value
        });
    }
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
        
        console.log(error.response.data);
         //this.setState({errors: error.response.data.validationErrors});
      }
  
      this.setState({ pendingApiCall: false });


    };



    render(){ /**override method */
        
        return(
            <Container>
            <Row>
            <Col xs="1"></Col>
            <Col xs="9">
            <Form>
                <h3 align="center">Sign Up</h3>

                <div className="form-group">
                <Label>Username</Label>
                    <Input name="username" type="text" onChange={ this.onChange
                        //function(event){console.log(event.target.value);} inputun değerine erişebiliyoruz.
                        // classın altında arrow functionla yazalım
                    }/>
                    {/* <FormFeedback>{this.state.errors.username}</FormFeedback> */}
          
                </div>

                <div className="form-group">
                    <Label>Display Name</Label>
                    <Input name="displayName" type="text" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <Label>Password</Label>
                    <Input name="password" type="password" onChange={ this.onChange}/>
                </div>

                <div className="form-group">
                    <Label>Password Repeat</Label>
                    <Input name="passwordRepeat" type="password" onChange={this.onChange} />
                </div>

                <div className="text-center">
                <Button type="submit" className="btn btn-block" color="primary"
                 onClick={ this.onClickSignup}
                disabled={this.state.pendingApiCall}>
                {this.state.pendingApiCall ? <Spinner color="light" /> : ''}
                          Sign Up
                 </Button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <b>sign in?</b>
                </p>
            </Form>
            </Col>
            </Row>
            </Container>
            
               

                
           
            
       

        )

    }
}

export default UserSignupPage;