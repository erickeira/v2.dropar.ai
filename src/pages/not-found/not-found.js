import { Box, Typography } from "@mui/material";

const NotFound = () => {

    return(
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Typography>404 | Página não encontrada</Typography>
        </Box>
    )
}

export default NotFound;