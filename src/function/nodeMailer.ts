import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ahsanallajpk22@gmail.com",
        pass: "iyiuvrdfvfrspksj",
    },
});

export const sendEmail = (email: string, subject: string, html:string, callback: any) => {
    const mailOptions = {
        from: "ahsanallajpk22@gmail.com",
        to: email,
        subject,
        html
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            console.log("Email has been sent to user's email");
            callback(null, info);
        }
    });
};