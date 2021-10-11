import React from 'react'
import { Modal, Button, Box, Fade } from '@material-ui/core';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    borderRadius: "0.25em",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}
                className="add-btn"
                // onClick={this.onAddToy}
                variant="contained"
            >{props.titile}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open} timeout={500}  >
                    <Box sx={style} className="flex column align-center">
                        <h1 style={{ margin: 0 }}>{props.titile}</h1>
                        {React.cloneElement(props.children, { closeModal: handleClose })}
                    </Box>
                </Fade >
            </Modal>
        </div>
    );
}