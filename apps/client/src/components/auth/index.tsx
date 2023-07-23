import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter} from 'next/router';
import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useState, useEffect, useMemo, FormEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';

import HttpService from '@/services/http.service';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

import HeaderImage1 from '@/../public/images/backgrounds/background_2-cataclysm.jpg';
import HeaderImage2 from '@/../public/images/backgrounds/background_2-wotlk.webp';

const Modal = dynamic(() => import('@/components/modal'));
const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));
const Preloader = dynamic(() => import('src/components/preloader'));

import { useUser } from '@/hooks/use-user';

const defaultForm =
    {
        login:
            {
                username: '',
                password: ''
            },
        register:
            {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
    };

interface Props
{
    type: 'register' | 'login',
}

const Auth = ({ type }: Props) =>
{
    const { push } = useRouter();
    const [user, { mutate, loading }] = useUser();

    const httpService = useMemo(() => (new HttpService()), []);

    const [errors, setErrors] = useState<any[]>([]);
    const [active, setActive] = useState<boolean>(type === 'register');
    const [formValues, setFormValues] = useState(defaultForm);
    const [modal, setModal] = useState<any>({ hidden: true, title: '', description: '', onHidden: null });

    const { t } = useTranslation();

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'register' | 'login') =>
    {
        setFormValues({ ...formValues, [type]: { ...formValues[type], [event.target.name]: event.target.value } });
    };

    const handleRegister = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        httpService.post('/auth/register', formValues.register).then(async(response: AxiosResponse<any>) =>
        {
            if (response.data.error)
                setErrors(response.data.message);
            else
            {
                setModal
                ({
                    hidden: false,
                    title: t('auth:register.modal.successful.title'),
                    description: t('auth:register.modal.successful.description'),
                    onHidden: async() =>
                    {
                        await push('/login');
                        setActive(false);
                    }
                });
            }
        }).catch(error =>
        {
            if (error.response.data.error)
                setErrors(error.response.data.message);
            else
            {
                setModal
                ({
                    hidden: true,
                    title: t('auth:register.modal.error.title'),
                    description: t('auth:register.modal.error.description'),
                    onHidden: async() => await push('/register')
                });
            }
        });
    };

    const handleLogin = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        await httpService.post('/auth/login', formValues.login).then(async(response: AxiosResponse<any>) =>
        {
            if (response.data.error)
                setErrors(response.data.message);
            else
            {
                await httpService.setHeader('authorization', `Bearer ${ response.data.data.accessToken }`);

                const responseToken = await axios.get('/account/current');
                const userInformation = await responseToken.data.data.information;

                await mutate(userInformation);

                setModal
                ({
                    hidden: false,
                    title: t('auth:login.modal.successful.title'),
                    description: t('auth:login.modal.successful.description'),
                    onHidden: async() => await push('/account')
                });
            }
        }).catch((error) =>
        {
            if (error?.response.data.message)
                setErrors(error?.response.data.message);

            setModal
            ({
                hidden: true,
                title: t('auth:login.modal.error.title'),
                description: t('auth:login.modal.error.description'),
                onHidden: async() => await push('/login')
            });
        });
    };

    useEffect(() =>
    {
        (
            async() =>
            {
                if (user)
                    await push('/account/overview');
            }
        )();
    }, [user]);

    return (
        loading
            ? <Preloader />
            :
            <div className={styles.auth}>
                <span className={styles.authVideo}>
                    <video autoPlay loop>
                        <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                    </video>
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

                    <div className={stylesForm.form}>
                        <div data-deactive={type === 'login'} className={classnames(stylesForm.formContainer, stylesForm.formContainerSignUp)}>
                            <form onSubmit={handleRegister}>
                                <h2>
                                    { t('auth:register.title') }
                                </h2>

                                <p>
                                    { t('auth:register.subtitle') }
                                </p>

                                <Input
                                    required
                                    style='register'
                                    name='firstName'
                                    label={ t('auth:register.firstNameInput.label') }
                                    placeholder={ t('auth:register.firstNameInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'firstName')}
                                />

                                <Input
                                    required
                                    name='lastName'
                                    label={ t('auth:register.lastNameInput.label') }
                                    placeholder={ t('auth:register.lastNameInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'lastName')}
                                />

                                <Input
                                    required
                                    name='username'
                                    label={ t('auth:register.usernameInput.label') }
                                    placeholder={ t('auth:register.usernameInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'username')}
                                />

                                <Input
                                    required
                                    name='email'
                                    label={ t('auth:register.emailInput.label') }
                                    placeholder={ t('auth:register.emailInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'email')}
                                />

                                <Input
                                    required
                                    type='password'
                                    name='password'
                                    label={ t('auth:register.passwordInput.label') }
                                    placeholder={ t('auth:register.passwordInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'password')}
                                />


                                <Input
                                    required
                                    type='password'
                                    name='confirmPassword'
                                    label={ t('auth:register.confirmPasswordInput.label') }
                                    placeholder={ t('auth:register.confirmPasswordInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'register')}
                                    error={errors.filter((error: any) => error.field === 'confirmPassword')}
                                />

                                <Button>
                                    { t('auth:register.signUp') }
                                </Button>
                            </form>
                        </div>

                        <div data-deactive={type === 'register'} className={classnames(stylesForm.formContainer, stylesForm.formContainerSignIn)}>
                            <form onSubmit={handleLogin}>
                                <h2>
                                    { t('auth:login.title') }
                                </h2>

                                <p>
                                    { t('auth:login.subtitle') }
                                </p>

                                <Input
                                    required
                                    style='login'
                                    name='username'
                                    label={ t('auth:login.usernameInput.label') }
                                    placeholder={ t('auth:login.usernameInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'login')}
                                    error={errors.filter((error: any) => error.field === 'username' || error.field === 'all')}
                                />

                                <Input
                                    required
                                    type='password'
                                    name='password'
                                    label={ t('auth:login.passwordInput.label') }
                                    placeholder={ t('auth:login.passwordInput.placeholder') }
                                    onChange={(event) => handleChange(event, 'login')}
                                    error={errors.filter((error: any) => error.field === 'password')}
                                />

                                <Link href='/password-forgot'>
                                    { t('auth:login.forgot') }
                                </Link>

                                <Button>
                                    { t('auth:login.signIn') }
                                </Button>
                            </form>
                        </div>

                        <div className={classnames(stylesForm.formOverlayContainer, { [stylesForm.formOverlayContainerActive]: active })}>
                            <div className={classnames(stylesForm.formOverlay, { [stylesForm.formOverlayActive]: active })} style={{ backgroundImage: `url(${
                                process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                    ? HeaderImage1.src
                                    : process.env.NEXT_PUBLIC_THEME === 'wotlk'
                                        ? HeaderImage2.src
                                        : HeaderImage1.src
                            })` }}>
                                <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelLeft, { [stylesForm.formOverlayPanelLeftActive]: active })}>
                                    <h3>{ t('auth:login.foreground.title') }</h3>

                                    <p>{ t('auth:login.foreground.subtitle') }</p>

                                    <Button type='text' onClick={() =>
                                    {
                                        setActive(false);
                                        setErrors([]);
                                        setFormValues(defaultForm);
                                        window.history.pushState({ urlPath:'/login' },'', '/login');
                                    }}>
                                        { t('auth:login.foreground.button') }
                                    </Button>
                                </div>
                                <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelRight, { [stylesForm.formOverlayPanelRightActive]: active })}>
                                    <h3>{ t('auth:register.foreground.title') }</h3>

                                    <p>{ t('auth:register.foreground.subtitle') }</p>

                                    <Button type='text' onClick={() =>
                                    {
                                        setActive(true);
                                        setErrors([]);
                                        setFormValues(defaultForm);
                                        window.history.pushState({ urlPath:'/register' },'', '/register');
                                    }}>
                                        { t('auth:register.foreground.button') }
                                    </Button>
                                </div>
                            </div>
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

export default Auth;
