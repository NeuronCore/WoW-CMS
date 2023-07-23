import Logo1 from '@/../public/images/logos/wow_cms-cataclysm.png';
import Logo2 from '@/../public/images/logos/wow_cms-wotlk.png';

const Logo = () =>
{
    return (
        process.env.NEXT_PUBLIC_THEME === 'cataclysm'
            ? Logo1
            :
            process.env.NEXT_PUBLIC_THEME === 'wotlk'
                ? Logo2
                : Logo1
    );
};

export default Logo;
