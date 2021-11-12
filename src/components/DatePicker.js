import React from 'react';
import DatePick from 'react-datepicker';
import { Grid } from '@mui/material';

function DatePicker(props) {
    const { onChange = () => {} } = props;
    const [startDate, setStartDate] = React.useState(new Date());

    const hadleChangeDate = date => {
        setStartDate(date);
        onChange(date);
    };
    return (
        <Grid container justifyContent='center' style={{ padding: '3px' }}>
            <Grid item>
                <div
                    style={{
                        width: '354px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={3}>
                            <span>วันที่จอง </span>
                        </Grid>
                        <Grid item>
                            <DatePick
                                selected={startDate}
                                onChange={date => hadleChangeDate(date)}
                                minDate={new Date()}
                                maxDate={new Date().setDate(new Date().getDate() + 7)}
                                showDisabledMonthNavigation
                            />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

export default DatePicker;
