import React, { useContext, useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'

import api from '../API'
import { GlobalContext } from '../contexts/globalContext'
import DialogConfirm from '../components/DialogConfirm'
import SelectOption from '../components/SelectOption'
import DatePicker from '../components/DatePicker'
import UserDetail from '../components/UserDetail'
import dayjs from 'dayjs'

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
})

const Book = () => {
    const classes = useStyles()
    const { setLoading, userInfo, socket } = useContext(GlobalContext)
    const [dataBooking, setDataBooking] = useState([])
    const [eventDialog, setEventDialog] = useState({ open: false, data: {} })
    const [timeBookDefault, setTimeBookDefault] = useState([])
    const [buildingList, setBuildingList] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedBuilding, setSelectBuilding] = useState('')
    const [eventSocket, setEventSocket] = useState('')

    useEffect(() => {
        initial()
    }, [])

    useEffect(() => {
        socket &&
            socket.on(eventSocket, data => {
                console.log('event ', eventSocket, data)
                setDataBooking(data)
                setLoading(false)
            })
    }, [eventSocket])

    const initial = async () => {
        try {
            setLoading(true)
            const [building, timeBooking] = await Promise.all([api.getListTBuilding(), api.getListTimeBooking()])
            const selected_date = dayjs(new Date()).format('DD-MM-YYYY')
            const { building_id } = building[0]
            const booking = await api.getBooking({ building_id, selected_date: new Date() })
            const optionBuilding = building.map(ele => ({
                value: ele.building_id,
                label: ele.building_name,
            }))
            const event = `${building_id}-${selected_date}`
            setEventSocket(event)
            setSelectBuilding(building[0].building_id)
            setTimeBookDefault(timeBooking)
            setDataBooking(booking)
            setBuildingList(optionBuilding)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    const handleChangeBuilding = async ({ value: buildId }) => {
        setSelectBuilding(buildId)
        await getBooking(buildId, selectedDate)
    }

    const handleChangDate = async date => {
        setSelectedDate(date)
        await getBooking(selectedBuilding, date)
    }

    const getBooking = async (building_id, selected_date) => {
        setLoading(true)
        const booking = await api.getBooking({ building_id, selected_date })
        setDataBooking(booking)
        setLoading(false)
    }

    const bookClick = data => {
        const { isOwnBook } = data
        let label = 'ยืนยันการจอง'
        if (isOwnBook) {
            label = 'ยืนยันการยกเลิก'
        }
        setEventDialog({ open: true, label, data })
    }

    const handleOk = async data => {
        setEventDialog(false)
        setLoading(true)
        const { room_id, time_booking_id, room_type_id, building_id, isOwnBook, booking_id } = data
        if (isOwnBook) {
            await api.deleteBooking({ booking_id })
        } else {
            await api.saveBooking({
                building_id: selectedBuilding,
                room_type_id,
                room_id,
                time_booking_id,
                user_id: userInfo._id,
                selected_date: selectedDate,
            })
        }
        // await getBooking(selectedBuilding, selectedDate)
    }

    return (
        <div className={classes.root} style={{ padding: '20px' }}>
            <DialogConfirm eventDialog={eventDialog} onClose={() => setEventDialog(false)} onOk={handleOk} />
            <DatePicker onChange={handleChangDate} />
            <SelectOption onChange={handleChangeBuilding} options={buildingList} />
            <UserDetail />

            {dataBooking.map(room => {
                const { rooms, room_type_name, _id: building_id } = room
                return (
                    <div key={building_id}>
                        <HeaderRoomType room_type_name={room_type_name} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size='small'>
                                <HeaderTable timeBookDefault={timeBookDefault} />
                                <BodyTable
                                    userInfo={userInfo}
                                    all_room={rooms}
                                    timeBookDefault={timeBookDefault}
                                    building_id={building_id}
                                    bookClick={bookClick}
                                />
                            </Table>
                        </TableContainer>
                    </div>
                )
            })}
        </div>
    )
}

const HeaderRoomType = ({ room_type_name }) => <h3>{room_type_name} </h3>

const HeaderTable = ({ timeBookDefault }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>ห้อง/เวลา</TableCell>
                {timeBookDefault.map(ele => (
                    <TableCell key={`default-book-${ele._id}`} align='center'>
                        {ele.time_booking_name}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const BodyTable = ({ timeBookDefault, all_room, bookClick, building_id, userInfo }) => {
    return (
        <TableBody>
            {all_room.map(ele => {
                const { room_name, _id: room_id, booking, room_type_id } = ele
                return (
                    <TableRow key={`body-table-${room_id}`}>
                        <TableCell align='center' component='th' scope='row'>
                            {room_name}
                        </TableCell>
                        {timeBookDefault.map(echTime => {
                            const { _id: time_booking_id, time_booking_name: time_label } = echTime
                            const foundBooked = booking.find(eachBook => eachBook.time_booking_id == time_booking_id)
                            let isBooked = false
                            let isOwnBook = false
                            if (foundBooked) {
                                isBooked = true
                                if (foundBooked.user_id === userInfo._id) {
                                    isOwnBook = true
                                }
                            }

                            return (
                                <TableCell
                                    key={`booking-${room_id}-${time_booking_id}`}
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
                                            })
                                        }
                                    }}
                                    align='center'
                                    className={`${
                                        isBooked
                                            ? isOwnBook
                                                ? 'status_hold_own'
                                                : 'status_hold_auther'
                                            : 'status_hold_free'
                                    }`}
                                >
                                    {isBooked ? (
                                        isOwnBook ? (
                                            <>
                                                <b style={{ color: '#5e1bff' }}>
                                                    <p>{userInfo.user_code}</p>
                                                </b>
                                                <p style={{ color: '#5e1bff' }}>ยกเลิก</p>
                                                <p>{room_name}</p>
                                                <p>{time_label}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>ห้องไม่ว่าง</p>
                                                <p>{room_name}</p>
                                                <p>{time_label}</p>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <p>ห้องว่าง</p>
                                            <p>{room_name}</p>
                                            <p>{time_label}</p>
                                        </>
                                    )}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )
            })}
        </TableBody>
    )
}
export default Book
