import React from 'react';
import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('@/components/auth'));

const Register = () =>
{
    return <Auth type='register'/>;
};

export default Register;
