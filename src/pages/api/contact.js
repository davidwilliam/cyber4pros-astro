import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Server-side only — no browser-based imports

const ses = new SESClient({ region: 'us-east-1' });

export const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { fields, recipient, subject, senderEmail, formTitle } = data;

    if (!Array.isArray(fields) || fields.length === 0 || typeof recipient !== 'string' || !recipient.trim() || typeof subject !== 'string' || !subject.trim() || typeof senderEmail !== 'string' || !senderEmail.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    let emailBody = `Form Submission for: ${formTitle || subject}\n\nSubject: ${subject}\nFrom: ${senderEmail}\n\n`;
    fields.forEach((field) => {
      emailBody += `${field.label}: ${field.value}\n`;
    });

    const emailParams = {
      Source: senderEmail,
      Destination: { ToAddresses: [recipient] },
      Message: {
        Subject: { 
          Data: `New Form Submission - ${formTitle || subject}`,
        },
        Body: { Text: { Data: emailBody } },
      },
    };

    const sendCommand = new SendEmailCommand(emailParams);
    await ses.send(sendCommand);

    return new Response(JSON.stringify({ message: 'Form submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
