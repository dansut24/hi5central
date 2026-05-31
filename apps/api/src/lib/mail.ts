import nodemailer from "nodemailer";

function getBoolean(value: string | undefined) {
  return String(value ?? "").toLowerCase() === "true";
}

export async function sendMail({
  to,
  subject,
  text,
  html
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = getBoolean(process.env.SMTP_SECURE);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    throw new Error("smtp_not_configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  });
}

export async function sendTrialConfirmationEmail({
  to,
  firstName,
  companyName,
  confirmationUrl
}: {
  to: string;
  firstName: string;
  companyName: string;
  confirmationUrl: string;
}) {
  const safeFirstName = firstName || "there";

  await sendMail({
    to,
    subject: "Confirm your Hi5Central trial",
    text: `Hi ${safeFirstName},

Your Hi5Central trial for ${companyName} is ready.

Confirm your email and activate your tenant here:

${confirmationUrl}

This link expires in 24 hours.

Thanks,
Hi5Central`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:18px; padding:28px; border:1px solid #e2e8f0;">
          <h1 style="margin:0; color:#0f172a; font-size:24px;">Confirm your Hi5Central trial</h1>
          <p style="color:#334155; line-height:1.6;">Hi ${safeFirstName},</p>
          <p style="color:#334155; line-height:1.6;">
            Your Hi5Central trial for <strong>${companyName}</strong> is ready.
          </p>
          <p style="color:#334155; line-height:1.6;">
            Confirm your email and activate your tenant using the button below.
          </p>
          <p style="margin:28px 0;">
            <a href="${confirmationUrl}" style="background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:12px; font-weight:bold; display:inline-block;">
              Confirm trial
            </a>
          </p>
          <p style="color:#64748b; font-size:13px; line-height:1.6;">
            This link expires in 24 hours.
          </p>
          <p style="color:#64748b; font-size:13px; line-height:1.6;">
            If the button does not work, copy and paste this URL into your browser:<br />
            <span style="word-break:break-all;">${confirmationUrl}</span>
          </p>
        </div>
      </div>
    `
  });
}
