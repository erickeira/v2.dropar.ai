import { Box, Typography, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { urlImages } from "../utils";
import BagIcon from '../assets/icons/bag-purple.svg';

const useStyles = makeStyles((theme) => ({
    boxPlataform: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
        padding: '4px 16px 4px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: '#666',
        '&:hover':{
            backgroundColor: '#9643FF',
            color: '#fff'
        }
    },
    boxInfoPlataform: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    boxInfoPlataformImage: {
        width: '35px',
        height: '35px'
    }
}));

const ItemPlataform = props => {

    const classes = useStyles();

    return(
        <Box 
             style={{ backgroundColor: props.plataform.id === props.selectedPlataform && '#F5ECFF' }} 
             className={classes.boxPlataform}
             onClick={() => {props.handleClick(props.plataform.id)}}
        >
            <Box className={classes.boxInfoPlataform}>
                {
                    props.plataform.logo ? 
                    <img 
                        src={`${urlImages}/${props.plataform.logo}`} 
                        className={classes.boxInfoPlataformImage}
                    />
                    :
                    <img src={BagIcon} className={classes.boxInfoPlataformImage}/>
                }
                
                <Typography>{props.plataform.name}</Typography>
            </Box>
            <input type="checkbox" id="checkbox"  checked={props.plataform.id === props.selectedPlataform && true} />
        </Box>
    )
}

export default ItemPlataform;