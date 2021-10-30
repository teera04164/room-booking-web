import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { makeStyles } from '@mui/styles';
import DialogConfirm from '../components/DialogConfirm';

const useStyles = makeStyles({
    root: {
        padding: '20px',
    },
    table: {
        minWidth: 650,
        '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
        },
    },
});

const timeBookDefault = [
    {
        id: 1,
        label: '08:30-09:30',
    },
    {
        id: 2,
        label: '09:30-10:30',
    },
    {
        id: 3,
        label: '10:30-11:30',
    },
    {
        id: 4,
        label: '11:30-12:30',
    },
    {
        id: 5,
        label: '12:30-13:30',
    },
    {
        id: 6,
        label: '13:30-14:30',
    },
    {
        id: 7,
        label: '14:30-15:30',
    },
    {
        id: 8,
        label: '15:30-16:30',
    },
    {
        id: 9,
        label: '16:30-17:30',
    },
    {
        id: 10,
        label: '17:30-18:30',
    },
];

const booking = [
    {
        roomName: 'S01',
        userId: '1',
        bookingId: '2',
        roomId: '3',
        timeBook: [],
        dateBook: '5',
    },
    {
        roomName: 'S02',
        userId: '11',
        bookingId: '22',
        roomId: '33',
        timeBook: [],
        dateBook: '55',
    },
    {
        roomName: 'S03',
        userId: '11',
        bookingId: '33',
        roomId: '33',
        timeBook: [1, 2, 3],
        dateBook: '55',
    },
    {
        roomName: 'S04',
        userId: '11',
        bookingId: '44',
        roomId: '33',
        timeBook: [],
        dateBook: '55',
    },
];

// https://zustand.surge.sh/

const Book = () => {
      const [dataBooking, setDataBooking] = React.useState(booking)
      const [openDialog, setOpenDialog] = React.useState({open: false, data: {}})

    const classes = useStyles();

    const bookClick = (roomName, time_id) => {
        setOpenDialog({open: true, data: {roomName, time_id}})

       
    };

    const handleOk = (data) => {
        const { roomName, time_id } = data
        console.log('roomName =>', roomName);
        console.log('time_id =>', time_id);
        let newBooking = []
        for(let ele of dataBooking){
            if(ele.roomName === roomName){
                const { timeBook } = ele
                const isBooked = timeBook.includes(time_id)
                if(isBooked){
                    let newTimeBook = timeBook.filter(ele => ele != time_id)
                    newBooking.push({...ele, timeBook: newTimeBook})
                }else{
                    newBooking.push({...ele, timeBook: [...timeBook, time_id]})
                }
            }else{
                newBooking.push(ele)
            }
        }
        setDataBooking(newBooking)
        setOpenDialog({open: false, data: {}})
    }

    return (
        <div className={classes.root} style={{padding: '20px'}}>
            <DialogConfirm
             open={openDialog}
             onClose={()=> setOpenDialog(false)}
             onOk={handleOk}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ห้อง/เวลา</TableCell>
                            {timeBookDefault.map((ele) => (
                                <TableCell
                                    key={`default-book-${ele.id}`}
                                    align="center"
                                >
                                    {ele.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataBooking.map((ele) => {
                            const { roomName, roomId, timeBook } = ele;
                            return (
                                <TableRow key={`xxx-${roomId}`}>
                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {roomName}
                                    </TableCell>
                                    {timeBookDefault.map((ele2) => {
                                        const { id: time_id, label } = ele2;
                                        const isBooked = timeBook.includes(time_id)
                                        return (
                                            <TableCell
                                                onClick={() => {
                                                    bookClick(
                                                        roomName,
                                                        time_id
                                                    );
                                                }}
                                                align="center"
                                                className={`${!isBooked && 'isNotBooked'}`}
                                            >
                                                {isBooked ? (
                                                    'ไม่ว่าง'
                                                ) : (
                                                    <span>
                                                        <p>ห้องว่าง</p>
                                                        <p>{roomName}</p>
                                                        <p>{label}</p>
                                                    </span>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default Book;
