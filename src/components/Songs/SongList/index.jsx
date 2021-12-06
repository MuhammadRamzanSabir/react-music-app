import React, {useEffect, useContext, useState} from 'react';
import styles from './style.module.scss';
import axios from "axios";
import {AppContext} from "../../../Contexts/App";

export const SongList = props => {
    const [list, setList] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('all');
    const {setGlobalLoading} = useContext(AppContext);
    const { refetch, setRecord, setRefetch } = props.songState;

    useEffect(() => {
        fetchAllSongs();
    }, [refetch, selectedArtist]);

    const fetchAllSongs = async () => {
        try{
            setGlobalLoading(true);
            const { data } = await axios.get('/songs');
            console.log('data', data);
            if(selectedArtist === 'all'){
                setList(data);
            }else{
                setList(data.filter(item => item.artist === selectedArtist));
            }
            setGlobalLoading(false);
        }catch (e){
            setGlobalLoading(false);
        }
    }

    const handleDelete = async id => {
        try{
            setGlobalLoading(true);
            console.log('id', id);
            await axios.delete(`/songs/${id}`);
            setRefetch(!refetch);
        }catch (e){
            setGlobalLoading(false);
        }
    }

    const handleEdit = async id => {
        try{
            setGlobalLoading(true);
            const { data } = await axios.get(`/songs/${id}`);
            setRecord(data);
            setGlobalLoading(false);
        }catch (e){
            setRecord(null);
            setGlobalLoading(false);
        }

    }

    const [artists, setArtists] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/users/all-artists');
            setArtists(data);
        })();
    }, []);

    return (
        <div className={styles.formContainer}>
            <div className={styles.form}>
            <div className={styles.title}>
                    <select
                        onChange={e => {
                            setSelectedArtist(e.target.value);
                        }}
                    >
                        <option key="all" value="all">All Artists</option>
                        {artists.map(item => <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>)}
                    </select>
            </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list.map(song => {
                        return (
                            <tr key={song.url}>
                                <td>
                                    <a href={song.url} target="_blank">
                                        {song.title}
                                    </a>
                                </td>
                                <td>{song.rating}</td>
                                <td>
                                    <button onClick={() => handleDelete(song._id)}>del</button>
                                    <button onClick={() => handleEdit(song._id)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};