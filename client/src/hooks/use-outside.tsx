import { useEffect } from 'react';

const useOutside = (ref: any, callback: any) =>
{
    useEffect(() =>
    {
        const handleClickOutside = (event: { target: any; }) =>
        {
            if (ref.current && !ref.current.contains(event.target))
                callback();
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
        {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, ref]);
};

export default useOutside;
