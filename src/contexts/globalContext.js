import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
// first we will make a new context
const GlobalContext = React.createContext();
const initialUser = { name: "John", image: 'images/person.jpg', role: '', isLogin: false, token: '' }
// Then create a provider Component
const GlobalProvider = (props) => {
    const history = useHistory()
    const [loading, setLoading] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
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