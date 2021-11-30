import React from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import styles from './style.module.scss';
import logoImage from '../../static/images/logo.png';
import {isAuthenticatedUser} from "../../utils/auth";

export const Header = () => {
    const navigate = useNavigate();
    return (
        <nav className={styles.mainNav}>
            <div className={styles.menu}>
                <ul>
                    <li>
                        <img src={logoImage} className={styles.logo}/>
                    </li>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/songs">
                            Songs
                        </Link>
                    </li>
                    <li>
                        <Link to="/artists">
                            Artists
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.search}>
                <form>
                    <input type="search" placeholder="Search" />
                        <button type="button" className={styles.searchBtn}>Go</button>
                </form>
                {isAuthenticatedUser() ? (
                    <div className={styles.logout} onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/auth/login');
                    }}>
                            Logout
                    </div>
                ) : (
                    <div className={styles.login}>
                        <Link to="/auth/login">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};