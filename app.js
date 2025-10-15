// app.js

// Import config (OpenRouter key, webhook) — config.js must be loaded before
// Assumption : config.js exports a global `CONFIG` object
// ex: window.CONFIG = { OPENROUTER_KEY: "...", N8N_WEBHOOK: "...", STRIPE_PUBLISHABLE: "..." };

// ========== Menu mobile toggle ==========

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const isVisible = navMenu.style.display === 'flex';
  navMenu.style.display = isVisible ? 'none' : 'flex';
});

// On resize, reset menu display
window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    navMenu.style.display = 'flex';
  } else {
    navMenu.style.display = 'none';
  }
});

// ========== Chat logic ==========

function appendClientMessage(text) {
  const chat = document.getElementById('neo-chat');
  const msg = document.createElement('div');
  msg.classList.add('msg', 'client');
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function appendAIReply(text) {
  const chat = document.getElementById('neo-chat');
  const msg = document.createElement('div');
  msg.classList.add('msg', 'ai');
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendToOpenRouter(message) {
  // HOOK : Remplacer par votre call OpenRouter
  // Exemple fetch skeleton :
  /*
  const resp = await fetch('https://api.openrouter.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.OPENROUTER_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input: message })
  });
  const data = await resp.json();
  appendAIReply(data.reply);
  */
  console.warn("sendToOpenRouter non implémenté — insérer votre call API ici");
  // pour test / stub :
  setTimeout(() => {
    appendAIReply("Réponse IA simulée pour : " + message);
  }, 800);
}

document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputEl = document.getElementById('chat-input');
  const v = inputEl.value.trim();
  if (!v) return;
  appendClientMessage(v);
  inputEl.value = '';
  await sendToOpenRouter(v);
});

// ========== Formulaire devis (N8n) ==========

async function submitToN8n(payload) {
  // HOOK : remplacer par votre webhook N8n
  /*
  await fetch(CONFIG.N8N_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  */
  console.warn("submitToN8n non implémenté — insérer votre webhook ici");
  // stub retour :
  alert("Demande envoyée (simulation) — merci !");
}

document.getElementById('lead-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    workflow_type: form.workflow_type.value,
    // hidden webhook field si besoin
    n8n_webhook: form.n8n_webhook.value
  };
  await submitToN8n(payload);
  form.reset();
  // Optionnel : afficher un message de confirmation utilisateur
});
