import Link from 'next/link';
import React, { ChangeEvent } from 'react';

import stylesForm from '@/styles/components/form.module.scss';

import useTranslation from 'next-translate/useTranslation';

interface Props
{
    style?: string,
    name?: string,
    id?: string,
    value?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    error?: any,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

const Input = ({ id, label, type, placeholder, error, onChange, required, name, value, style }: Props) =>
{
    const { t } = useTranslation();

    const errors = error !== undefined ? error : [];

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
            {
                errors[0]
                    ?
                    <p className={stylesForm.messageError}>
                        { t(`common:${ errors[0].code }`) }
                    </p>
                    : null
            }
        </label>
    );
};

export default Input;
