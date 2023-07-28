import React from 'react';

import styles from '@/components/preloader/preloader.module.scss';

interface Props
{
    component?: boolean
}

const Preloader = ({ component }: Props) =>
{
    return (
        <p className={styles.preloaderText} data-component={component}>
            {
                component
                    ? null
                    : 'Preloader'
            }
            <span className={styles.preloader}></span>
        </p>
    );
};

export default Preloader;
