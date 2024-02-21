export const emailTemp = (data, subject) => {

    return  `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Lasepa</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif">
            <table style="background-color: #f1fbff; max-width: 900px; margin: 0 auto" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <table
                            style="
                                background: url('https://main.d3usmo4yxhscgv.amplifyapp.com/assets/bg-MDFy6LPG.jpg') center top no-repeat;
                                background-size: cover;
                                height: 12.5rem;
                                text-align: center;
                                vertical-align: middle;
                                padding-top: 2.5rem;
                                margin: 0 auto;
                                width: 100%;
                            "
                            cellspacing="0"
                            cellpadding="0"
                        >
                            <tr>
                                <td>
                                    <img
                                        src="https://www.lasepa.gov.ng/wp-content/uploads/2019/12/las-d.png"
                                        alt="Company Logo"
                                        style="max-width: 175px; max-height: 100%; margin: auto; display: block"
                                    />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="background-color: #ffffff; width: 75%; margin: -1rem auto auto; padding: 20px" cellspacing="0" cellpadding="0" align="center">
                            <tr>
                                <td>${data}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; padding: 3rem 10px 2rem; color: #333333; opacity: 0.8">info@lasepa.com | 080890898756</td>
                </tr>
            </table>
        </body>
    </html>`

}