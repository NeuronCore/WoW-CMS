export const middleOfArray = (array: []) =>
{
    return Math.round((array.length - 1) / 2);
};

export const capitalizeFirstLetter = (string: string) =>
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const numberWithCommas = (num: number, per: number | undefined, places: number | undefined): string =>
{
    if (per == undefined)
        per = 3;

    if (places == undefined)
        places = 2;

    if (places == 0)
        num = Math.round(num);

    const cString = num.toString();
    const cDot = cString.indexOf('.');

    let cWhole = '', cDec;

    if (cDot == -1)
    {
        cWhole = cString;
        cDec = 0;
    }
    else
    {
        cWhole = cString.substring(0, cDot);
        cDec = cString.substring(cDot + 1);
    }

    let aComma = '', count = 0;

    if (cWhole.length > per)
    {
        for (let i = (cWhole.length - 1); i >= 0; i--)
        {
            aComma = cWhole.charAt(i) + aComma;
            count++;

            if (count == per && i != 0)
            {
                aComma = ',' + aComma;
                count = 0;
            }
        }
    }
    else
        aComma = cWhole;

    if (places == 0)
        cDec = '';
    else
    {
        cDec = +('0.' + cDec);
        cDec = cDec.toFixed(places).toString().substring(1);
    }

    return aComma + cDec;
};

export const createUniqueKey = (array: unknown[]) =>
{
    return array.map(item => item?.toString().split(' ').join('_')).join('_');
};

export const timeSince = (date: Date) =>
{
    const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1)
        return Math.floor(interval) + ' years';

    interval = seconds / 2592000;

    if (interval > 1)
        return Math.floor(interval) + ' months';

    interval = seconds / 86400;

    if (interval > 1)
        return Math.floor(interval) + ' days';

    interval = seconds / 3600;

    if (interval > 1)
        return Math.floor(interval) + ' hours';

    interval = seconds / 60;

    if (interval > 1)
        return Math.floor(interval) + ' minutes';

    return Math.floor(seconds) + ' seconds';
};

export const timeString = (date: Date) =>
{
    const myDate = new Date(date);

    const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

    const getDate = myDate.getDate();
    const month = monthsList[myDate.getMonth()];
    const year = myDate.getFullYear();

    return `${ month } ${ getDate }, ${ year }`;
};

export const timeCalendar = (date: Date) =>
{
    const myDate = new Date(date);

    const getDate = myDate.getDate();
    const month = myDate.getMonth();
    const year = myDate.getFullYear();

    return [getDate, month, year];
};

