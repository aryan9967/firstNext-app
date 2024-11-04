import User from "@/models/userModels"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export async function sendmail(email: any, userId: any) {
    try {
        const hashId = await bcrypt.hash(userId.toString(), 10)

        await User.findByIdAndUpdate(userId, { verifyToken: hashId, verifyTokenExpiry: Date.now() + 60 * 60 * 1000 })

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const message = {
            from: "aryan@gmail.com",
            to: email,
            subject: "Verify your email",
            text: "Verify your email",
            html: `<p>Click on the following link to verify your email <a href= "${process.env.DOMAIN}/verifyemail?token=${hashId}">Verify email</a></p>`
        }

        const response = await transport.sendMail(message)
        console.log(response)
        return response

    } catch (error) {
        console.error(error)
    }
}