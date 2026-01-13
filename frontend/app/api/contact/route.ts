import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        console.log('📧 Contact form submission received');
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            console.log('❌ Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Validation failed: Invalid email format');
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        console.log('✅ Validation passed');
        console.log('🔧 Creating SMTP transporter...');

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        console.log(`📨 Sending email to: ${process.env.CONTACT_EMAIL}`);

        // Email content to be sent to you
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.CONTACT_EMAIL,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #00ff00; background-color: #000;">
          <h2 style="color: #00ff00; border-bottom: 2px solid #00ff00; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #0a0a0a; border-left: 4px solid #00ff00;">
            <p style="color: #00ff00; margin: 5px 0;"><strong>From:</strong></p>
            <p style="color: #90EE90; margin: 5px 0 15px 0;">${name}</p>
            
            <p style="color: #00ff00; margin: 5px 0;"><strong>Email:</strong></p>
            <p style="color: #90EE90; margin: 5px 0 15px 0;">${email}</p>
            
            <p style="color: #00ff00; margin: 5px 0;"><strong>Subject:</strong></p>
            <p style="color: #90EE90; margin: 5px 0 15px 0;">${subject}</p>
            
            <p style="color: #00ff00; margin: 5px 0;"><strong>Message:</strong></p>
            <p style="color: #90EE90; margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #0a0a0a; border: 1px solid #00ff00;">
            <p style="color: #00ff00; font-size: 12px; margin: 0;">
              <strong>Sent from:</strong> Portfolio Contact Form
            </p>
            <p style="color: #90EE90; font-size: 12px; margin: 5px 0 0 0;">
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully!');

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
