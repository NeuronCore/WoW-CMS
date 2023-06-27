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
        <div className={styles.buttonFrame}>
            <button className={styles.button} data-type={type}>
                {
                    children ?? content
                }
            </button>
        </div>
    );
};

export default Button;
