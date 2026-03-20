// app/api/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nome, email, telefone, plano, mensagem, targetDept, targetEmail } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Site Grupo Protect <contato@grupoprotect.com.br>", // deve ser um domínio verificado no Resend
      to: [targetEmail],
      replyTo: email,
      subject: `Novo contato via site – ${targetDept}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 16px;">
          <div style="background: #ffb703; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #000; text-transform: uppercase; letter-spacing: 0.05em;">
              Novo contato — ${targetDept}
            </h1>
          </div>

          <div style="background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Nome</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Telefone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${telefone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Plano</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${plano}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Mensagem</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px; line-height: 1.6;">${mensagem.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
          </div>

          <p style="margin-top: 20px; font-size: 11px; color: #94a3b8; text-align: center;">
            Enviado via site Grupo Protect · Departamento: ${targetDept}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}