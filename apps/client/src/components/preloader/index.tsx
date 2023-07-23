import React from 'react';

import styles from '@/components/preloader/preloader.module.scss';

const Preloader = () =>
{
    return (
        <p className={styles.preloaderText}>
            Preloader
            <span className={styles.preloader}></span>
        </p>
    );
};

export default Preloader;
