import React from 'react';
import {Button} from  'reactstrap';


const ButtonWithProgress = (props) => {

    const { onClick, pendingApiCall , disabled , text} = props;
    return (
        <Button type="submit" className="btn btn-block" color="secondary"
        onClick={ onClick}
        disabled={disabled}>
             {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
        </Button>
    );
};

export default ButtonWithProgress;
//<span className="spinner-border spinner-border-sm"></span>