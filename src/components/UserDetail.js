import React from 'react';
import { Grid } from '@mui/material';
import { GlobalContext } from '../contexts/globalContext';

function UserDetail() {
    const { userInfo } = React.useContext(GlobalContext);
    return (
        <div>
            <Grid container justifyContent='center' style={{ padding: '10px' }}>
                <Grid item>
                    <div
                        style={{
                            width: '400px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <span>ข้อมูลผู้ใช้</span>
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: '15px' }}>
                            <Grid item xs={4}>
                                <span> ผู้ใช้ :</span>
                            </Grid>
                            <Grid item>
                                <span>
                                    [ {userInfo.user_code} ] {userInfo.name}
                                </span>
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <Grid item xs={4}>
                                <span> ชั่วโมงคงเหลือ :</span>
                            </Grid>
                            <Grid item>
                                <span>6</span>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default UserDetail;
