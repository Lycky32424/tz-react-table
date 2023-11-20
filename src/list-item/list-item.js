import React from 'react';
import styles from './list-item.module.css'

export default function ListItem ({data, descriptionFilter, selectedTag}) {
    const [dateTime, setDateTime] = React.useState('');
    const [descriptionMatches, setDescriptionMatch] = React.useState(true);
    const [tagMatches, setTagMatch] = React.useState(true);

    React.useEffect(() => {
        if (descriptionFilter === '') {
            setDescriptionMatch(true);
            return;
        }
        if(data.description === null) {
            setDescriptionMatch(false);
            return;
        }
        if (data.description.replace(/\s+/g,' ' ).trim().indexOf(descriptionFilter) === -1) {
            setDescriptionMatch(false);
            return;
        }
        setDescriptionMatch(true)
    }, [descriptionFilter]);

    React.useEffect(() => {
        console.log(selectedTag);
        if (selectedTag === 'empty') {
            setTagMatch(true);
            return;
        }
        setTagMatch(!!data.tags.includes(selectedTag));
    }, [selectedTag]);

    React.useEffect(() => {
        if (!data.dttmCreated) {
            return;
        }
        const [date, time] = data.dttmCreated.split('T');
        setDateTime(date.split('-').reverse().join('.') + ' ' + time.split(':', 2).join(':'));
    }, [data.dttmCreated]);

    return (
        <>{ descriptionMatches && tagMatches &&
            <li key={data.id} className={styles.no_li_style}>
                <div className={styles.listItem}>
                    <div className={styles.width_2}><p>{data.id ? data.id : ' '}</p></div>
                    <div className={styles.width_4}><p>{data.title ? data.title : ' '}</p></div>
                    <div className={styles.width_4}><p>{data.description ? data.description : ' '}</p></div>
                    <div className={styles.width_4}><p>{dateTime ? dateTime : ' '}</p></div>
                    <div className={styles.width_3}><p>{data.reactLevel ? data.reactLevel : ' '}</p></div>
                    <div className={styles.width_2}><p>{data.enabled === null? ' ' : (data.enabled ? 'Да' : 'Нет')}</p></div>
                    <div className={styles.width_2}>
                        { data.tags ? data.tags.map((tag) => {return (<p className={styles.no_margin} key={tag}>{tag} </p>)}) : ' ' }
                    </div>
                </div>    
            </li>
        }</>
        
    )
}