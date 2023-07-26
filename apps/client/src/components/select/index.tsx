import classnames from 'classnames';
import React, { useState } from 'react';

import styles from '@/styles/components/select.module.scss';

interface Props
{
    options: string[],
    state: string,
    setState: any,
    placeholder?: string,
    error?: any,
    defaultValue: string
}

const Select = ({ options, state, setState, placeholder, defaultValue }: Props) =>
{
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.select}>
            <p>
                { placeholder }
            </p>
            <span className={classnames(styles.selected, { [styles.selectedAcitve]: open })} onClick={() => setOpen(!open)}>
                { state || defaultValue }
            </span>
            {
                open
                    ?
                    <ul className={classnames(styles.selectOptions, { [styles.selectOptionsAcitve]: open })}>
                        <li className={classnames(styles.selectOption, { [styles.selectOptionActive]: state === defaultValue })} onClick={() =>
                        {
                            setState(null);
                            setOpen(false);
                        }}>
                            { defaultValue }
                        </li>
                        {
                            options.map((option: string) =>
                                (
                                    <li key={option} className={classnames(styles.selectOption, { [styles.selectOptionActive]: state === option })} onClick={() =>
                                    {
                                        setState(option);
                                        setOpen(false);
                                    }}>
                                        { option }
                                    </li>
                                ))
                        }
                    </ul>
                    : null
            }
        </div>
    );
};

export default Select;
