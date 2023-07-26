import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BsPen } from 'react-icons/bs';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

const Button = dynamic(() => import('@/components/button'));
const Input = dynamic(() => import('@/components/input'));

const Details = () =>
{
    const [user] = useUser();

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
                    ACCOUNT DETAILS
                </h3>
                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                Personal Information
                            </h3>

                            <button onClick={() => setEditMode({ ...editMode, info: !editMode.info })}>
                                <BsPen />
                                Update
                            </button>
                        </header>
                        {
                            editMode.info
                                ?
                                <form>
                                    <Input
                                        required
                                        name='firstName'
                                        label='First Name'
                                        placeholder='First Name'
                                        defaultValue={ user.first_name }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'firstName')}
                                    />
                                    <Input
                                        required
                                        name='lastName'
                                        label='Last Name'
                                        placeholder='Last Name'
                                        defaultValue={ user.last_name }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'lastName')}
                                    />
                                    <Input
                                        required
                                        name='phone'
                                        label='Phone'
                                        placeholder='Phone'
                                        defaultValue={ user.phone }
                                        onChange={(event) => handleChange(event, 'info')}
                                        error={errors.filter((error: any) => error.field === 'phone')}
                                    />

                                    <Button href='/verify-email'>
                                        Verify Email
                                    </Button>

                                    <div>
                                        <Button onClick={ updateInfo }>
                                            Save
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
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div>
                                    <ul data-info>
                                        <li>
                                            <p>
                                                Username:
                                            </p>
                                            <span>
                                                { user.username }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                First Name:
                                            </p>
                                            <span>
                                                { user.first_name }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                Last Name:
                                            </p>
                                            <span>
                                                { user.last_name }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                Member Since:
                                            </p>
                                            <span>
                                                { user.joindate }
                                            </span>
                                        </li>
                                        <li>
                                            <p>
                                                Last IP:
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
                                                        Phone:
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
                                Email Address
                            </h3>

                            <button onClick={() => setEditMode({ ...editMode, email: !editMode.email })}>
                                <BsPen />
                                Update
                            </button>
                        </header>
                        {
                            editMode.email
                                ?
                                <form>
                                    <Input
                                        required
                                        name='email'
                                        label='Email'
                                        placeholder='Email'
                                        defaultValue={ user.email }
                                        onChange={(event) => handleChange(event, 'email')}
                                        error={errors.filter((error: any) => error.field === 'email')}
                                    />
                                    <Input
                                        required
                                        name='password'
                                        type='password'
                                        label='Password'
                                        placeholder='Password'
                                        onChange={(event) => handleChange(event, 'email')}
                                        error={errors.filter((error: any) => error.field === 'password')}
                                    />

                                    <div>
                                        <Button onClick={ updateInfo }>
                                            Save
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
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div>
                                    <ul data-info>
                                        <li>
                                            <p>
                                                Email:
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
