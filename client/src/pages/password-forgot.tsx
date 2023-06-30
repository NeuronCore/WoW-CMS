import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React from 'react';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

const PasswordForgot = () =>
{
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

                <div className={stylesForm.formLittle}>
                    <div className={classnames(stylesForm.formContainer, stylesForm.formContainerPassword)}>
                        <form>
                            <h2>
                                Don't Worry!
                            </h2>

                            <p>
                                Enter your email and reset your password
                            </p>

                            <Input
                                required
                                name='email'
                                label='Email Address'
                                placeholder='Your Email Address'
                            />

                            <Button>
                                Confirm
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordForgot;
