import socketIOClient from 'socket.io-client';
import React, { useEffect, useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';

const GlobalContext = createContext();
const GlobalProvider = props => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [socket, setSocketIO] = useState(null);

    useEffect(() => {
        initial();
    }, []);

    const initial = () => {
        setLoading(true)
        const socket = socketIOClient('http://localhost:5002');
        socket.on('connect', () => {
            console.log('connect ', socket.id); // x8WIv7-mJelg7on_ALbx
            setSocketIO(socket);
            setLoading(false)
        });

        socket.on('hi', arg => {
            console.log(arg); // world
        });

        socket.on('disconnect', () => {
            console.log('disconnect ', socket.id); // undefined
        });

        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const obj = JSON.parse(userInfo);
            setUserInfo(obj);
        } else {
            history.push('/login');
        }
    };

    return (
        <GlobalContext.Provider value={{ loading, setLoading, userInfo, setUserInfo, socket, setSocketIO }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

// export default GlobalProvider;
export { GlobalContext, GlobalProvider };
