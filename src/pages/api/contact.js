import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Server-side only — no browser-based imports

// Create SES client with credentials
const ses = new SESClient({ 
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Define verified email addresses
const SENDER_EMAIL = "no-reply@datahubz.com";  // From address
const RECIPIENT_EMAIL = "contact@datahubz.com"; // To address (where form submissions will be sent)

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { fields, subject, senderEmail, replyToEmail, formTitle } = data;

    if (!Array.isArray(fields) || fields.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing form fields' }), { status: 400 });
    }

    // Create detailed email body
    let emailBody = `Form Submission for: ${formTitle || subject || 'Contact Form'}\n\n`;
    
    // Add sender information if provided
    if (replyToEmail) {
      emailBody += `From: ${replyToEmail}\n\n`;
    }
    
    // Add all form fields
    fields.forEach((field) => {
      emailBody += `${field.label}: ${field.value}\n`;
    });

    // Create email parameters - always send to contact@datahubz.com
    const emailParams = {
      Source: SENDER_EMAIL,
      Destination: { 
        ToAddresses: [RECIPIENT_EMAIL] 
      },
      Message: {
        Subject: { 
          Data: `New Form Submission - ${formTitle || subject || 'Contact Form'}`,
        },
        Body: { 
          Text: { Data: emailBody } 
        },
      },
      // Set Reply-To as the user's email if provided
      ReplyToAddresses: replyToEmail ? [replyToEmail] : [],
    };

    try {
      const sendCommand = new SendEmailCommand(emailParams);
      const result = await ses.send(sendCommand);
      console.log('Email sent successfully:', result.MessageId);
      return new Response(JSON.stringify({ 
        message: 'Form submitted successfully!',
        messageId: result.MessageId 
      }), { status: 200 });
    } catch (error) {
      console.error('SES Error:', error);
      
      // For development help, include error details
      const isDev = import.meta.env.DEV || process.env.NODE_ENV === 'development';
      const errorMessage = isDev 
        ? `Email sending failed: ${error.message}` 
        : 'Unable to send email at this time';
        
      return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
