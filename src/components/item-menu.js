import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const ItemMenu = props => {

    return(
        <>
            <Link to={props.data.path} style={{ textDecoration: 'none' }}>
                <Box
                    sx={{
                        backgroundColor: window.location.pathname == props.data.path ? '#9643FF' : 'transparent',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        color: window.location.pathname == props.data.path ? '#FFF' : '#FFF',
                        cursor: 'pointer',
                        justifyContent: !props.sidebarFull && 'center'
                    }}
                >
                    <img src={props.data.icon} />
                    {props.sidebarFull && (
                        <>
                            &nbsp;&nbsp;
                            <Typography>{props.data.label}</Typography>
                        </>
                    )}
                </Box>
            </Link>
        </>
    )
}

export default ItemMenu;