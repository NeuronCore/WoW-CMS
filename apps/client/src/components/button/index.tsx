import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './button.module.scss';

interface Props
{
    children?: ReactNode,
    content?: string,
    type?: string,
    onClick?: (event?: any) => Promise<void> | void,
    href?: string
}

const Button = ({ children, content, type, onClick, href }: Props) =>
{
    return (
        href
            ?
            <Link href={ href } className={styles.buttonFrame} onClick={ onClick } data-type={ type }>
                <button className={styles.button}>
                    {
                        children ?? content
                    }
                </button>
            </Link>
            :
            <div className={styles.buttonFrame} onClick={ onClick } data-type={ type }>
                <button className={styles.button}>
                    {
                        children ?? content
                    }
                </button>
            </div>
    );
};

export default Button;
