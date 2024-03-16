import { Table as TableUI, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Tooltip, TableFooter, Box } from '@mui/material';
import Button from './button';

const Table = props => {

    return(
        <Box
            sx={{
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                marginTop: '20px'
            }}
        >
            <TableContainer 
                component={Paper}
                sx={{
                    boxShadow: 'none',
                    // border: '1px solid #D1D5DB'
                }}
            >
                <TableUI 
                    aria-label="simple table"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#F9FAFB'
                        }}
                    >
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell sx={{color: '#6B7280'}}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.children}
                    </TableBody>
                </TableUI>
            </TableContainer>
            {!props.disabledFooter && (
                <Box
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #D1D5DB'
                    }}
                >
                    <Button
                        label="Anterior"
                        sx={{
                            backgroundColor: 'transparent',
                            border: '1px solid #D0D5DD'
                        }}
                    />
                    <Button
                        label="Próximo"
                        sx={{
                            backgroundColor: 'transparent',
                            border: '1px solid #D0D5DD'
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Table;