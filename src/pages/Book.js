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
import api from '../API';
import SelectOption from '../components/SelectOption';
import { Grid } from '@mui/material';
import DatePicker from '../components/DatePicker';
import UserDetail from '../components/UserDetail';

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

const userInfo = {
    _id: '6183fc7d7e115ccbf5f02556',
    user_code: 'B587777',
    name: 'สุชาติ ชมกลิ่น',
    createdAt: '2021-11-05T02:36:55.214Z',
    updatedAt: '2021-11-05T02:36:55.214Z',
};

const Book = () => {
    const classes = useStyles();
    const { setLoading, userInfo } = React.useContext(GlobalContext);
    const [dataBooking, setDataBooking] = React.useState([]);
    const [eventDialog, setEventDialog] = React.useState({
        open: false,
        data: {},
    });
    const [timeBookDefault, setTimeBookDefault] = React.useState([]);
    const [buildingList, setBuildingList] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date);
    const [selectedBuilding, setSelectBuilding] = React.useState('');


    React.useEffect(() => {
        initial();
    }, []);

    const handleChangeBuilding = async ({ value: buildId }) => {
        setSelectBuilding(buildId)
        await getBooking(buildId, selectedDate)
    }

    const handleChangDate = async (date) => {
        setSelectedDate(date)
        await getBooking(selectedBuilding, date)
    }

    const getBooking = async (building_id, selected_date) => {
        setLoading(true)
        const booking = await api.getBooking({ building_id, selected_date });
        setDataBooking(booking);
        setLoading(false)
    }

    const initial = async () => {
        setLoading(true);
        const building = await api.getListTBuilding();
        const result = await api.getListTimeBooking();
        const booking = await api.getBooking({ ...building[0] });
        const optionBuilding = building.map((ele) => ({
            value: ele.building_id,
            label: ele.building_name,
        }));
        setSelectBuilding(building[0].building_id)
        setTimeBookDefault(result);
        setDataBooking(booking);
        setBuildingList(optionBuilding);
        setLoading(false);
    };

    const bookClick = (data) => {
        const { isOwnBook } = data;
        let label = 'ยืนยันการจอง';
        if (isOwnBook) {
            label = 'ยืนยันการยกเลิก';
        }
        setEventDialog({ open: true, label, data });
    };

    const handleOk = async (data) => {
        setEventDialog(false);
        setLoading(true);
        const { room_id, time_booking_id, room_type_id, building_id, isOwnBook, booking_id, } = data;
        if (isOwnBook) {
            await api.deleteBooking({ booking_id });
        } else {
            await api.saveBooking({
                building_id,
                room_type_id,
                room_id,
                time_booking_id,
                user_id: userInfo._id,
                selected_date: selectedDate
            });
        }
        await getBooking(selectedBuilding, selectedDate);
    };

    return (
        <div className={classes.root} style={{ padding: '20px' }}>
            <DialogConfirm
                eventDialog={eventDialog}
                onClose={() => setEventDialog(false)}
                onOk={handleOk}
            />
            <DatePicker onChange={handleChangDate} />
            <SelectOption onChange={handleChangeBuilding} options={buildingList} />
            <UserDetail />

            {dataBooking.map((room) => {
                const { rooms, room_type_name, _id: building_id } = room;
                return (
                    <>
                        <HeaderRoomType room_type_name={room_type_name} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <HeaderTable
                                    timeBookDefault={timeBookDefault}
                                />
                                <BodyTable
                                    userInfo={userInfo}
                                    all_room={rooms}
                                    timeBookDefault={timeBookDefault}
                                    building_id={building_id}
                                    bookClick={bookClick}
                                />
                            </Table>
                        </TableContainer>
                    </>
                );
            })}
        </div>
    );
};

const HeaderRoomType = ({ room_type_name }) => <h3>{room_type_name} </h3>;

const HeaderTable = ({ timeBookDefault }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>ห้อง/เวลา</TableCell>
                {timeBookDefault.map((ele) => (
                    <TableCell key={`default-book-${ele._id}`} align="center">
                        {ele.time_booking_name}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const BodyTable = ({
    timeBookDefault,
    all_room,
    bookClick,
    building_id,
    userInfo,
}) => {
    return (
        <TableBody>
            {all_room.map((ele) => {
                const { room_name, _id: room_id, booking, room_type_id } = ele;
                return (
                    <TableRow key={`xxx-${room_id}`}>
                        <TableCell align="center" component="th" scope="row">
                            {room_name}
                        </TableCell>
                        {timeBookDefault.map((echTime) => {
                            const {
                                _id: time_booking_id,
                                time_booking_name: time_label,
                            } = echTime;
                            const foundBooked = booking.find(
                                (eachBook) =>
                                    eachBook.time_booking_id == time_booking_id
                            );
                            let isBooked = false;
                            let isOwnBook = false;
                            if (foundBooked) {
                                isBooked = true;
                                if (foundBooked.user_id === userInfo._id) {
                                    isOwnBook = true;
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
                                                building_id,
                                                isOwnBook,
                                                booking_id: foundBooked?._id,
                                            });
                                        }
                                    }}
                                    align="center"
                                    className={`${isBooked
                                        ? isOwnBook
                                            ? 'status_hold_own'
                                            : 'status_hold_auther'
                                        : 'status_hold_free'
                                        }`}
                                >
                                    {isBooked ? (
                                        isOwnBook ? (
                                            <span>
                                                <p>
                                                    <b
                                                        style={{
                                                            color: '#5e1bff',
                                                        }}
                                                    >
                                                        {userInfo.user_code}
                                                    </b>
                                                </p>
                                                <p style={{ color: '#5e1bff' }}>
                                                    ยกเลิก
                                                </p>
                                                <p>{room_name}</p>
                                                <p>{time_label}</p>
                                            </span>
                                        ) : (
                                            <span>
                                                <p>ห้องไม่ว่าง</p>
                                                <p>{room_name}</p>
                                                <p>{time_label}</p>
                                            </span>
                                        )
                                    ) : (
                                        <span>
                                            <p>ห้องว่าง</p>
                                            <p>{room_name}</p>
                                            <p>{time_label}</p>
                                        </span>
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};
export default Book;
