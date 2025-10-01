import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('[Contact API] Début de la requête');
    
    const data = await request.json();
    console.log('[Contact API] Données reçues:', data);

    const { prenom, nom, email, telephone, projet } = data;

    // Vérification des champs requis
    if (!prenom || !nom || !email || !telephone || !projet) {
      console.log('[Contact API] Champs manquants');
      return new Response(JSON.stringify({ success: false, message: 'Champs manquants.' }), { status: 400 });
    }

    // Vérification de la clé API Resend
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('[Contact API] Clé API Resend manquante');
      return new Response(JSON.stringify({ success: false, message: 'Configuration email manquante.' }), { status: 500 });
    }

    console.log('[Contact API] Initialisation de Resend...');
    
    // Initialisation de Resend
    const resend = new Resend(resendApiKey);

    console.log('[Contact API] Envoi de l\'email...');
    
    // Envoi de l'email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Ayve Contact <contact@ayve.fr>', // Adresse par défaut de Resend
      to: ['contact@ayve.fr'], // Votre adresse email
      subject: `Nouveau projet de ${prenom} ${nom}`,
      html: `
        <h2>Nouvelle demande via le site Ayve</h2>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Projet :</strong></p>
        <p>${projet.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Email envoyé depuis le formulaire de contact du site Ayve</small></p>
      `,
    });

    if (error) {
      console.error('[Contact API] Erreur Resend:', error);
      return new Response(JSON.stringify({ success: false, message: 'Erreur lors de l\'envoi de l\'email.' }), { status: 500 });
    }

    console.log('[Contact API] Email envoyé avec succès:', emailData?.id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('[Contact API] Erreur complète:', error);
    console.error('[Contact API] Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace');
    
    let errorMessage = 'Erreur serveur.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return new Response(JSON.stringify({ success: false, message: errorMessage }), { status: 500 });
  }
};
