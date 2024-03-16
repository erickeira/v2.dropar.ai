import { TextField, InputAdornment, IconButton, Typography, Box } from "@mui/material";

const Input = props => {

    function handleChange(event, v) {
        if(props.onChange){
            props.onChange(event, v);
        }
    }

    function handleBlur(event) {
        if(props.onBlur){
            props.onBlur(event);
        }
    }

    function handleKeyUp(event) {
        if(props.onKeyUp){
            props.onKeyUp(event);
        }
    }

    function handleKeyPress(event) {
        if(props.onKeyPress){
            props.onKeyPress(event);
        }
    }
    
    return(
        <Box sx={{width: props?.fullWidth ? '100%' : (props?.width && props?.width)}}>
            {(props?.type && props?.type === 'select') && (
                <TextField
                    fullWidth={props?.fullWidth}
                    select
                    label={props?.label}
                    value={props?.value} 
                    placeholder={props?.placeholder}
                    SelectProps={{
                        native: true,
                    }}
                    sx={{
                        select: { 
                            backgroundColor: '#FFF',
                            borderRadius: '8px',
                        },
                        width: props?.width && props?.width
                    }}
                    InputProps={{
                        sx: { borderRadius: '8px' }
                    }}
                    size={props?.size && props?.size}
                    onChange={handleChange}
                    disabled={props.disabled && props.disabled}
                >
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            )}
            {(!props?.type || props?.type === 'input' || props?.type === 'password' || props?.type === 'text') && (
                <>
                    <TextField 
                        fullWidth={props?.fullWidth}
                        value={props?.value} 
                        placeholder={props?.placeholder}
                        type={props?.type && props?.type}
                        label={props?.label}
                        sx={{
                            boxShadow: '0px 1px 2px 0px #0000000D',
                            input: { 
                                backgroundColor: '#FFF',
                                borderRadius: '8px'
                            },
                            width: props?.width && props?.width,
                            ...props.sx
                        }}
                        inputProps={{
                            maxLength: props?.maxLength && props?.maxLength
                        }}
                        size={props?.size && props?.size}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyUp={handleKeyUp}
                        onKeyPress={handleKeyPress}
                        disabled={props.disabled && props.disabled}
                        InputProps={{
                            sx: { borderRadius: '8px', backgroundColor: '#FFF' },
                            endAdornment: (
                                props?.endAdornment && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                props?.handleClickEndAdornment();
                                            }}
                                            sx={{ color: '#667085' }}
                                        >
                                            {props?.endAdornmentIcon}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            ),
                            startAdornment: (
                                props?.startAdornment && (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => {
                                                props?.handleClickStartAdornment();
                                            }}
                                            sx={{ color: '#667085' }}
                                        >
                                            {props?.startAdornmentIcon}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            )
                        }}
                        error={!!props?.error}
                    />
                </>
            )}
            {
                props?.error && !!props?.errorText && (
                    <Box sx={{ width : '100%', position: 'relative'}}>
                        <Typography
                            sx={{
                                fontSize: 11,
                                mt: 0.5,
                                color: '#cf5e5e',
                                position: 'absolute',
                                flexWrap: 'wrap'
                            }}
                        >
                            {props?.errorText}
                        </Typography>
                    </Box>
                )
            }
            
        </Box>
    )
}

export default Input;