import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(name, email, code) {
    const output = `
    <h3 style="text-transform: capitalize;">Hello, ${name}</h3>
    <h3>Your Edusystem verification code: <h2>${code}</h2></h3>
    <h4>All the best, <br> Edusystem team</h4>
    <img src="cid:unique@nodemailer.com"/>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "edusystem.portal@outlook.com",
      pass: "Outlookparoli@13",
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Edusystem" <khumoyun.mirzaev@outlook.com>',
    to: `${email}`,
    subject: "Your verification code",
    text: "text",
    html: output,
    attachments: [{
      filename: 'logo.png',
      path: 'src/public/logo.png',
      cid: 'unique@nodemailer.com' //same cid value as in the html img src
  }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(info));
  });
}

export default sendMail;

// "mirzayevhumoyun5plus@gmail.com, mirzaev.khumoyun@yandex.com"
