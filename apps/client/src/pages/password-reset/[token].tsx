import React from 'react';
import dynamic from 'next/dynamic';
import classnames from 'classnames';

import styles from '../../styles/pages/auth.module.scss';
import stylesForm from '../../styles/components/form.module.scss';

const Input = dynamic(() => import('../../components/input'));
const Button = dynamic(() => import('../../components/button'));

const PasswordReset = () =>
{
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
                        <form>
                            <h2>
                                Reset Your Password!
                            </h2>

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
                                Confirm
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
