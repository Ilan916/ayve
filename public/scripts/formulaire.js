document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const msg = document.getElementById("form-message");

  // Gestion de la modale
  const ctaButton = document.getElementById("cta-button");
  const modal = document.getElementById("newsletter-modal");
  const closeModal = document.getElementById("close-modal");

  // Open modal when CTA button is clicked
  if (ctaButton && modal) {
    ctaButton.addEventListener("click", () => {
      modal.classList.remove("opacity-0", "pointer-events-none");
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
      }
    });
  }

  // Close modal when close button is clicked
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      closeModal.blur();
      modal.classList.add("opacity-0", "pointer-events-none");
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
      }
    });
  }

  // Close modal when clicking outside modal content
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("opacity-0", "pointer-events-none");
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
          modalContent.classList.remove("scale-100");
          modalContent.classList.add("scale-95");
        }
      }
    });
  }

  // Gestion de la soumission du formulaire
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        prenom: document.getElementById("prenom")?.value || "",
        nom: document.getElementById("nom")?.value || "",
        telephone: document.getElementById("telephone")?.value || "",
        email: document.getElementById("email")?.value || "",
        projet: document.getElementById("projet")?.value || "",
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (msg) {
          if (result.success) {
            msg.textContent = "Votre message a bien été envoyé !";
            msg.className = "form-message success";
            form.reset();

            // Fermer la modale après un court délai
            setTimeout(() => {
              modal.classList.add("opacity-0", "pointer-events-none");
              const modalContent = modal.querySelector(".modal-content");
              if (modalContent) {
                modalContent.classList.remove("scale-100");
                modalContent.classList.add("scale-95");
              }
            }, 2000); // 2 secondes avant de fermer la modale
          } else {
            msg.textContent = "Une erreur s’est produite.";
            msg.className = "form-message error";
          }
        }
      } catch (error) {
        console.error(error);
        if (msg) {
          msg.textContent = "Une erreur inattendue s’est produite.";
          msg.className = "form-message error";
        }
      }
    });
  }
});
