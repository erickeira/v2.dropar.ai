import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";

const style = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '80vh',
    maxWidth: '512px',
    overflowY: 'auto',
    '@media (max-width: 600px)': { 
        width: '80vw' 
    }
};

const styleFilter = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '0px 0px 0px 32px',
    maxHeight: '80vh',
    overflowY: 'auto',
    outline: 'none'
}

const ModalComponent = props => {

    const [open, setOpen] = useState();

    useEffect(() => {
        if(props?.open){
            setOpen(true);
        }else{
            setOpen(false);
        }
    }, [props?.open])

    return(
        <>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    props.handleClose();
                }}
            >
                <Box sx={props.filter ? styleFilter : style} className="custom-scrollbar">
                    {props.children}
                </Box>
            </Modal>
        </>
    )
}

export default ModalComponent;
