// Bazzite Desktop Demo - Simuliert einen echten Desktop
const bazziteDesktop = {
  apps: {
    steam: { icon: '🎮', name: 'Steam', desc: 'Steam ist vorinstalliert! Einfach anmelden und loslegen.' },
    discord: { icon: '💬', name: 'Discord', desc: 'Discord läuft. Aber Fluxer ist die coolere Alternative!' },
    files: { icon: '📁', name: 'Dateien', desc: 'Deine Dateien – genau wie unter Windows, nur besser.' },
    terminal: { icon: '🖥️', name: 'Terminal', desc: 'Hier lernst du ja schon die Befehle!' },
    store: { icon: '📦', name: 'App Store', desc: 'Flatpak = tausende Apps mit einem Klick.' },
    settings: { icon: '⚙️', name: 'Einstellungen', desc: 'Alles einstellbar. Keine versteckten Optionen.' }
  }
};

window.bazziExplain = function(app) {
  const desc = bazziteDesktop.apps[app]?.desc || '🔥 Läuft auf Bazzite!';
  addMessage('bazzi', desc);
};
