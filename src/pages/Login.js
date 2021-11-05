import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../contexts/globalContext';
import api from '../API';
import { toast, ToastContainer } from 'react-toastify';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Fab from '@mui/material/Fab';

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const CssInput = styled(Input)({
    '& .MuiInputBase-input': {
        padding: '7px',
        fontSize: '.894rem',
        fontWeight: '400',
        lineHeight: '1.54',
        color: '#4E5155',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #181c211a',
        borderRadius: '0.25rem',
    },
});

function Login() {
    const [values, setValues] = React.useState({
        username: 'demo1',
        password: '123',
        showPassword: false,
    });

    const { setLoading, setUserInfo } = React.useContext(GlobalContext)

    let history = useHistory();

    async function onClickLogin() {
        try {
            setLoading(true)
            const { username, password } = values
            const result = await api.login({ username, password })
            console.log("🚀 ~ file: Login.js ~ line 60 ~ onClickLogin ~ result", result)
            localStorage.setItem('userInfo', JSON.stringify(result))
            setUserInfo(result)
            // toast.success(`เข้าสู่ระบบสำเร็จ`, {
            //     position: "top-center",
            //     autoClose: 1500,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
            history.push('/book')

        } catch (err) {
            setLoading(false)
        }

    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                style={{ height: '85vh' }}
            >
                <Grid
                    item
                    xs={10}
                    sm={8}
                    md={6}
                    lg={6}
                    textAlign="center"
                    className="login-card"
                >
                    <img src="lock.png" style={{ width: '100px' }} />
                    <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        style={{ marginBottom: '50px' }}
                    >
                        ระบบจองห้องสำนักงาน
                    </Typography>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '400px',
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                style={{
                                    fontSize: '1rem',
                                    color: '#5c5c5c',
                                    fontWeight: '500',
                                }}
                            >
                                บัญชีผู้ใช้เครือข่ายนนทรี
                            </Grid>
                            <Grid item xs={12}>
                                <CssInput
                                    value={values.username}
                                    onChange={handleChange('username')}
                                    style={{ width: '100%', marginTop: '5px' }}
                                    disableUnderline
                                    placeholder="เช่น b63xxxxxxxx หรือ regxxx"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    fontSize: '1rem',
                                    color: '#5c5c5c',
                                    fontWeight: '500',
                                    marginTop: '25px',
                                }}
                            >
                                รหัสผ่าน
                            </Grid>
                            <Grid item xs={12}>
                                <InputBase
                                    className="input-password"
                                    style={{ width: '100%', marginTop: '5px' }}
                                    disableUnderline
                                    placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                                    type={
                                        values.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {values.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </Grid>

                            <Stack direction="row" spacing={1} style={{ marginTop: '10px' }}>
                                <Chip label="demo1" variant="outlined" onClick={() => { setValues(prev => ({ ...prev, username: 'demo1' })) }} />
                                <Chip label="demo2" variant="outlined" onClick={() => { setValues(prev => ({ ...prev, username: 'demo2' })) }} />
                                <Chip label="admin" variant="outlined" onClick={() => { setValues(prev => ({ ...prev, username: 'admin' })) }} />
                            </Stack>

                            <Button className="btn-login" variant="contained" onClick={onClickLogin}>
                                เข้าสู่ระบบ
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
