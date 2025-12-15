import { sendEmail } from '../utils/emailService.js';

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Email to the admin/support (Optional: could be a dedicated support email)
        // For this implementation, we'll send it TO the user as a confirmation, 
        // AND to a hypothetical support email (or just log it effectively by sending to self if configured).
        // Let's assume the goal is to notify the "Support Team" about the user's message.

        // In a real app, you'd send to process.env.SUPPORT_EMAIL
        // Here we'll just send to the user saying "We got your message" 
        // AND maybe send to the configured EMAIL_USER as a copy.

        const supportEmailContent = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

        // Send to the admin/support (using the sender email itself for now if no separate support email)
        await sendEmail(process.env.EMAIL_USER, `Contact Form: ${subject}`, supportEmailContent);

        // Send confirmation to user
        const userConfirmationContent = `
      <h3>Hello ${name},</h3>
      <p>Thank you for contacting KrishiGyan. We have received your message regarding "<strong>${subject}</strong>".</p>
      <p>Our team will get back to you shortly.</p>
      <br>
      <p>Best Regards,</p>
      <p>Team KrishiGyan</p>
    `;
        await sendEmail(email, 'We received your message - KrishiGyan', userConfirmationContent);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};
