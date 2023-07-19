import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter} from 'next/router';
import React, { ChangeEvent, useState, useEffect, useMemo } from 'react';

import HttpService from '@/services/http.service';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

import HeaderImage1 from '@/../public/images/backgrounds/background_2-cataclysm.jpg';
import HeaderImage2 from '@/../public/images/backgrounds/background_2-wotlk.webp';

const Modal = dynamic(() => import('@/components/modal'));
const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

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
    const [user, { mutate }] = useUser();
    const { push } = useRouter();

    const httpService = useMemo(() => (new HttpService()), []);

    const [errors, setErrors] = useState<any[]>([]);
    const [active, setActive] = useState<boolean>(type === 'register');
    const [formValues, setFormValues] = useState(defaultForm);
    const [modal, setModal] = useState<any>({ hidden: true, title: '', description: '', onHidden: null });

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'register' | 'login') =>
    {
        setFormValues({ ...formValues, [type]: { ...formValues[type], [event.target.name]: event.target.value } });
    };

    const handleRegister = async(event: any) =>
    {
        event.preventDefault();

        httpService.post('/auth/register', formValues.register)
            .then(async(response: any) =>
            {
                if (response.data.error)
                    setErrors(response.data.message);
                else
                {
                    setModal(
                        {
                            hidden: false,
                            title: 'Successful',
                            description: 'You are successfully created your account, you can login to your account now!',
                            onHidden: async() => await push('/login')
                        });
                }
            })
            .catch(error =>
            {
                if (error.response.data.error)
                    setErrors(error.response.data.message);
                else
                {
                    setModal(
                        {
                            hidden: true,
                            title: 'Error',
                            description: 'Initial Client Error',
                            onHidden: async() => await push('/register')
                        });
                }
            });
    };

    const handleLogin = async(event: any) =>
    {
        event.preventDefault();

        await httpService.post('/auth/login', formValues.login)
            .then(async(response: any) =>
            {
                if (response.data.error)
                    setErrors(response.data.message);
                else
                {
                    await httpService.setHeader('authorization', `Bearer ${ response.data.data.accessToken }`);

                    const responseToken = await axios.get('/account/current');
                    const userInformation = await responseToken.data.data.information;

                    await mutate(userInformation);

                    console.log(userInformation);

                    setModal(
                        {
                            hidden: false,
                            title: 'Successful',
                            description: 'You are successfully logged to your account!',
                            onHidden: async() => await push('/account')
                        });
                }
            })
            .catch(() =>
            {
                setModal(
                    {
                        hidden: true,
                        title: 'Error',
                        description: 'Initial Client Error',
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
                    await push('/account');
            }
        )();
    }, [user]);

    return (
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
                                Hello, Friend!
                            </h2>

                            <p>
                                Enter your personal details to sign up
                            </p>

                            <Input
                                required
                                style='register'
                                name='firstName'
                                label='First Name'
                                placeholder='Your first name'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'firstName')}
                            />

                            <Input
                                required
                                name='lastName'
                                label='Last Name'
                                placeholder='Your last name'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'lastName')}
                            />

                            <Input
                                required
                                name='username'
                                label='Username'
                                placeholder='Your username'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'username')}
                            />

                            <Input
                                required
                                name='email'
                                label='Email Address'
                                placeholder='Your email address'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'email')}
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your password'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'password')}
                            />


                            <Input
                                required
                                type='password'
                                name='confirmPassword'
                                label='Confirm Password'
                                placeholder='Confirm your password'
                                onChange={(event) => handleChange(event, 'register')}
                                error={errors.filter((error: any) => error.field === 'confirmPassword')}
                            />

                            <Button>
                                Sign Up
                            </Button>
                        </form>
                    </div>

                    <div data-deactive={type === 'register'} className={classnames(stylesForm.formContainer, stylesForm.formContainerSignIn)}>
                        <form onSubmit={handleLogin}>
                            <h2>
                                Welcome Back!
                            </h2>

                            <p>
                                Enter your personal info to sign in
                            </p>

                            <Input
                                required
                                style='login'
                                name='username'
                                label='Username'
                                placeholder='Your Username'
                                onChange={(event) => handleChange(event, 'login')}
                                error={errors.filter((error: any) => error.field === 'username')}
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your Password'
                                onChange={(event) => handleChange(event, 'login')}
                                error={errors.filter((error: any) => error.field === 'password')}
                            />

                            <Link href='/password-forgot'>
                                Forgot your password?
                            </Link>

                            <Button>
                                Sign In
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
                                <h3>Welcome Back!</h3>

                                <p>To keep connected with us please login with your personal info</p>

                                <Button type='text' onClick={() =>
                                {
                                    setActive(false);
                                    setErrors([]);
                                    setFormValues(defaultForm);
                                    window.history.pushState({ urlPath:'/login' },'', '/login');
                                }}>
                                    Sign In
                                </Button>
                            </div>
                            <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelRight, { [stylesForm.formOverlayPanelRightActive]: active })}>
                                <h3>Hello, Friend!</h3>

                                <p>Enter your personal details and start journey with us</p>

                                <Button type='text' onClick={() =>
                                {
                                    setActive(true);
                                    setErrors([]);
                                    setFormValues(defaultForm);
                                    window.history.pushState({ urlPath:'/register' },'', '/register');
                                }}>
                                    Sign Up
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
