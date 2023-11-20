import React from 'react';
import styles from './list-item.module.css'

export default function ListHeader () {
    return (
        <div className={styles.listItem}>
            <div className={styles.width_2}>ID</div>
            <div className={styles.width_4}>Фильтр</div>
            <div className={styles.width_4}>Описание</div>
            <div className={styles.width_4}>Создан</div>
            <div className={styles.width_3}>Уровень</div>
            <div className={styles.width_2}>Действует</div>
            <div className={styles.width_2}>Флаги</div>
        </div>
    )
}