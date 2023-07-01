export const middleOfArray = (array: unknown[]) =>
{
    return Math.round((array.length - 1) / 2);
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
        cDec = cString.substring(cDot+1);
    }

    let aComma = '', count = 0;

    if (cWhole.length > per)
    {
        for (let i=(cWhole.length-1); i>=0; i--)
        {
            aComma = cWhole.charAt(i) + aComma;
            count++;
            if (count == per && i!=0)
            {
                aComma = ',' + aComma;
                count = 0;
            }
        }
    }
    else
        aComma = cWhole;

    if (places==0)
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
