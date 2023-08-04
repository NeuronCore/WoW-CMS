import classnames from 'classnames';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

const VerifyEmail = () =>
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
                                VERIFY YOUR EMAIL ADDRESS
                            </h2>

                            <p>
                                We're excited to have you get started. First, you need to confirm your account. An email verification link has been sent to your email address.
                            </p>

                            <span>
                                If you did not receive the email,
                                <button>
                                    Click Me!
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
