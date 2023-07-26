import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BsPen } from 'react-icons/bs';
import React, {ChangeEvent, FormEvent, useState} from 'react';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import account from '@/data/account.data.json';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));
const Select = dynamic(() => import('@/components/select'));

const Security = () =>
{
    const [user] = useUser();

    const [errors, setErrors] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<any>({ question: false, email: false });
    const [formValues, setFormValues] = useState({
        question:
            {
                question: '',
                answer: '',
                password: null
            },
        password:
            {
                oldPassword: null,
                newPassword: null,
                confirmNewPassword: null
            }
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'question' | 'password') =>
    {
        setFormValues({ ...formValues, [type]: { ...formValues[type], [event.target.name]: event.target.value } });
    };

    const setupQuestion = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        console.log(formValues.question);
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
                    Account Security
                </h3>
                <div className={styles.accountContentList}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                Security Question
                            </h3>

                            <button onClick={() => setEditMode({ ...editMode, question: !editMode.question })}>
                                <BsPen />
                                Update
                            </button>
                        </header>
                        {
                            editMode.question
                                ?
                                <form>
                                    <Select
                                        defaultValue='Security Question'
                                        options={account.securityQuestions}
                                        placeholder='Security Question'
                                        state={formValues.question.question}
                                        setState={(value: string) => setFormValues({ ...formValues, question: { ...formValues.question, question: value } })}
                                        error={errors.filter((error: any) => error.field === 'securityQuestion')}
                                    />
                                    <Input
                                        required
                                        name='securityAnswer'
                                        label='Security Answer'
                                        placeholder='Security Answer'
                                        onChange={(event) => handleChange(event, 'question')}
                                        error={errors.filter((error: any) => error.field === 'securityAnswer')}
                                    />
                                    <Input
                                        required
                                        name='password'
                                        type='password'
                                        label='Confirm Password'
                                        placeholder='Confirm Password'
                                        onChange={(event) => handleChange(event, 'question')}
                                        error={errors.filter((error: any) => error.field === 'password')}
                                    />

                                    <div>
                                        <Button onClick={ setupQuestion }>
                                            Setup
                                        </Button>
                                        <Button type='text' onClick={() =>
                                        {
                                            setEditMode({ ...editMode, question: false });

                                            setFormValues({
                                                question:
                                                    {
                                                        question: '',
                                                        answer: '',
                                                        password: null
                                                    },
                                                password: formValues.password
                                            });
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
                                                Disable
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
                <div className={styles.accountContentList}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                RECENT CONNECTIONS
                            </h3>
                        </header>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">IP Address</th>
                                        <th scope="col" className="table-country">Country</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">185.206.224.42</td>
                                        <td className="table-country">DK</td>
                                        <td>Jul 23, 2023 11:47 AM</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">193.42.96.36</td>
                                        <td className="table-country">DE</td>
                                        <td>Jul 23, 2023 11:47 AM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Security;
