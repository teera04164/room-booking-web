import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
// first we will make a new context
const GlobalContext = React.createContext();
const initialUser = { name: "John", image: 'images/person.jpg', role: '', isLogin: false, token: '' }
// Then create a provider Component
const GlobalProvider = (props) => {
    const history = useHistory()
    const [mode, setMode] = React.useState("");
    const [loading, setLoading] = React.useState(false);



    return (
        <GlobalContext.Provider value={{ loading, setLoading }} >
            {props.children}
        </GlobalContext.Provider>
    );

}

// export default GlobalProvider;
export { GlobalContext, GlobalProvider };