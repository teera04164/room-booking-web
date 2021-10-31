export const example_data = {
    date_booking: 'อาทิตย์ 31 ตุลาคม 2564',
    rooms: [
        {
            room_type_id: '001',
            room_type_name: 'ห้องค้นคว้าเดี่ยว (Individual study room)',
            all_room: [
                {
                    room_name: 'S01',
                    room_id: 'rm001',
                    booking: [
                        {
                            room_type_id: '001',
                            room_id: 'rm001',
                            user_id: 'b5816111',
                            time_booking_id: 1,
                            date_booking: '31/10/2564'
                        }
                    ]
                },
                {
                    room_name: 'S02',
                    room_id: 'rm002',
                    booking: [
                        {
                            room_type_id: '001',
                            room_id: 'rm002',
                            user_id: 'b5816222',
                            time_booking_id: 1,
                            date_booking: '31/10/2564'
                        },
                        {
                            room_type_id: '001',
                            room_id: 'rm002',
                            user_id: 'b5816222',
                            time_booking_id: 2,
                            date_booking: '31/10/2564'
                        }
                    ]
                },

            ]
        },
        {
            room_type_id: '002',
            room_type_name: 'ห้องค้นคว้ากลุ่ม (Group study room)',
            all_room: [
                {
                    room_name: 'S01',
                    room_id: 'rm001',
                    booking: [
                        {
                            room_type_id: '002',
                            room_id: 'rm001',
                            user_id: 'b5816111',
                            time_booking_id: 1,
                            date_booking: '31/10/2564'
                        }
                    ]
                }
            ]
        },
    ]
}

export const user_info = {
    user_id: 'B6133023',
    fullname: 'นางสาวซาบีรา ซามุดรา',
    remain_hourse: '6',
}

export const booking = {
    room_type_id: '001',
    room_id: 'rm001',
    user_id: 'b5816439',
    time_booking_id: 1,
    date_booking: '31/10/2564'
}

export const room = {
    room_id: 'S01',
    room_type_id: 'rt001',
    room_name: 'S01 ',
}

export const room_type = {
    building_id: '002',
    room_type_id: '001',
    room_type_name: 'ห้องค้นคว้าเดี่ยว (Individual study room)'
}

export const building = {
    building_id: '002',
    building_name: 'อาคาร A'
}

export const timeBookDefault = [
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