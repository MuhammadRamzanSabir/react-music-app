import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import {SongForm} from "./SongForm";
import {SongList} from "./SongList";
import axios from "axios";

export const Songs = () => {
    const [record, setRecord] = useState(null);
    const [refetch, setRefetch] = useState(false);
    
    const [artists, setArtists] = useState([]);


    return (
        <div className={styles.container}>
            <div className={styles.songsList}>
                <div className={styles.title}>
                    Song List
                </div>
                <SongList songState={{ record, refetch, setRecord, setRefetch }}/>
            </div>
            <div className={styles.songForm}>
                <div className={styles.title}>{record ? 'Edit Song': 'New Song'}</div>
                <SongForm songState={{ record, refetch, setRecord, setRefetch }}/>
            </div>
        </div>
    );
};