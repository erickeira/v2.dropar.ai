import React, { useState,  useEffect } from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { countries } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent',
        },
        '&:hover fieldset': {
          borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'transparent',
        },
      },
      '& .MuiSelect-icon': {
        color: '#9643FF',
      },
      '& .MuiInputBase-root': {
        height: '24px',
      },
      '& .country-flag': {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '2px',
        marginTop: '-2px'
      }
    },
  }
}));

const CountrySelect = props => {
  const classes = useStyles();
  const [country, setCountry] = useState('br');

  useEffect(() => {
    const accept_language  = localStorage.getItem('dropar_language')
    if(accept_language){
      const code = countries.find(c => c.accept_language == accept_language)?.code
      setCountry(code);
    }
  },[])

  const handleChange = (event) => {
    setCountry(event.target.value);
    const countrieAux = countries.find(c => c.code == event.target.value)
    localStorage.setItem('dropar_language', countrieAux.accept_language)
    if(props?.callBackCountry) props?.callBackCountry(countrieAux)
  };

  return (
    <Box sx={{ backgroundColor: '#F5ECFF', padding: '8px 2px 8px 2px', ...props.sx }}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          size='small'
          id="outlined-select-country"
          select
          value={country}
          onChange={handleChange}
          variant="outlined"
        >
          {countries.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.flag}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Box>
  );
};

export default CountrySelect;