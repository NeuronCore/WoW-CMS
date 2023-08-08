import axios from 'axios';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import styles from '../../styles/pages/auth.module.scss';
import stylesForm from '../../styles/components/form.module.scss';

const Modal = dynamic(() => import('@/components/modal'));
const Input = dynamic(() => import('../../components/input'));
const Button = dynamic(() => import('../../components/button'));

const defaultForm =
    {
        password: '',
        confirmPassword: ''
    };

const ResetPassword = () =>
{
    const { push, query } = useRouter();

    const [errors, setErrors] = useState<any[]>([]);
    const [formValues, setFormValues] = useState(defaultForm);
    const [modal, setModal] = useState<any>({ hidden: true, title: '', description: '', onHidden: null });

    const { t } = useTranslation();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleResetPassword = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        await axios.patch(`/account-password/reset-password/${ query.token }`, formValues)
            .then(async(response: any) =>
            {
                if (response?.response?.data?.message)
                    setErrors(response.response.data.message);
                else if (response?.data?.error)
                    setErrors(response.data.message);
                else if (response?.data?.statusCode === 200)
                {
                    setModal
                    ({
                        hidden: false,
                        title: t('auth:resetPassword.modal.title'),
                        description: t('common:2022'),
                        onHidden: async() => await push('/login')
                    });
                }
            })
            .catch((error) =>
            {
                if (error?.response?.data?.message)
                    setErrors(error?.response.data.message);
            });
    };

    return (
        <div className={styles.auth}>
            <span className={styles.authVideo}>
                <video src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } loop autoPlay />
                <span className={styles.authFilter} />
                <span className={styles.authFilter} />
                <span className={styles.authFilter2} />
            </span>

            <div className={stylesForm.formFrame}>
                <i data-top_right>
                    <span/>
                    <span/>
                </i>
                <i data-top_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_right>
                    <span/>
                    <span/>
                </i>

                <div className={stylesForm.formLittle}>
                    <div className={classnames(stylesForm.formContainer, stylesForm.formContainerPassword)}>
                        <form onSubmit={handleResetPassword}>
                            <h2>
                                { t('auth:resetPassword.title') }
                            </h2>

                            <Input
                                required
                                type='password'
                                name='password'
                                label={ t('auth:register.passwordInput.label') }
                                placeholder={ t('auth:register.passwordInput.placeholder') }
                                onChange={(event) => handleChange(event)}
                                error={errors.filter((error: any) => error.field === 'password' || error.field === 'all')}
                            />

                            <Input
                                required
                                type='password'
                                name='confirmPassword'
                                label={ t('auth:register.confirmPasswordInput.label') }
                                placeholder={ t('auth:register.confirmPasswordInput.placeholder') }
                                onChange={(event) => handleChange(event)}
                                error={errors.filter((error: any) => error.field === 'confirmPassword')}
                            />

                            <Button>
                                Confirm
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {
                modal.hidden
                    ? null
                    : <Modal modal={modal} setModal={setModal} />
            }
        </div>
    );
};

export default ResetPassword;
