// ═══════════════════════════════════════════
// api/notify.js — Vercel Serverless Function
// Sends email notification for new GitHub repos
// Uses Resend (free tier: 100 emails/day)
// ═══════════════════════════════════════════

const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify authorization
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.NOTIFY_SECRET;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { repoName, repoUrl } = req.body;

  if (!repoName || !repoUrl) {
    return res.status(400).json({ error: 'Missing repoName or repoUrl' });
  }

  // Send email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'ryadbenyakoub@gmail.com';

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'Portfolio Bot <onboarding@resend.dev>',
      to: [notificationEmail],
      subject: `🚀 New Project Added: ${repoName}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0a0a0f; color: #f0f0f5; border-radius: 16px;">
          <h2 style="color: #6366f1; margin-bottom: 16px;">New Project Detected!</h2>
          <p style="color: #a1a1b5; line-height: 1.6;">
            A new public repository has been added to your GitHub account and is now visible on your portfolio.
          </p>
          <div style="background: #16161f; border: 1px solid #1e1e2e; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #f0f0f5; margin: 0 0 8px;">${repoName}</h3>
            <a href="${repoUrl}" style="color: #6366f1; text-decoration: none; font-size: 14px;">${repoUrl}</a>
          </div>
          <p style="color: #6b6b80; font-size: 12px; margin-top: 24px;">
            This notification was sent automatically by your portfolio's GitHub Actions workflow.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: `Notification sent for ${repoName}` });
  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send notification email' });
  }
};
