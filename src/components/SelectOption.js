import React, { Component } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../contexts/globalContext';
import { Grid } from '@mui/material';
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

export default function SelectOption(props) {
    const { options, onChange } = props;

    const { loading } = React.useContext(GlobalContext);

    return (
        <Grid container justifyContent="center" style={{ padding: '10px' }}>
            <Grid item>
                <div
                    style={{
                        width: '354px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <span>อาคาร </span>
                        </Grid>
                        <Grid item>
                            {options.length && (
                                <Select
                                    defaultValue={options[0]}
                                    options={options}
                                    styles={{ width: '100px' }}
                                    onChange={onChange}
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <hr />
            </Grid>
        </Grid>
    );
}
