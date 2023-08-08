import axios from 'axios';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FormEvent, useState}  from 'react';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

const Modal = dynamic(() => import('@/components/modal'));
const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

const defaultForm =
    {
        email: ''
    };

const ForgotPassword = () =>
{
    const { push } = useRouter();

    const [errors, setErrors] = useState<any[]>([]);
    const [formValues, setFormValues] = useState(defaultForm);
    const [modal, setModal] = useState<any>({ hidden: true, title: '', description: '', onHidden: null });

    const { t } = useTranslation();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleForgotPassword = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.post('/account-password/forgot-password', formValues);

            if (response.data.error)
                setErrors(response.data.message);
            else
            {
                setModal
                ({
                    hidden: false,
                    title: t('auth:forgotPassword.modal.successful.title'),
                    description: t('auth:forgotPassword.modal.successful.description'),
                    onHidden: async() => await push('/')
                });
            }
        }
        catch (error)
        {
            console.log(error);
        }
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
                        <form onSubmit={handleForgotPassword}>
                            <h2>
                                Don't Worry!
                            </h2>

                            <p>
                                Enter your email and reset your password
                            </p>

                            <Input
                                required
                                name='email'
                                label={ t('auth:register.emailInput.label') }
                                placeholder={ t('auth:register.emailInput.placeholder') }
                                onChange={(event) => handleChange(event)}
                                error={errors.filter((error: any) => error.field === 'email')}
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

export default ForgotPassword;
