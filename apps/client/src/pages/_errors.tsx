import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@/components/error'));

const Errors = ({ statusCode }: any) =>
{
    return <Error title={ statusCode || 500 } message={statusCode ? `An error ${ statusCode } occurred on server` : 'An error occurred on client'} href='/' link='Back to home'/>;
};

export default Errors;
