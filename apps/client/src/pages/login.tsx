import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('@/components/auth'));

const Login = () =>
{
    return <Auth type='login'/>;
};

export default Login;
