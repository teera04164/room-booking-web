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
    const { eventDialog = { open: false, data: { room_name: '', room_id: '', time_id: '', time_label: '' } }, onOk = () => { }, onClose = () => { }, content = '', } = props;
    const { open, data } = eventDialog
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'ยืนยันการจอง'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{  }}>
                        {content || (<>
                            <p>ห้อง <b>{data.room_name}</b> เวลา <b>{data.time_label}</b></p>


                        </>)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>ยกเลิก</Button>
                    <Button style={{ margin: 0 }} className="btn-login" variant="contained" onClick={() => onOk(data)}>ยืนยัน</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
