// Bazzite Desktop Simulation
const desktopApps = {
  steam: {
    icon: '🎮',
    name: 'Steam',
    window: 'Steam ist vorinstalliert! Einfach anmelden und loslegen.\n\nDeine Bibliothek:\n• Cyberpunk 2077\n• Baldur\'s Gate 3\n• Dota 2'
  },
  discord: {
    icon: '💬',
    name: 'Discord',
    window: 'Discord läuft. Aber Fluxer ist die bessere Wahl!\n\n👉 https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide'
  },
  files: {
    icon: '📁',
    name: 'Dateien',
    window: '📁 Dokumente\n📁 Bilder\n📁 Musik\n📁 Videos\n📁 Downloads'
  },
  terminal: {
    icon: '🖥️',
    name: 'Terminal',
    window: 'Das echte Terminal – genau wie im Campfire!\n\nProbier: ls, pwd, whoami, date'
  },
  store: {
    icon: '📦',
    name: 'App Store',
    window: 'Flatpak – tausende Apps:\n• Spotify\n• Firefox\n• GIMP\n• VS Code\n• OBS'
  },
  settings: {
    icon: '⚙️',
    name: 'Einstellungen',
    window: '🔊 Sound\n🖥️ Display\n🌐 Netzwerk\n🎮 Gaming\n🔄 Updates'
  }
};

let activeWindow = null;

window.openDesktopApp = function(appId) {
  const app = desktopApps[appId];
  if (!app) return;
  
  // Aktives Fenster aktualisieren
  activeWindow = appId;
  const windowEl = document.getElementById('desktop-window');
  if (windowEl) {
    windowEl.innerHTML = `<div style="white-space: pre-line;">${app.window}</div>`;
  }
  
  // Zusätzlich als Nachricht (optional)
  addMessage('bazzi', `🖥️ ${app.name}: ${app.window.split('\n')[0]}`);
};
