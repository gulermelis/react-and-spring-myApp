import React from 'react';
import ProfileCard from '../components/ProfileCard';


import { } from  'reactstrap';

const UserPage = (props) => {
    return (
        <div className="container">

            <ProfileCard />
            {/* <ProfileCard currrentUserPath = {this.props.match.params.username }/> 
                * Bu kısmı profile card dan username bilgisine erişilsin diye yaptık 
                *ama bu yöntem çirkin bir yöntem, 
                *bunun yerine profilecardda react-router-dom u import edicez
            */}
            
            {/* login olan kull. bilgis. 
            için app den username i alıyoruz. profilecarda paslıyoruz */}
        </div>
    );
};

export default UserPage;