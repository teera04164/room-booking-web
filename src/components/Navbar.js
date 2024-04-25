import React from 'react';
import Grid from '@mui/material/Grid';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useHistory, useRouteMatch } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { GlobalContext } from '../contexts/globalContext';
import api from '../API';

const menus = [
    {
        label: 'จองห้อง',
        icon: AssignmentOutlinedIcon,
        path: '/book',
    },
    // {
    //     label: 'รายการจอง',
    //     icon: BeenhereOutlinedIcon,
    //     path: '/user',
    // },
    // {
    //     label: 'วิธีการใช้งาน',
    //     icon: BookOutlinedIcon,
    //     path: '/about',
    // },
    // {
    //     label: 'ออกจากระบบ',
    //     icon: LogoutOutlinedIcon,
    //     path: '/login',
    // },
];
function Navbar() {
    const [activeMenu, setActiveMenu] = React.useState(window.location.pathname);
    const history = useHistory();
    const { userInfo } = React.useContext(GlobalContext);

    const onClickMenu = async path => {
        if (path === '/login') {
            const {
                token: { refreshToken },
            } = userInfo;
            await api.logOut({ refreshToken });
            localStorage.clear();
        }
        history.push(path);
        setActiveMenu(path);
    };
    return (
        <div>
            <Grid
                container
                justifyContent='space-between'
                style={{
                    height: '70px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .05)',
                }}
            >
                <ul className='menu'>
                    {menus.map(ele => {
                        const { label, icon: Icon, path } = ele;
                        return (
                            <li
                                key={`navbar-${path}`}
                                className={`${activeMenu === path && 'active'} `}
                                onClick={() => onClickMenu(path)}
                            >
                                <Icon />
                                {label}
                            </li>
                        );
                    })}
                </ul>
                <ul className='menu'>
                    <li>
                        <span style={{ marginRight: '5px', cursor: 'default' }}>
                            <span style={{ fontSize: 'small' }}>ยินดีต้องรับ..</span>
                            <span style={{ fontWeight: 'bold', color: '#001685' }}>{' ' + userInfo.username}</span>
                        </span>
                        <LogoutOutlinedIcon onClick={() => onClickMenu('/login')} />
                    </li>
                </ul>
            </Grid>
        </div>
    );
}

export default Navbar;
