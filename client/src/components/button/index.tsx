import { ReactNode } from 'react';

import styles from './button.module.scss';

interface Props
{
    children?: ReactNode,
    content?: string,
    type?: string
}

const Button = ({ children, content, type }: Props) =>
{
    return (
        <button className={styles.button} data-type={type}>
            {
                children ?? content
            }
        </button>
    );
};

export default Button;
