import BrazilIcon from '../assets/icons/brazil.svg';
import UnitedStatesIcon from '../assets/icons/usa.png';
const urlImages = "https://dropar.s3.amazonaws.com";

const countries = [
    { 
        code: 'br', 
        accept_language: 'pt_BR',
        name: 'Brasil', 
        flag: 
            <img 
                src={BrazilIcon} 
                className="country-flag"
                style={{ width: '20px' }} 
            />,
        ddd: '55'
    },
    { 
        code: 'us', 
        accept_language: 'en', 
        name: 'Estados Unidos', 
        flag: 
            <img
             src={UnitedStatesIcon} 
             className="country-flag" 
             style={{ width: '20px' }}
             />,
        ddd: ''
    },
];

export{
    countries,
    urlImages
}  