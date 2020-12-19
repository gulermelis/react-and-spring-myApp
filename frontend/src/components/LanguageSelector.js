import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/ApiCalls';

import {Container} from  'reactstrap';

const LanguageSelector = (props) => {
 //i18 den sadce t almıyoruz. i18n yi de alıyoruz
    const onChangeLanguage = language =>{
        const { i18n } = props;
        i18n.changeLanguage(language); 
        changeLanguage(language); //axiosun dil ayarlarını değiştiriyoruz ki, warning dili de değişsin
    };

    return (
        <Container>
          <ul className="navbar-nav ml-auto navbar-expand ">
        <li className=" nav-item"
           onClick={() => onChangeLanguage('tr')}
           style={{ cursor: 'pointer' }}
        >TR/</li>
         
        <li className=" nav-item"
           onClick={() => onChangeLanguage('en')}
           style={{ cursor: 'pointer' }}
        >EN</li>
       </ul>
        </Container>
    );
};

export default withTranslation()(LanguageSelector);