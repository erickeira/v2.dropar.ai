import { Typography } from '@mui/material';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const dropzoneStyles = {
    border: '2px dashed #9643FF',
    borderRadius: '12px',
    padding: '0px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA'
};

const inputStyles = {
    outline: 'none',
    padding: '10px', 
    fontSize: '14px',
    color: '#707A75'
};

const DropzoneComponent = props => {

    const handleChangeStatusImages = ({ meta, file, remove }, status) => {
        if (status === 'preparing') {}
        if (status === 'headers_received') {}
        if (status === 'done') {
            console.log("Avatar: ", file)
            props.handleFile(file)
        }
        if (status === 'removed') {
            props.handleFile('')
        }
    }

    return(
        <>
            <Dropzone
                maxFiles={1}
                onChangeStatus={handleChangeStatusImages}
                styles={{
                    dropzone: dropzoneStyles,
                    inputLabel: inputStyles,
                }}
                inputContent={props.inputContent ? props.inputContent :
                    <>
                        <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                            <span style={{ color: '#5C299C', fontWeight: 'bold' }}>Clique para carregar</span> ou arraste e solte o arquivo <br /> PNG, SVG ou JPG (max. 800x400px/400kb)
                        </Typography>
                    </>
                }
            />
        </>
    )
}

export default DropzoneComponent;