import React from "react";
import styles from './style.module.scss';

export const InputText = ({ label, register, validation, type, name, errors }) => {
    const inputType = type ? type : 'text';
    const errorMessage = errors[name] && errors[name].message;
    return (
        <>
            <label>{label}</label>
            <input {...register(name, { ...validation })} className={styles.input} type={inputType}/>
            {errorMessage && <span className={styles.error}>{errorMessage}</span>}
            <span className={styles.bottom}/>
        </>
    );
}

