import React, { useEffect, useState, createContext } from 'react';
import { useHistory } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = (props) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        initial()
    }, [])

    const initial = () => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const obj = JSON.parse(userInfo)
            setUserInfo(obj)
        } else {
            history.push('/login')
        }
    }


    return (
        <GlobalContext.Provider value={{ loading, setLoading, userInfo, setUserInfo }} >
            {props.children}
        </GlobalContext.Provider>
    );

}

// export default GlobalProvider;
export { GlobalContext, GlobalProvider };