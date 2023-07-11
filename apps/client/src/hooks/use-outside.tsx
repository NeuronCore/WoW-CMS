import React, { useEffect } from 'react';

const useOutside = (ref: React.RefObject<HTMLInputElement>, callback: () => void) =>
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
