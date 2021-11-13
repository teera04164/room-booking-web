import dayjs from 'dayjs'

export const dateToFomat = (day) => {
    return dayjs(day).format('DD-MM-YYYY')
}