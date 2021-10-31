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
import { timeBookDefault, example_data } from '../mockdata'

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

const curren_user_id = 'B5816435'

const Book = () => {
    const [dataBooking, setDataBooking] = React.useState(example_data)
    const [eventDialog, setEventDialog] = React.useState({ open: false, data: {} })

    const classes = useStyles();

    const bookClick = ({ room_name, room_id, time_id, time_label, room_type_id }) => {
        setEventDialog({ open: true, data: { room_name, room_id, time_id, time_label, room_type_id } })


    };

    const handleOk = (data) => {
        console.log("🚀 ~ file: Book.js ~ line 41 ~ handleOk ~ data", data)
        const { room_name, room_id, time_id, time_label, room_type_id } = data
        let newDataBooking = { ...dataBooking }
        const { rooms } = newDataBooking
        let newRooms = []
        for (let index in rooms) {
            const ele = rooms[index]
            if (ele.room_type_id === room_type_id) {
                const { all_room } = ele
                let newAllRoom = []
                for (let eachRoom of all_room) {
                    if (eachRoom.room_id == room_id) {
                        console.log('in push');
                        newAllRoom.push({
                            ...eachRoom,
                            booking: [
                                ...eachRoom.booking,
                                {
                                    room_type_id,
                                    room_id,
                                    user_id: curren_user_id,
                                    time_booking_id: time_id,
                                    date_booking: '31/10/2564'
                                }
                            ]
                        })

                    } else {
                        newAllRoom.push(eachRoom)
                        console.log('in else push');

                    }
                }
                console.log("🚀 ~ file: Book.js ~ line 69 ~ handleOk ~ newAllRoom", newAllRoom)
                newRooms.push({ ...ele, all_room: newAllRoom })
            } else {
                newRooms.push(ele)
            }
        }
        console.log("🚀 ~ file: Book.js ~ line 71 ~ handleOk ~ newDataBooking", { ...newDataBooking, rooms: newRooms })
        setDataBooking({ ...newDataBooking, rooms: newRooms })
        setEventDialog({ open: false, data: {} })
    }

    return (
        <div className={classes.root} style={{ padding: '20px' }}>
            <DialogConfirm
                eventDialog={eventDialog}
                onClose={() => setEventDialog(false)}
                onOk={handleOk}
            />
            {
                dataBooking.rooms.map(room => {
                    const { all_room, room_type_name, room_type_id } = room
                    return (
                        <>
                            <HeaderRoomType room_type_name={room_type_name} />
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small">
                                    <HeaderTable
                                        timeBookDefault={timeBookDefault}
                                    />
                                    <BodyTable
                                        all_room={all_room}
                                        timeBookDefault={timeBookDefault}
                                        room_type_id={room_type_id}
                                        bookClick={bookClick}
                                    />

                                </Table>
                            </TableContainer>
                        </>
                    )
                })
            }

        </div>
    );
};


const HeaderRoomType = ({ room_type_name }) => <h5>{room_type_name} </h5>

const HeaderTable = ({ timeBookDefault }) => {
    return <TableHead>
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
}

const BodyTable = ({ all_room, bookClick, room_type_id }) => {
    return <TableBody>
        {all_room.map((ele) => {
            const { room_name, room_id, booking } = ele;
            return (
                <TableRow key={`xxx-${room_id}`}>
                    <TableCell
                        align="center"
                        component="th"
                        scope="row"
                    >
                        {room_name}
                    </TableCell>
                    {timeBookDefault.map((echTime) => {
                        const { id: time_id, label: time_label } = echTime;
                        const foundBooked = booking.find(eachBook => eachBook.time_booking_id == time_id)
                        let isBooked = false
                        let isOwnBook = false
                        if (foundBooked) {
                            isBooked = true
                            if (foundBooked.user_id === curren_user_id) {
                                isOwnBook = true
                            }
                        }

                        return (
                            <TableCell
                                onClick={() => {
                                    if (!foundBooked || isOwnBook) {
                                        bookClick({
                                            room_name,
                                            room_id,
                                            time_id,
                                            time_label,
                                            room_type_id
                                        });
                                    }
                                }}
                                align="center"
                                className={`${isBooked ?
                                    (isOwnBook ? 'status_hold_own' : 'status_hold_auther')
                                    : 'status_hold_free'}`}
                            >
                                {
                                    isBooked ? (
                                        isOwnBook ? <span>
                                            <p><b style={{color: '#5e1bff'}}>{foundBooked.user_id}</b></p>
                                            <p style={{color: '#5e1bff'}}>ยกเลิก</p>
                                            <p>{room_name}</p>
                                            <p>{time_label}</p>
                                        </span> : <span>
                                            <p>ห้องไม่ว่าง</p>
                                            <p>{room_name}</p>
                                            <p>{time_label}</p>
                                        </span>
                                    ) : (
                                        <span>
                                            <p>ห้องว่าง</p>
                                            <p>{room_name}</p>
                                            <p>{time_label}</p>
                                        </span>
                                    )
                                }
                                {/* {isBooked ? (
                                    
                                    <span>
                                        <p>ห้องไม่ว่าง</p>
                                        <p>{room_name}</p>
                                        <p>{time_label}</p>
                                    </span>
                                ) : (
                                    <span>
                                        <p>ห้องว่าง</p>
                                        <p>{room_name}</p>
                                        <p>{time_label}</p>
                                    </span>
                                )} */}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        })}
    </TableBody>
}
export default Book;
