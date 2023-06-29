import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React, { useState } from 'react';

import styles from '../styles/pages/auth.module.scss';
import stylesForm from '../styles/components/form.module.scss';

import HeaderImage3Red from '../../public/images/header_image_3-red.jpg';

import Button from '../components/button';

const Input = dynamic(() => import('../components/input/input.component'));

const Login = () =>
{
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className={styles.auth}>
            <span className={styles.authVideo}>
                <video src='/videos/header-video.mp4' loop autoPlay />
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
                    <div className={classnames(stylesForm.formContainer, stylesForm.formContainerSignUp, { [stylesForm.formContainerSignUpActive]: active })}>
                        <form>
                            <h2>
                                Hello, Friend!
                            </h2>

                            <p>
                                Enter your personal details to sign up
                            </p>

                            <Input
                                required
                                name='first_name'
                                label='First Name'
                                placeholder='Your first name'
                            />

                            <Input
                                required
                                name='last_name'
                                label='Last Name'
                                placeholder='Your last name'
                            />

                            <Input
                                required
                                name='email'
                                label='Email Address'
                                placeholder='Your email address'
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your password'
                            />


                            <Input
                                required
                                type='password'
                                name='confirm_password'
                                label='Confirm Password'
                                placeholder='Confirm your password'
                            />

                            <Button>
                                Sign Up
                            </Button>
                        </form>
                    </div>

                    <div className={classnames(stylesForm.formContainer, stylesForm.formContainerSignIn, { [stylesForm.formContainerSignInActive]: active })}>
                        <form>
                            <h2>
                                Welcome Back!
                            </h2>

                            <p>
                                Enter your personal info to sign in
                            </p>

                            <Input
                                required
                                name='email'
                                label='Email Address or Username'
                                placeholder='Your Email Address or Username'
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your Password'
                            />

                            <Link href='/'>
                                Forgot your password?
                            </Link>

                            <Button>
                                Sign In
                            </Button>
                        </form>
                    </div>

                    <div className={classnames(stylesForm.formOverlayContainer, { [stylesForm.formOverlayContainerActive]: active })}>
                        <div className={classnames(stylesForm.formOverlay, { [stylesForm.formOverlayActive]: active })} style={{ backgroundImage: `url(${ HeaderImage3Red.src })` }}>
                            <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelLeft, { [stylesForm.formOverlayPanelLeftActive]: active })}>
                                <h3>Welcome Back!</h3>

                                <p>To keep connected with us please login with your personal info</p>

                                <Button type='text' onClick={() =>
                                {
                                    setActive(false);
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
                                    window.history.pushState({ urlPath:'/register' },'', '/register');
                                }}>
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
