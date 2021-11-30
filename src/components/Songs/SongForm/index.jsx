import React, { useEffect, useContext } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {isAuthenticatedUser} from "../../../utils/auth";
import {AppContext} from "../../../Contexts/App";
import styles from './style.module.scss';
import {InputText} from "../../Form/InputText";
import {Button} from "../../Form/Button";

export const SongForm = props => {
    const {globalLoading, setGlobalLoading} = useContext(AppContext);
    const { record, refetch, setRefetch } = props.songState;
    const navigate = useNavigate();
    const { register, reset,  handleSubmit, formState: { errors }, setValue } = useForm();

    const handleOnSubmit = async formData => {

        try{
            setGlobalLoading(true);

            let data = null;
            if(record){
                data = await axios.put(`/songs/${record._id}`,formData);
                reset();
            }else{
                data = await axios.post('/songs',formData);
                reset();        
            }


            // if(data.token){
            //     setGlobalLoading(false);
            //     localStorage.setItem('token', data.token);
            //     navigate('/');
            // }
            setGlobalLoading(false);
            setRefetch(!refetch);
        }catch (e){
            setGlobalLoading(false);
        }
    }

    useEffect(() => {
        if(record){
            setValue('title',record.title)
            setValue('url',record.url)
            setValue('rating',record.rating)
        }
    }, [record]);



    return (
        <div className={styles.formContainer}>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(handleOnSubmit)}
                className={styles.form}
            >
                <InputText
                    name="title"
                    label="Title"
                    register={register}
                    validation={
                        {
                            required: {value: true, message: 'required'},
                        }
                    }
                    errors={errors}
                />
                <InputText
                    name="url"
                    label="URL"
                    register={register}
                    validation={
                        {
                            required: {value: true, message: 'required'},
                        }
                    }
                    errors={errors}
                />
                <InputText
                    name="rating"
                    label="Rating"
                    register={register}
                    validation={
                        {
                            required: {value: true, message: 'required'},
                        }
                    }
                    errors={errors}
                />
                <Button
                    id="button"
                    text={record ? 'update': 'save'}
                    htmlType="submit"
                    disabled={globalLoading}
                />
            </form>
        </div>
    );
};