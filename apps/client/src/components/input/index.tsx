import React, { ChangeEvent } from 'react';

import stylesForm from '@/styles/components/form.module.scss';

interface Props
{
    name?: string,
    id?: string,
    value?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    errors?: string[],
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

const Input = ({ id, label, type, placeholder, errors, onChange, required, name, value }: Props) =>
{
    return (
        <label className={stylesForm.label} htmlFor={ id }>
            <span>
                { label }
            </span>
            <input
                required={ required }
                onChange={onChange}
                className={stylesForm.input}
                placeholder={ placeholder }
                type={ type ?? 'text' }
                id={ id ?? name }
                name={ name ?? id }
                value={ value }
            />
            <p className={stylesForm.messageError} data-active={ !!errors }>
                { errors ? errors[0] : null }
            </p>
        </label>
    );
};

export default Input;
