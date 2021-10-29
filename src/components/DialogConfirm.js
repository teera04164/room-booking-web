import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogConfirm(props) {
    const {
        open = {open: false, data: {}},
        onOk = () => {},
        onClose = () => {},
        content = '',
    } = props;

    return (
        <div>
            <Dialog
                open={open.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Comfirm'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{padding: '0px 100px 0px 100px'}}>
                        {content || ' ยืนยันการจอง'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>ยกเลิก</Button>
                    <Button style={{ margin: 0}} className="btn-login" variant="contained" onClick={() => onOk(open.data)}>ยืนยัน</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
