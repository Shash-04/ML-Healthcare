import { resend } from "@/lib/resend";

import { ApiResponse } from "../types/ApiResponse";
import VerificationEmail from "../../email/verificationEmail";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const response = await resend.emails.send({
      from: 'ankurdeepmlproject.lovestoblog.com',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log(response);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}