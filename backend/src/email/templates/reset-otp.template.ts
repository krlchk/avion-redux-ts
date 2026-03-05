export function resetOtpTemplate(otp: string) {
  const year = new Date().getFullYear();

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:#ffffff; padding:24px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="width:600px; max-width:600px; background:#FCFCFC; border-radius:14px; overflow:hidden; box-shadow:0 10px 22px rgba(59,130,246,0.22);">
          <tr>
            <td style="background:#60a5fa; color:#ffffff; text-align:center; padding:16px 18px;">
              <div style="font-size:18px; font-weight:800; letter-spacing:0.2px;">
                Your OTP Code
              </div>
              <div style="font-size:13px; opacity:0.95; margin-top:4px; line-height:1.4;">
                Use this code to reset your password
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 26px; color:#111827;">
              <div style="font-size:14px; line-height:1.7;">
                <p style="margin:0 0 14px 0;">Hello,</p>
                <p style="margin:0 0 14px 0;">
                  Your one-time password (OTP) for password reset is:
                </p>
                <div style="margin:16px 0 10px 0;">
                  <div style="
                    background:#f3f4f6;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:14px 16px;
                    text-align:center;">
                    <div style="
                      font-size:24px;
                      font-weight:900;
                      letter-spacing:6px;
                      color:#1d4ed8;
                      line-height:1;">
                      ${otp}
                    </div>
                    <div style="margin-top:8px; font-size:12px; color:#6b7280;">
                      Expires in 10 minutes
                    </div>
                  </div>
                </div>
                <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; padding:12px 14px; margin:16px 0;">
                  <div style="font-size:13px; line-height:1.6; color:#1e3a8a;">
                    Please do not share this code with anyone.
                  </div>
                </div>
                <p style="margin:0; color:#374151;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#e5e7eb; border-radius: 0px 0px 14px 14px;  color:#6b7280; font-size:12px; text-align:center; padding:12px 16px; line-height:1.6;">
              © ${year} Avion. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}
