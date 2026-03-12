import { Resend } from "resend";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend key loaded:", process.env.RESEND_API_KEY);
// ✅ SEND EMAIL FUNCTION
export const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "KRISHIGNAN <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// ✅ Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Generate key from JWT_SECRET
const getCryptoKey = () => {
  return crypto.createHash("sha256").update(process.env.JWT_SECRET).digest();
};

// ✅ Generate encrypted token containing OTP and expiry
export const generateOTPToken = (email, otp) => {
  const expiry = Date.now() + 10 * 60 * 1000;
  const data = `${email}:${otp}:${expiry}`;

  const iv = crypto.randomBytes(16);
  const key = getCryptoKey();

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

// ✅ Verify OTP token
export const verifyOTPToken = (token, email, otp) => {
  try {
    const [ivHex, encrypted] = token.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const key = getCryptoKey();

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const [storedEmail, storedOTP, expiry] = decrypted.split(":");

    if (storedEmail !== email || storedOTP !== otp) return false;
    if (Date.now() > parseInt(expiry)) return false;

    return true;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

// ✅ Send OTP Email
export const sendOTPEmail = async (email, otp) => {
  const subject = "Password Reset OTP - KRISHIGNAN";

  const html = `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
    <h1 style="color:#2e7d32;">🌾 KRISHIGNAN</h1>
    <h2>Password Reset Request</h2>

    <p>You requested to reset your password.</p>

    <div style="background:#f5f9f5;padding:25px;text-align:center;border-radius:8px;border:2px dashed #2e7d32;">
      <h1 style="color:#2e7d32;font-size:40px;letter-spacing:10px;">${otp}</h1>
      <p>Valid for 10 minutes</p>
    </div>

    <p>If you didn't request this, ignore this email.</p>
  </div>
  `;

  try {
    await sendEmail(email, subject, html);
    console.log("OTP Email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};