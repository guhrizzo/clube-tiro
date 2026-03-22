// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nome, email, telefone, plano, mensagem, targetDept, targetEmail } = await req.json();

    const { error } = await resend.emails.send({
      from: "Site Protect <email@clube.gustavorizzo.net.br>", // domínio verificado no Resend
      to: [targetEmail],
      replyTo: email,
      subject: `[${targetDept}] Novo contato via site – ${nome}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head><meta charset="UTF-8" /></head>
          <body style="font-family:sans-serif;background:#f8fafc;padding:32px">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px #0001">

              <!-- Header -->
              <div style="background:#ffb703;padding:24px 32px">
                <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#000;opacity:.6">
                  Grupo Protect
                </p>
                <h1 style="margin:4px 0 0;font-size:22px;font-weight:900;color:#000">
                  Novo contato — ${targetDept}
                </h1>
              </div>

              <!-- Body -->
              <div style="padding:32px">
                <table style="width:100%;border-collapse:collapse">
                  ${row("Nome", nome)}
                  ${row("E-mail", `<a href="mailto:${email}" style="color:#ffb703">${email}</a>`)}
                  ${row("Telefone", telefone)}
                  ${row("Tipo de plano", plano)}
                </table>

                <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:10px;border-left:4px solid #ffb703">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#94a3b8">
                    Mensagem
                  </p>
                  <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6">
                    ${mensagem.replace(/\n/g, "<br/>")}
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="padding:16px 32px;background:#f1f5f9;text-align:center">
                <p style="margin:0;font-size:11px;color:#94a3b8">
                  Enviado automaticamente pelo site do Grupo Protect
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* util */
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 0;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;width:120px;vertical-align:top">
        ${label}
      </td>
      <td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b">
        ${value}
      </td>
    </tr>
  `;
}