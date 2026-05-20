export const welcomeTemplate = (name: string) => {
  const year = new Date().getFullYear();
  const nameLine = name ? `Hello, <b>${escapeHtml(name)}</b>!` : 'Hello!';

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:#ffffff; padding:24px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="width:600px; max-width:600px; background:#FCFCFC; border-radius:14px; overflow:hidden; box-shadow:0 10px 22px rgba(148,116,88,0.24);">
          <tr>
            <td style="background:#947458; color:#ffffff; text-align:center; padding:16px 18px;">
              <div style="font-size:18px; font-weight:800; letter-spacing:0.2px;">
                Welcome to Avion 🎉
              </div>
              <div style="font-size:13px; opacity:0.95; margin-top:4px; line-height:1.4;">
                Your account has been created successfully
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 26px; color:#111827;">
              <div style="font-size:14px; line-height:1.7;">
                <p style="margin:0 0 14px 0;">${nameLine}</p>
                <p style="margin:0 0 14px 0;">
                  Thanks for signing up. You can now explore products, create orders, and manage your profile.
                </p>
                <div style="background:#f8f5f2; border:1px solid #e7d9cd; border-radius:12px; padding:14px; margin:16px 0;">
                  <div style="font-size:13px; font-weight:700; color:#947458; margin-bottom:8px;">
                    Getting started:
                  </div>
                  <ul style="margin:0; padding-left:18px; color:#374151; font-size:13px; line-height:1.7;">
                    <li>Browse the catalog and find your perfect furniture.</li>
                    <li>Add items to your order and checkout.</li>
                    <li>Keep an eye on your order status in your profile.</li>
                  </ul>
                </div>
                <p style="margin:0; color:#374151;">
                  We’re happy to have you with us.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#e5e7eb; border-radius: 0px 0px 14px 14px; color:#6b7280; font-size:12px; text-align:center; padding:12px 16px; line-height:1.6;">
              © ${year} Avion. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
