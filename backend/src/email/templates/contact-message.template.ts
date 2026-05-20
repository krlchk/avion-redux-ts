interface ContactMessageTemplateParams {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function contactMessageTemplate({
  name,
  email,
  phone,
  message,
}: ContactMessageTemplateParams) {
  const year = new Date().getFullYear();

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:#ffffff; padding:24px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="width:600px; max-width:600px; background:#FCFCFC; border-radius:14px; overflow:hidden; box-shadow:0 10px 22px rgba(148,116,88,0.24);">
          <tr>
            <td style="background:#947458; color:#ffffff; text-align:center; padding:18px 20px;">
              <div style="font-size:18px; font-weight:800; letter-spacing:0.2px;">
                New contact request
              </div>
              <div style="font-size:13px; opacity:0.95; margin-top:4px; line-height:1.4;">
                A customer reached out from the Avion contact form
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 26px; color:#111827;">
              <div style="font-size:14px; line-height:1.7;">
                <p style="margin:0 0 14px 0;">
                  A new message has been submitted through the Contact Us page.
                </p>
                <div style="background:#f8f5f2; border:1px solid #e7d9cd; border-radius:12px; padding:14px; margin:16px 0;">
                  <div style="font-size:13px; font-weight:700; color:#6f553e; margin-bottom:10px;">
                    Customer details
                  </div>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                    style="font-size:13px; color:#374151; line-height:1.7;">
                    <tr>
                      <td style="padding:4px 0; width:82px; color:#6b7280;">Name:</td>
                      <td style="padding:4px 0; font-weight:700;">${escapeHtml(name)}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0; width:82px; color:#6b7280;">Email:</td>
                      <td style="padding:4px 0; font-weight:700;">${escapeHtml(email)}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0; width:82px; color:#6b7280;">Phone:</td>
                      <td style="padding:4px 0; font-weight:700;">${escapeHtml(phone)}</td>
                    </tr>
                  </table>
                </div>
                <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:14px; margin:16px 0;">
                  <div style="font-size:13px; font-weight:700; color:#111827; margin-bottom:8px;">
                    Message
                  </div>
                  <div style="font-size:13px; line-height:1.7; color:#374151; white-space:pre-line;">
                    ${escapeHtml(message)}
                  </div>
                </div>
                <p style="margin:0; color:#374151;">
                  Reply directly to this email to continue the conversation with the customer.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#e5e7eb; border-radius:0 0 14px 14px; color:#6b7280; font-size:12px; text-align:center; padding:12px 16px; line-height:1.6;">
              © ${year} Avion. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
