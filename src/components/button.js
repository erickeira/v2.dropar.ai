import { Button as ButtonMui, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
;

const Button = props => {
    function getColors(color, variant){
        let backgroundColor = '#9643FF';
        let colorText = '#FFFFFF';
        let colorBorder = '#9643FF';
        if(color === 'gray'){
            backgroundColor = '#D0D5DD';
            colorText = '#344054';
            colorBorder = '#D0D5DD';
            if(variant === "contained"){
                backgroundColor = '#D0D5DD';
                colorBorder = '#D0D5DD';
                colorText = '#344054';
            }else if(variant === "outlined"){
                backgroundColor = '#FFF';
                colorText = '#344054';
                colorBorder = '#D0D5DD';
            }
        }
        if(color === 'red'){
            backgroundColor = '#991B1B';
            colorText = '#FFF';
            if(variant === "contained"){
                backgroundColor = '#991B1B';
                colorText = '#FFF';
            }else if(variant === "outlined"){
                backgroundColor = '#991B1B';
                colorText = '#FFF';
            }
        }
        if(color === 'light'){
            backgroundColor = '#F5ECFF';
            colorText = '#1F002E';
            if(variant === "contained"){
                backgroundColor = '#F5ECFF';
                colorText = '#1F002E';
            }else if(variant === "outlined"){
                backgroundColor = '#F5ECFF';
                colorText = '#1F002E';
            }
        }
        if(color === 'white'){
            backgroundColor = '#FFF';
            colorText = '#9643FF';
            colorBorder = '#FFF';
            if(variant === "contained"){
                backgroundColor = '#FFF';
                colorText = '#374151';
                colorBorder = '#D1D5DB';
            }else if(variant === "outlined"){
                backgroundColor = '#FFF';
                colorText = '#9643FF';
                colorBorder = '#9643FF';
            }
        }
        if(color === 'pink'){
            backgroundColor = '#FF599F';
            colorText = '#FFF';
            if(variant === "contained"){
                backgroundColor = '#FF599F';
                colorText = '#FFF';
            }else if(variant === "outlined"){
                backgroundColor = '#FF599F';
                colorText = '#FFF';
            }
        }
        return {
            'color': colorText,
            'backgroundColor': backgroundColor,
            'border': colorBorder
        }
    }

    return(
        <>
            <ButtonMui 
                fullWidth={props?.fullWidth && props?.fullWidth}
                sx={{
                    fontSize: '14px',
                    padding: '8px 16px 8px 16px',
                    backgroundColor: '#FFF',
                    textTransform: 'none',
                    borderRadius: '8px',
                    backgroundColor: getColors(props?.color, props?.variant).backgroundColor,
                    border: props?.variant && `1px solid ${getColors(props?.color, props?.variant).border}`,
                    color: getColors(props?.color, props?.variant).color,
                    '&:hover': {
                        backgroundColor: '#F6FAFD',
                        color: '#9643FF'
                    },
                    '&[disabled]': {
                        backgroundColor: '#9643FF',
                        color: '#FFF'
                    },
                    width: props?.width && props?.width,
                    ...props.sx
                }}
                className={props.className}
                size={props?.size && props?.size}
                onClick={(event) => {
                    if(props.onClick){
                        props.onClick(event)
                    }
                }}
                disabled={!!props?.disabled}
                type={props?.type}
            >
                {
                    props?.isLoading ? (
                        <CircularProgress
                            size={20} 
                            sx={{ p: '2.3px 0'}}
                        />
                    )
                 :
                    (
                        props.children ? props.children : props.label
                    ) 
                }
            </ButtonMui>
        </>
    )
}

export default Button;