import Link from 'next/link';
import React, { ChangeEvent } from 'react';

import stylesForm from '@/styles/components/form.module.scss';

interface Props
{
    style?: string,
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

const Input = ({ id, label, type, placeholder, errors, onChange, required, name, value, style }: Props) =>
{
    return (
        <label className={stylesForm.label} htmlFor={ id }>
            <span>
                { label }
                {
                    style === 'login'
                        ?
                        <p>
                            Need an account?
                            <Link href='/register'>
                                Sign up
                            </Link>
                        </p>
                        :
                        style === 'register'
                            ?
                            <p>
                                Already have an account?
                                <Link href='/login'>
                                    Log in
                                </Link>
                            </p>
                            : null
                }
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
