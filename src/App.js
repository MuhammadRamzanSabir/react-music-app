import React, {useEffect, useState} from "react";
import './App.css';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {isAuthenticatedUser} from "./utils/auth";
import {Header} from "./components/Header";
import {AppContext} from "./Contexts/App";
import {Loader} from "./components/Loader";
import {Login} from "./components/Login";
import {Home} from "./components/Home";
import {Songs} from "./components/Songs";

const  App = () => {
    const [globalLoading, setGlobalLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        token: '',
        username: '',
        userRole: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(isAuthenticatedUser()){
            setUserInfo({
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username'),
                userRole: localStorage.getItem('userRole'),
            });
        }
        if(location.pathname !== '/' && !isAuthenticatedUser()){
            navigate('/auth/login');
        }
    }, [location.pathname]);
    return (
        <div className="App">
                <AppContext.Provider value={{ globalLoading, setGlobalLoading, userInfo, setUserInfo }}>
                    {globalLoading && <Loader />}
                    <Header />
                    <div className="content-wrapper">
                    <Routes>
                        <Route exact path="/auth/login" element={<Login />} />
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/songs" element={<Songs />} />
                    </Routes>
                    </div>
                </AppContext.Provider>
        </div>
    );
}

export default App;
