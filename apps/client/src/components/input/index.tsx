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
    required?: boolean,
    defaultValue?: any,
    disabled?: boolean
}

const Input = ({ id, label, type, placeholder, error, onChange, required, name, value, style, defaultValue, disabled }: Props) =>
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
                            { t('auth:login.link.paragraph') }
                            <Link href='/register'>
                                { t('auth:login.link.button') }
                            </Link>
                        </p>
                        :
                        style === 'register'
                            ?
                            <p>
                                { t('auth:register.link.paragraph') }
                                <Link href='/login'>
                                    { t('auth:register.link.button') }
                                </Link>
                            </p>
                            : null
                }
            </span>
            <input
                disabled={ disabled }
                required={ required }
                onChange={ onChange }
                className={ stylesForm.input }
                placeholder={ placeholder }
                type={ type ?? 'text' }
                id={ id ?? name }
                name={ name ?? id }
                value={ value }
                defaultValue={ defaultValue }
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
