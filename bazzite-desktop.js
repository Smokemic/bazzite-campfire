// Bazzite Desktop Simulation
const desktopApps = {
  steam: {
    icon: '🎮',
    name: 'Steam',
    window: 'Steam ist vorinstalliert! Einfach anmelden und loslegen.\n\nDeine Bibliothek:\n• Cyberpunk 2077\n• Baldur\'s Gate 3\n• Dota 2\n• Counter-Strike 2'
  },
  discord: {
    icon: '💬',
    name: 'Discord',
    window: 'Discord läuft. Aber Fluxer ist die bessere Wahl!\n\n👉 https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide\n\nWarum Fluxer?\n• Open Source\n• Datenschutzfreundlich\n• Aktiv entwickelt'
  },
  files: {
    icon: '📁',
    name: 'Dateien',
    window: '📁 Dokumente\n   └── Briefe\n   └── Notizen\n📁 Bilder\n   └── Urlaub\n   └── Screenshots\n📁 Musik\n📁 Videos\n📁 Downloads'
  },
  terminal: {
    icon: '🖥️',
    name: 'Terminal',
    window: 'Das echte Terminal – genau wie im Campfire!\n\nProbier diese Befehle:\n• ls – Dateien anzeigen\n• pwd – Wo bin ich?\n• whoami – Wer bin ich?\n• date – Datum & Uhrzeit\n• cal – Kalender'
  },
  store: {
    icon: '📦',
    name: 'App Store',
    window: 'Flatpak – tausende Apps mit einem Klick:\n\nBeliebt:\n• Spotify (Musik)\n• Firefox (Browser)\n• GIMP (Bildbearbeitung)\n• VS Code (Programmieren)\n• OBS (Streaming)\n• Telegram (Messenger)'
  },
  settings: {
    icon: '⚙️',
    name: 'Einstellungen',
    window: '🔊 Sound – Lautstärke, Eingabegeräte\n🖥️ Display – Auflösung, Helligkeit\n🌐 Netzwerk – WLAN, VPN\n🎮 Gaming – Performance, MangoHud\n🔄 Updates – Systemaktualisierungen\n👤 Benutzer – Accounts, Passwörter'
  }
};

let activeWindow = null;

window.openDesktopApp = function(appId) {
  const app = desktopApps[appId];
  if (!app) return;
  
  // Aktives Fenster aktualisieren
  activeWindow = appId;
  const windowEl = document.getElementById('window-content');
  if (windowEl) {
    windowEl.innerHTML = `<div style="white-space: pre-line;">${app.window}</div>`;
  }
  
  // Optional: Bazzi Kommentar (nur wenn nicht schon offen)
  if (typeof addMessage === 'function' && activeWindow !== appId) {
    addMessage('bazzi', `🖥️ ${app.name} geöffnet. ${app.window.split('\n')[0]}`);
  }
};

// Automatisch beim Laden ein Standard-Fenster öffnen
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!activeWindow) {
      const windowEl = document.getElementById('window-content');
      if (windowEl) {
        windowEl.innerHTML = '<div style="white-space: pre-line;">Willkommen auf dem Bazzite Desktop! Klick ein Icon, um mehr zu erfahren.</div>';
      }
    }
  }, 1000);
});
