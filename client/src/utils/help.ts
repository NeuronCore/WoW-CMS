interface persianNumbers
{
    [index:string]:string
}

const persianNumbers: persianNumbers =
    {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹'
    };

export const toPersianNumber = (value: number | string): string =>
{
    return String(value).split('').map((char: string) =>
    {
        return persianNumbers[char] ? persianNumbers[char] : char;
    }).join('');
};

export const numberWithCommas = (num: number, per: number | undefined, places: number | undefined): string =>
{
    if (per == undefined)
        per = 3;

    if (places == undefined)
        places = 2;


    if (places == 0)
        num = Math.round(num);


    let cString = num.toString(),
        cDot = cString.indexOf('.'),
        cWhole = '', cDec;

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

