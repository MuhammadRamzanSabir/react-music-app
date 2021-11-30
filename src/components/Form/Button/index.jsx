import React from 'react';
import styles from './style.module.scss';

export const Button = props => {
    const { htmlType, disabled, text } = props;
    return (
        <>
            <button
                className={styles.btn}
                type={htmlType ? htmlType : 'button'}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};