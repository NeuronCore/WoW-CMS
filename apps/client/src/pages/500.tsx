import React from 'react';
import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@/components/error'));

const Error500 = () =>
{
    return <Error title='500' message='Server-side error occurred' href='/' link='Back to home'/>;
};

export default Error500;
