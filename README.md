# NeoFlow Agency — Site web

Ce dépôt contient le site statique prêt à déploiement pour **NeoFlow Agency**.  
Les fichiers :

- `index.html` — page principale  
- `styles.css` — styles globaux  
- `app.js` — scripts (menu, chat, formulaire)  
- `config.example.js` — exemple de configuration pour clés  
- `assets/` — images statiques (hero background, image “À propos”, etc.)

---

## 🔧 Configuration avant déploiement

1. Copier `config.example.js` en `config.js`  
2. Remplacer les placeholders :

```js
export const CONFIG = {
  OPENROUTER_KEY: "REMPLACEZ_ICI",
  N8N_WEBHOOK: "REMPLACEZ_ICI",
  STRIPE_PUBLISHABLE: "REMPLACEZ_ICI"
};
