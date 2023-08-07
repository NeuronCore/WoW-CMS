import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './button.module.scss';

interface Props
{
    children?: ReactNode,
    content?: string,
    type?: string,
    onClick?: (event?: any) => Promise<void> | void,
    href?: string,
    disabled?: boolean,
    style?: any
}

const Button = ({ children, content, type, onClick, href, disabled, style }: Props) =>
{
    return (
        href
            ?
            <Link href={ href } className={styles.buttonFrame} onClick={ onClick } data-type={ type } data-disabled={ disabled }>
                <button className={styles.button}>
                    {
                        children ?? content
                    }
                </button>
            </Link>
            :
            <div style={style} className={styles.buttonFrame} onClick={ onClick } data-type={ type } data-disabled={ disabled }>
                <button className={styles.button}>
                    {
                        children ?? content
                    }
                </button>
            </div>
    );
};

export default Button;
