import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@/components/error'));

const Error404 = () =>
{
    return <Error title='404' message='The page you requested could not be found' href='/' link='Back to home'/>;
};

export default Error404;
