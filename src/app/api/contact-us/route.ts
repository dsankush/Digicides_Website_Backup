// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

// Lazily instantiate Resend to avoid build-time errors when API key is not set
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const WHATSAPP_API_URL = 'https://wa-dashboard.digicides.in/whatsapp/api/receive_userinvitation';

interface ContactFormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, organization, email, phone, message } = await req.json() as ContactFormData;

    console.log("Form Data:", { name, organization, email, phone, message });

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone?.replace(/\D/g, '') || '';

    // ============================================
    // 1. SEND EMAIL via Resend
    // ============================================
    let emailResult = null;
    if (process.env.RESEND_API_KEY) {
      try {
        emailResult = await getResend().emails.send({
          from: 'connect@dreamlaunch.studio',
          to: ['connect@digicides.com', 'jeet.das@digicides.com', 'manoj.rajput@digicides.com'],
          subject: `New Contact Form Submission from ${name}${organization ? ` (${organization})` : ''}`,
          html: `
            <h2>New Contact Us Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <p style="font-size:12px;color:#666;">Submitted on: ${new Date().toLocaleString('en-IN')}</p>
          `,
        });
        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('Email send failed:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not set, skipping email');
    }

    // ============================================
    // 2. SEND TO WHATSAPP API
    // ============================================
    let whatsappResult = null;
    if (cleanPhone) {
      try {
        const whatsappPayload = {
          caller: cleanPhone,
          campaign_name: 'userinvitation',
          username: name,
        };

        console.log('Sending to WhatsApp API:', whatsappPayload);

        const whatsappResponse = await fetch(WHATSAPP_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(whatsappPayload),
        });

        if (whatsappResponse.ok) {
          whatsappResult = await whatsappResponse.json() as { message: string; id: number };
          console.log('WhatsApp API success:', whatsappResult);
        } else {
          console.error('WhatsApp API failed:', whatsappResponse.status, await whatsappResponse.text());
        }
      } catch (whatsappError) {
        console.error('WhatsApp API error:', whatsappError);
      }
    } else {
      console.log('No phone number provided, skipping WhatsApp API');
    }

    // ============================================
    // 3. SEND TO WEBHOOK (if configured)
    // ============================================
    let webhookResult = null;
    if (WEBHOOK_URL) {
      try {
        const webhookPayload = {
          name,
          organization: organization || null,
          email,
          phone: phone || null,
          message,
          submittedAt: new Date().toISOString(),
          timestamp: Date.now(),
        };

        console.log('Sending to Webhook:', WEBHOOK_URL);

        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
        });

        if (webhookResponse.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          webhookResult = await webhookResponse.json();
          console.log('Webhook triggered successfully:', webhookResult);
        } else {
          console.error('Webhook failed:', webhookResponse.status, await webhookResponse.text());
        }
      } catch (webhookError) {
        console.error('Webhook trigger error:', webhookError);
      }
    } else {
      console.log('WEBHOOK_URL not set, skipping webhook');
    }

    // Return success with results
    return NextResponse.json({
      success: true,
      results: {
        email: emailResult ? 'sent' : 'skipped',
        whatsapp: whatsappResult ? 'sent' : 'skipped',
        webhook: webhookResult ? 'sent' : 'skipped',
      },
    });

  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 });
  }
}