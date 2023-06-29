import { ReactNode } from 'react';

import styles from './button.module.scss';

interface Props
{
    children?: ReactNode,
    content?: string,
    type?: string,
    onClick?: () => void
}

const Button = ({ children, content, type, onClick }: Props) =>
{
    return (
        <div className={styles.buttonFrame} onClick={onClick} data-type={type}>
            <button className={styles.button}>
                {
                    children ?? content
                }
            </button>
        </div>
    );
};

export default Button;
