import React from 'react';
import dynamic from 'next/dynamic';

import styles from '@/components/error/error.module.scss';

const Button = dynamic(() => import('@/components/button'));

interface Props
{
    title: string,
    message?: string,
    href?: string,
    link?: string
}

const Error = ({ title, message, href, link }: Props) =>
{
    return (
        <div className={styles.error}>
            <span>
                { title }
            </span>
            {
                message
                    ?
                    <p>
                        { message }
                    </p>
                    : null
            }
            {
                href
                    ?
                    <Button href={ href }>
                        { link }
                    </Button>
                    : null
            }
        </div>
    );
};

export default Error;
