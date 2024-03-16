import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from './options-select.module.css';

const OptionsSelect = props => {

    return(
        <>
            <Box className={props.fullSize ? styles.optionFull : styles.option}>
                <Box className={styles.options} sx={{ '@media (max-width: 600px)': { display: props.options.length > 2 && 'grid' } }}>
                    {props.options.map((optionValue, index) => (
                        <Box 
                            key={index} 
                            className={index == 0 ? styles.optionLeft : index == (props.options.length-1) ? styles.optionRight : styles.optionMiddle } 
                            sx={{ 
                                backgroundColor: props.option === optionValue.value && '#9643FF', 
                                color: props.option === optionValue.value && '#FFF',
                                width: props.fullSize && `${(100-props.options.length)}%`
                            }} 
                            onClick={() => {
                                props.onChange(optionValue.value);
                            }}
                        >
                            <Typography>{optionValue.label}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default OptionsSelect;