import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { GlobalContext } from '../contexts/globalContext';
import { makeStyles } from '@mui/styles';
import DialogConfirm from '../components/DialogConfirm';
import { example_data } from '../mockdata'
import api from '../API';
import { toast, ToastContainer } from 'react-toastify';

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
    const { setLoading } = React.useContext(GlobalContext)
    const [dataBooking, setDataBooking] = React.useState([])
    const [eventDialog, setEventDialog] = React.useState({ open: false, data: {} })
    const [timeBookDefault, setTimeBookDefault] = React.useState([])

    const classes = useStyles();


    React.useEffect(() => {
        initial()

    }, [])

    const initial = async () => {
        const result = await api.getListTimeBooking()
        const booking = await api.getBooking({ building_id: '6183fc7d7e115ccbf5f09328' })
        console.log("🚀 ~ file: Book.js ~ line 45 ~ initial ~ booking", booking.data)
        setTimeBookDefault(result.data)
        setDataBooking(booking.data)
        console.log("🚀 ~ file: Book.js ~ line 43 ~ initial ~ result", result)
        setLoading(false)

    }



    const bookClick = (obj) => {
        const { room_name, room_id, time_booking_id, time_label, room_type_id, building_id } = obj
        console.log(obj)
        setEventDialog({ open: true, data: { room_name, room_id, time_booking_id, time_label, room_type_id, building_id } })


    };

    const handleOk = async (data) => {
        setLoading(true)
        const { room_name, room_id, time_booking_id, time_label, room_type_id, building_id } = data
        await api.saveBooking({
            building_id,
            room_type_id,
            room_id,
            time_booking_id
        })
        initial()
        setEventDialog(false)
        toast.success(`บันทึกสำเร็จ`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    return (
        <div className={classes.root} style={{ padding: '20px' }}>
            <ToastContainer />
            <DialogConfirm
                eventDialog={eventDialog}
                onClose={() => setEventDialog(false)}
                onOk={handleOk}
            />
            {
                dataBooking.map(room => {
                    const { rooms, room_type_name, _id: building_id } = room
                    console.log("🚀 ~ file: Book.js ~ line 116 ~ Book ~ room", room)
                    return (
                        <>
                            <HeaderRoomType room_type_name={room_type_name} />
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small">
                                    <HeaderTable
                                        timeBookDefault={timeBookDefault}
                                    />
                                    <BodyTable
                                        all_room={rooms}
                                        timeBookDefault={timeBookDefault}
                                        building_id={building_id}
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
                    key={`default-book-${ele._id}`}
                    align="center"
                >
                    {ele.time_booking_name}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
}

const BodyTable = ({ timeBookDefault, all_room, bookClick, building_id }) => {
    return <TableBody>
        {all_room.map((ele) => {
            const { room_name, _id: room_id, booking, room_type_id } = ele;
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
                        const { _id: time_booking_id, time_booking_name: time_label } = echTime;
                        const foundBooked = booking.find(eachBook => eachBook.time_booking_id == time_booking_id)
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
                                            time_booking_id,
                                            time_label,
                                            room_type_id,
                                            building_id
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
                                            <p><b style={{ color: '#5e1bff' }}>{foundBooked.user_id}</b></p>
                                            <p style={{ color: '#5e1bff' }}>ยกเลิก</p>
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
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        })}
    </TableBody>
}
export default Book;
