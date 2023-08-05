import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BsPen } from 'react-icons/bs';
import { ChangeEvent, FormEvent, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

const Button = dynamic(() => import('@/components/button'));
const Input = dynamic(() => import('@/components/input'));

const Details = () =>
{
    const [user] = useUser();

    const { t } = useTranslation();

    const [errors, setErrors] = useState<any[]>([]);
    const [formValues, setFormValues] = useState({
        info:
            {
                firstName: user.first_name,
                lastName: user.last_name,
                phone: user.phone
            },
        email:
            {
                email: user.email,
                password: null
            }
    });
    const [editMode, setEditMode] = useState<any>({ info: false, email: false });

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'info' | 'email') =>
    {
        setFormValues({ ...formValues, [type]: { ...formValues[type], [event.target.name]: event.target.value } });
    };

    const updateInfo = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        console.log(formValues.info);
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
                    { t('account:details.title') }
                </h3>
                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:details.subtitleInfo') }
                            </h3>

                            <button onClick={() => setEditMode({ ...editMode, info: !editMode.info })}>
                                <BsPen />
                                { t('account:details.update') }
                            </button>
                        </header>
                        {
                            editMode.info
                                ?
                                <form>
                                    <Input
                                        required
                                        name='firstName'
                                        label={ t('account:details.firstNameInput.label') }
                                        placeholder={ t('account:details.firstNameInput.placeholder') }
                                        defaultValue={ user.first_name }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'firstName')}
                                    />
                                    <Input
                                        required
                                        name='lastName'
                                        label={ t('account:details.lastNameInput.label') }
                                        placeholder={ t('account:details.lastNameInput.placeholder') }
                                        defaultValue={ user.last_name }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'lastName')}
                                    />
                                    <Input
                                        required
                                        name='phone'
                                        label={ t('account:details.phoneInput.label') }
                                        placeholder={ t('account:details.phoneInput.placeholder') }
                                        defaultValue={ user.phone }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'phone')}
                                    />

                                    <Button href='/verify-email'>
                                        { t('account:details.verifyEmail') }
                                    </Button>

                                    <div>
                                        <Button onClick={ updateInfo }>
                                            { t('account:details.save') }
                                        </Button>
                                        <Button type='text' onClick={() =>
                                        {
                                            setEditMode({ ...editMode, info: false });

                                            setFormValues({
                                                info:
                                                    {
                                                        firstName: user.first_name,
                                                        lastName: user.last_name,
                                                        phone: user.phone
                                                    },
                                                email: formValues.email
                                            });
                                        }}>
                                            { t('account:details.cancel') }
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div>
                                    <ul data-info>
                                        <li>
                                            <p>
                                                { t('account:details.usernameInput.label') }:
                                            </p>
                                            <span>
                                                { user.username }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                { t('account:details.firstNameInput.label') }:
                                            </p>
                                            <span>
                                                { user.first_name }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                { t('account:details.lastNameInput.label') }:
                                            </p>
                                            <span>
                                                { user.last_name }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                { t('account:details.memberSince') }:
                                            </p>
                                            <span>
                                                { user.joindate }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                { t('account:details.lastIP') }::
                                            </p>
                                            <span>
                                                { user.last_ip }
                                            </span>
                                        </li>
                                        {
                                            user.phone
                                                ?
                                                <li>
                                                    <p>
                                                        { t('account:details.phoneInput.label') }:
                                                    </p>
                                                    <span>
                                                        { user.phone }
                                                    </span>
                                                </li>
                                                : null
                                        }
                                    </ul>
                                </div>
                        }
                    </div>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:details.emailInput.label') }
                            </h3>

                            <button onClick={() => setEditMode({ ...editMode, email: !editMode.email })}>
                                <BsPen />
                                { t('account:details.update') }
                            </button>
                        </header>
                        {
                            editMode.email
                                ?
                                <form>
                                    <Input
                                        required
                                        name='email'
                                        label={ t('account:details.emailInput.label') }
                                        placeholder={ t('account:details.emailInput.placeholder') }
                                        defaultValue={ user.email }
                                        onChange={(event) => handleChange(event, 'email')}
                                        error={errors.filter((error: any) => error.field === 'email')}
                                    />
                                    <Input
                                        required
                                        name='password'
                                        type='password'
                                        label={ t('account:details.passwordInput.label') }
                                        placeholder={ t('account:details.passwordInput.placeholder') }
                                        onChange={(event) => handleChange(event, 'email')}
                                        error={errors.filter((error: any) => error.field === 'password')}
                                    />

                                    <div>
                                        <Button onClick={ updateInfo }>
                                            { t('account:details.save') }:
                                        </Button>
                                        <Button type='text' onClick={() =>
                                        {
                                            setEditMode({ ...editMode, info: false });

                                            setFormValues({
                                                info: formValues.info,
                                                email:
                                                    {
                                                        email: user.email,
                                                        password: null
                                                    }
                                            });
                                        }}>
                                            { t('account:details.cancel') }:
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div>
                                    <ul data-info>
                                        <li>
                                            <p>
                                                { t('account:details.email') }:
                                            </p>
                                            <span>
                                                { user.email }
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

export default Details;
