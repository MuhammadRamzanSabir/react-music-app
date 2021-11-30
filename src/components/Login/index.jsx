import React, { useEffect, useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAuthenticatedUser } from "../../utils/auth";
import { AppContext } from "../../Contexts/App";
import styles from './style.module.scss';
import { InputText } from "../Form/InputText";
import { Button } from "../Form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;

export const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { globalLoading, setGlobalLoading } = useContext(AppContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (isAuthenticatedUser()) {
            navigate('/');
        }
    }, []);

    const handleOnSubmit = async formData => {
        try {
            setGlobalLoading(true);
            const { data } = await axios.post('/users/login', formData);
            if (data.token) {
                setGlobalLoading(false);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common = { 'Authorization': `bearer ${data.token}` }
                navigate('/');
            }
        } catch (e) {
            setGlobalLoading(false);
        }
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };



    return (
        <div className={styles.formContainer}>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(handleOnSubmit)}
                className={styles.form}
            >
                <InputText
                    name="email"
                    label="Email"
                    register={register}
                    validation={
                        {
                            required: { value: true, message: 'required' },
                            pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i, message: 'invalid email' }
                        }
                    }
                    errors={errors}
                />
                <InputText
                    name="password"
                    label="Password"
                    register={register}
                    type={passwordShown ? "text" : "password"}
                    validation={
                        {
                            required: { value: true, message: 'required' },
                        }
                    }
                    errors={errors}

                />
                <i onClick={togglePasswordVisiblity}>{eye}</i>

                <Button
                    text="Login"
                    htmlType="submit"
                    disabled={globalLoading}
                />
            </form>
        </div>
    );
};