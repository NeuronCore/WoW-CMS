import fetch from 'node-fetch';

export class Soap
{
    public static command(command: string)
    {
        return fetch(`${ process.env.SOAP_HOST_NAME }:${ process.env.SOAP_PORT }`, {
            method: 'POST',
            body: Soap.execute(command),
            headers:
            {
                'Content-Type': 'text/xml',
                'Authorization': `Basic ${ Buffer.from(`${ process.env.SOAP_USERNAME }:${ process.env.SOAP_PASSWORD }`).toString('base64') }`
            }
        });
    }

    private static execute(command: string): string
    {
        return `
            <?xml version="1.0" encoding="utf-8"?>
            <SOAP-ENV:Envelope
                xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:ns1="${ process.env.SOAP_URI }" xmlns:xsd="http://www.w3.org/1999/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
                SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"
            >
                <SOAP-ENV:Body>
                    <ns1:executeCommand>
                        <command>${ command }</command>
                    </ns1:executeCommand>
                </SOAP-ENV:Body>
            </SOAP-ENV:Envelope>
        `;
    }
}
