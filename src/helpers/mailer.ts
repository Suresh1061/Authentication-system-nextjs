import bcryptjs from "bcryptjs"
import User from "@/models/userModel";
import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log(emailType)
        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
            console.log("updated user " , updatedUser)
        } else if (emailType === "RESET") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }


        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f1960372926f04",
                pass: "7fdd3ea29a7917"
            }
        });

        const mailOptions = {
            from: 'suresh@gmail',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} 
            or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}