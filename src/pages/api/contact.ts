import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { prenom, nom, email, telephone, projet } = data;

    // Vérification des champs requis
    if (!prenom || !nom || !email || !telephone || !projet) {
      return new Response(JSON.stringify({ success: false, message: 'Champs manquants.' }), { status: 400 });
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.GMAIL_USER,
        pass: import.meta.env.GMAIL_PASS,
      },
    });

    // Configuration de l'email
    const mailOptions = {
      from: `"Ayve - Formulaire" <${import.meta.env.GMAIL_USER}>`,
      to: import.meta.env.GMAIL_USER, // Adresse de réception
      subject: `Nouveau projet de ${prenom} ${nom}`,
      html: `
        <h2>Nouvelle demande via le site Ayve</h2>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Projet :</strong><br>${projet}</p>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('[Nodemailer] Erreur :', error);
    return new Response(JSON.stringify({ success: false, message: 'Erreur serveur.' }), { status: 500 });
  }
};
