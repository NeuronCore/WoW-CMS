import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BsPen } from 'react-icons/bs';
import { ChangeEvent, FormEvent, useState } from 'react';

import styles from '@/styles/pages/account.module.scss';

import QrCode from '@/../public/images/textures/qr-code.png';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

const defaultForm =
    {
        verification: null
    };

const TwoFactor = () =>
{
    const [errors, setErrors] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<any>(false);
    const [formValues, setFormValues] = useState(defaultForm);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const confirmAuthenticator = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        console.log(formValues);
    };

    return (
        <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
            }}
        >
            <div className={styles.accountContent}>
                <h3 className={styles.accountContentHeader}>
                    Two Factor Authentication
                </h3>
                <div className={styles.accountContentList}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                2FA Status
                            </h3>

                            <button onClick={() => setEditMode(true)}>
                                <BsPen />
                                Add Authenticator
                            </button>
                        </header>
                        {
                            editMode
                                ?
                                <form>
                                    <div data-qr>
                                        <p>
                                            QR Code
                                        </p>
                                        <div>
                                            <Image
                                                src={ QrCode }
                                                alt='QR Code'
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                sizes={'100'}
                                            />
                                        </div>
                                        <span>
                                            You can scan this QR Code using your Authenticator application.
                                            Google Authenticator:
                                            <Link href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'>
                                                Android
                                            </Link>
                                            /
                                            <Link href='https://apps.apple.com/app/google-authenticator/id388497605'>
                                                iOS
                                            </Link>
                                        </span>
                                    </div>

                                    <Input
                                        disabled
                                        required
                                        name='secret'
                                        label='Secret'
                                        value='ODFITJPNH3RX4WVY'
                                        error={errors.filter((error: any) => error.field === 'secret')}
                                    />

                                    <Input
                                        required
                                        name='verification'
                                        label='Verification Code'
                                        placeholder='Verification Code'
                                        onChange={(event) => handleChange(event)}
                                        error={errors.filter((error: any) => error.field === 'verification')}
                                    />

                                    <div>
                                        <Button onClick={ confirmAuthenticator }>
                                            Confirm Authenticator
                                        </Button>
                                        <Button type='text' onClick={() =>
                                        {
                                            setEditMode(false);
                                            setFormValues({ verification: null });
                                        }}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div>
                                    <ul data-security>
                                        <li>
                                            <p>
                                                Status
                                            </p>
                                            <span>
                                                Inactive
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TwoFactor;
