// ==================== TERMINAL SETUP ====================
const term = new Terminal({
  theme: {
    background: '#0A1A0E',
    foreground: '#9FE59F',
    cursor: '#FF9341',
    cursorAccent: '#FFB47B',
    selection: 'rgba(255, 147, 65, 0.3)'
  },
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  fontSize: 14,
  cursorBlink: true,
  scrollback: 500
});

// Whitelist der erlaubten Befehle
const SAFE_COMMANDS = [
  'ls', 'ls -l', 'ls -a', 'ls -la',
  'pwd', 'whoami', 'date', 'cal', 'clear',
  'echo', 'echo hello', 'echo "hello"',
  'which steam', 'flatpak list', 'lutris'
];

// Command-History für Fortschritt
let commandHistory = [];
let currentMission = 1;
let completedMissions = [];

// Warte bis DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const terminalElement = document.getElementById('terminal');
  if (terminalElement) {
    term.open(terminalElement);
    
    term.writeln('\x1b[1;33m🔥 Welcome to Bazzite Campfire 3D!\x1b[0m');
    term.writeln('\x1b[1;32mType commands like ls, pwd, whoami, date\x1b[0m');
    term.writeln('\x1b[1;33mMission 1: Try "ls" first!\x1b[0m');
    term.write('\r\n\x1b[1;33m$\x1b[0m ');
  } else {
    console.error('Terminal element not found!');
  }
});

let currentLine = '';

term.onKey((e) => {
  const char = e.key;
  const code = e.domEvent.keyCode;
  
  if (code === 13) { // Enter
    term.write('\r\n');
    
    if (currentLine.trim() === '') {
      term.write('\x1b[1;33m$\x1b[0m ');
      return;
    }
    
    const cmd = currentLine.trim().toLowerCase();
    
    // Befehl ausführen
    executeCommand(cmd);
    
    currentLine = '';
    term.write('\x1b[1;33m$\x1b[0m ');
    
  } else if (code === 8) { // Backspace
    if (currentLine.length > 0) {
      currentLine = currentLine.slice(0, -1);
      term.write('\b \b');
    }
  } else if (char.length === 1 && !e.domEvent.ctrlKey && !e.domEvent.altKey && !e.domEvent.metaKey) {
    currentLine += char;
    term.write(char);
  }
});

function executeCommand(cmd) {
  // Command speichern
  commandHistory.push(cmd);
  
  // Prüfen ob Befehl erlaubt ist
  if (!SAFE_COMMANDS.includes(cmd) && !cmd.startsWith('echo ')) {
    term.writeln(`\x1b[1;31m⛔ Command not available in demo mode.\x1b[0m`);
    term.writeln(`\x1b[1;33mTry: ls, pwd, whoami, date, cal, clear, echo "hello"\x1b[0m`);
    return;
  }
  
  // Befehle ausführen
  if (cmd === 'ls') {
    term.writeln('Documents/  Pictures/  Music/  Videos/  README.txt  campfire/');
    checkMissionProgress('ls');
    bazziTip('ls', '📁 `ls` zeigt alle Dateien im aktuellen Ordner. Probier auch `ls -l` für Details!');
  }
  else if (cmd === 'ls -l') {
    term.writeln('drwxr-xr-x 2 camper campfire 4096 Mar 2 12:34 Documents/');
    term.writeln('drwxr-xr-x 2 camper campfire 4096 Mar 2 12:34 Pictures/');
    term.writeln('drwxr-xr-x 2 camper campfire 4096 Mar 2 12:34 Music/');
    term.writeln('drwxr-xr-x 2 camper campfire 4096 Mar 2 12:34 Videos/');
    term.writeln('-rw-r--r-- 1 camper campfire  123 Mar 2 12:34 README.txt');
    checkMissionProgress('ls -l');
    bazziTip('ls -l', '📋 Mit `ls -l` siehst du Details: Rechte, Besitzer, Größe, Datum.');
  }
  else if (cmd === 'ls -a') {
    term.writeln('./  ../  .hidden/  Documents/  Pictures/  Music/  Videos/  README.txt');
    checkMissionProgress('ls -a');
    bazziTip('ls -a', '🔍 `ls -a` zeigt versteckte Dateien (mit Punkt am Anfang).');
  }
  else if (cmd === 'pwd') {
    term.writeln('/home/camper/campfire');
    checkMissionProgress('pwd');
    bazziTip('pwd', '📍 `pwd` = Print Working Directory – zeigt wo du bist.');
  }
  else if (cmd === 'whoami') {
    term.writeln('campfire-camper');
    checkMissionProgress('whoami');
    bazziTip('whoami', '👤 `whoami` zeigt deinen Benutzernamen.');
  }
  else if (cmd === 'date') {
    term.writeln(new Date().toString());
    checkMissionProgress('date');
    bazziTip('date', '📅 `date` zeigt Datum & Uhrzeit.');
  }
  else if (cmd === 'cal') {
    const now = new Date();
    term.writeln(`   ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`);
    term.writeln('Su Mo Tu We Th Fr Sa');
    term.writeln(' 1  2  3  4  5  6  7');
    term.writeln(' 8  9 10 11 12 13 14');
    term.writeln('15 16 17 18 19 20 21');
    term.writeln('22 23 24 25 26 27 28');
    term.writeln('29 30 31');
    checkMissionProgress('cal');
    bazziTip('cal', '📆 `cal` zeigt den Kalender. Probier `cal 2026` fürs ganze Jahr!');
  }
  else if (cmd === 'clear') {
    term.clear();
  }
  else if (cmd.startsWith('echo ')) {
    const text = cmd.substring(5);
    term.writeln(text.replace(/"/g, ''));
    checkMissionProgress('echo');
    bazziTip('echo', '📢 `echo` gibt Text aus. Nützlich für Scripts!');
  }
  else if (cmd === 'which steam') {
    term.writeln('/usr/bin/steam');
    checkMissionProgress('which steam');
    bazziTip('steam', '🎮 Steam ist vorinstalliert! Einfach anmelden.');
  }
  else if (cmd === 'flatpak list') {
    term.writeln('com.spotify.Client\t\tSpotify');
    term.writeln('org.mozilla.firefox\t\tFirefox');
    term.writeln('com.discordapp.Discord\t\tDiscord');
    term.writeln('com.heroicgameslauncher.hgl\tHeroic');
    checkMissionProgress('flatpak list');
    bazziTip('flatpak', '📦 Flatpak = App Store. Installier Apps mit `flatpak install ...`');
  }
  else if (cmd === 'lutris') {
    term.writeln('Lutris 0.5.13');
    term.writeln('Available: Epic Games Store, GOG, Battle.net, Amazon Games');
    checkMissionProgress('lutris');
    bazziTip('lutris', '🎮 Lutris installiert dir Battle.net, Epic & Co mit einem Klick!');
  }
  else {
    term.writeln(`\x1b[1;31mCommand not recognized.\x1b[0m`);
  }
}

function checkMissionProgress(cmd) {
  // Mission 1: ls, pwd, whoami
  if (currentMission === 1) {
    if (cmd === 'ls' || cmd === 'pwd' || cmd === 'whoami') {
      term.writeln(`\x1b[1;32m✅ Mission 1 step completed: ${cmd}\x1b[0m`);
    }
    if (commandHistory.includes('ls') && commandHistory.includes('pwd') && commandHistory.includes('whoami')) {
      term.writeln(`\x1b[1;33m🎉 MISSION 1 COMPLETE! Great job!\x1b[0m`);
      term.writeln(`\x1b[1;33m➡️ Next: Mission 2 – Files & Folders (try 'ls -l')\x1b[0m`);
      currentMission = 2;
      if (typeof addMessage === 'function') {
        addMessage('bazzi', '🎉 Mission 1 geschafft! Weiter so! Jetzt kommen die Details mit `ls -l`.');
      }
    }
  }
  // Mission 2: ls -l, ls -a
  else if (currentMission === 2) {
    if (cmd === 'ls -l' || cmd === 'ls -a') {
      term.writeln(`\x1b[1;32m✅ Mission 2 step completed: ${cmd}\x1b[0m`);
    }
    if (commandHistory.includes('ls -l') && commandHistory.includes('ls -a')) {
      term.writeln(`\x1b[1;33m🎉 MISSION 2 COMPLETE! You're on fire!\x1b[0m`);
      term.writeln(`\x1b[1;33m➡️ Next: Mission 3 – Exploring (try 'date' or 'cal')\x1b[0m`);
      currentMission = 3;
      if (typeof addMessage === 'function') {
        addMessage('bazzi', '🎉 Mission 2 geschafft! Jetzt wird erkundet!');
      }
    }
  }
  // Mission 3: date, cal, echo
  else if (currentMission === 3) {
    if (cmd === 'date' || cmd === 'cal' || cmd === 'echo') {
      term.writeln(`\x1b[1;32m✅ Mission 3 step completed: ${cmd}\x1b[0m`);
    }
    if (commandHistory.includes('date') && commandHistory.includes('cal') && commandHistory.includes('echo')) {
      term.writeln(`\x1b[1;33m🎉 MISSION 3 COMPLETE! Almost there!\x1b[0m`);
      term.writeln(`\x1b[1;33m➡️ Final Mission: Gaming on Linux (try 'which steam')\x1b[0m`);
      currentMission = 4;
      if (typeof addMessage === 'function') {
        addMessage('bazzi', '🎉 Mission 3 geschafft! Jetzt wird's gaming!');
      }
    }
  }
  // Mission 4: which steam, flatpak list, lutris
  else if (currentMission === 4) {
    if (cmd === 'which steam' || cmd === 'flatpak list' || cmd === 'lutris') {
      term.writeln(`\x1b[1;32m✅ Mission 4 step completed: ${cmd}\x1b[0m`);
    }
    if (commandHistory.includes('which steam') && commandHistory.includes('flatpak list') && commandHistory.includes('lutris')) {
      term.writeln(`\x1b[1;33m🎉🎉🎉 ALL MISSIONS COMPLETE! You're ready for Bazzite!\x1b[0m`);
      if (typeof addMessage === 'function') {
        addMessage('bazzi', '🔥 DU HAST ALLE MISSIONEN GESCHAFFT! Du bist bereit für echtes Bazzite!');
      }
    }
  }
}

function bazziTip(cmd, tip) {
  if (typeof addMessage === 'function') {
    // Nur manchmal Tipps geben (nicht bei jedem Befehl)
    if (Math.random() > 0.7) {
      addMessage('bazzi', tip);
    }
  }
}

// ==================== CHAT FUNKTIONEN ====================

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const question = input.value.trim();
  if (!question) return;
  
  addMessage('user', question);
  
  // Bazzi antwortet (aus bazzi-personality.js)
  if (typeof getBazziResponse === 'function') {
    const answer = getBazziResponse(question);
    setTimeout(() => addMessage('bazzi', answer), 500);
  } else {
    setTimeout(() => addMessage('bazzi', "Ich bin hier! Aber meine Persönlichkeit lädt noch..."), 500);
  }
  
  input.value = '';
}

function addMessage(sender, text) {
  const chat = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${sender}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;
  
  messageDiv.appendChild(contentDiv);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

function quickQuestion(question) {
  document.getElementById('chatInput').value = question;
  sendChatMessage();
}

// ==================== MODAL FUNKTIONEN ====================

window.showModal = function(type) {
  const modal = document.getElementById(`modal${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (modal) modal.classList.add('active');
};

window.closeModal = function() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
};

// ==================== VIDEO FUNKTIONEN ====================

let currentPlaylist = [];
let currentVideoIndex = 0;

window.playVideo = function(videoId, title) {
  const player = document.getElementById('youtubePlayer');
  const modal = document.getElementById('videoModal');
  
  if (player && modal) {
    player.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
    modal.classList.add('active');
    addMessage('bazzi', `🎬 Now playing: ${title}. Watch and learn!`);
  }
};

window.closeVideoModal = function() {
  const player = document.getElementById('youtubePlayer');
  const modal = document.getElementById('videoModal');
  if (player) player.src = '';
  if (modal) modal.classList.remove('active');
};

window.playPlaylist = function(type) {
  if (type === 'mission1') {
    currentPlaylist = ['d6rMOZwB9QI', 'fVnR5RQMNkM', 'j6vKLJxAKfw'];
  } else if (type === 'mission2') {
    currentPlaylist = ['4jvzHc2zRqI', 'vQBe47p2AzQ', 'cBkKfdxEw6o'];
  } else if (type === 'gaming') {
    currentPlaylist = ['ROjZy1TRmzM', 'VGgTmxXp7xQ', 'OVLuT1nWf5g'];
  }
  
  currentVideoIndex = 0;
  if (currentPlaylist.length > 0) {
    const videoId = currentPlaylist[0];
    const titles = {
      'd6rMOZwB9QI': 'ls – List files',
      'fVnR5RQMNkM': 'pwd – Where am I?',
      'j6vKLJxAKfw': 'whoami – Who are you?',
      '4jvzHc2zRqI': 'ls -l – Details view',
      'vQBe47p2AzQ': 'ls -a – Hidden files',
      'cBkKfdxEw6o': 'cd – Navigation',
      'ROjZy1TRmzM': 'Linux for beginners',
      'VGgTmxXp7xQ': 'grep – Search like a pro',
      'OVLuT1nWf5g': 'Bazzite overview'
    };
    window.playVideo(videoId, titles[videoId]);
  }
};

window.playNextVideo = function() {
  if (currentPlaylist.length > 0 && currentVideoIndex < currentPlaylist.length - 1) {
    currentVideoIndex++;
    const videoId = currentPlaylist[currentVideoIndex];
    const titles = {
      'd6rMOZwB9QI': 'ls – List files',
      'fVnR5RQMNkM': 'pwd – Where am I?',
      'j6vKLJxAKfw': 'whoami – Who are you?',
      '4jvzHc2zRqI': 'ls -l – Details view',
      'vQBe47p2AzQ': 'ls -a – Hidden files',
      'cBkKfdxEw6o': 'cd – Navigation',
      'ROjZy1TRmzM': 'Linux for beginners',
      'VGgTmxXp7xQ': 'grep – Search like a pro',
      'OVLuT1nWf5g': 'Bazzite overview'
    };
    window.playVideo(videoId, titles[videoId]);
  } else {
    addMessage('bazzi', "That's the end of the playlist! Want to watch again?");
    window.closeVideoModal();
  }
};

// ==================== BUTTON HANDLER ====================

document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('resetSession')?.addEventListener('click', () => {
    term.clear();
    term.writeln('\x1b[1;33m🔥 Fresh start! Ready to learn?\x1b[0m');
    term.writeln('\x1b[1;33mMission 1: Try "ls" first!\x1b[0m');
    term.write('\x1b[1;33m$\x1b[0m ');
    currentLine = '';
    commandHistory = [];
    currentMission = 1;
    addMessage('bazzi', "Fresh campfire! What would you like to learn today?");
  });

  document.getElementById('showCommands')?.addEventListener('click', () => {
    term.writeln('\r\n\x1b[1;33m🔥 Available commands:\x1b[0m');
    term.writeln('ls, ls -l, ls -a, pwd, whoami, date, cal, clear');
    term.writeln('echo "text", which steam, flatpak list, lutris');
    term.write('\x1b[1;33m$\x1b[0m ');
  });

  document.getElementById('bazziteFacts')?.addEventListener('click', () => {
    const facts = [
      "🔥 Bazzite is immutable – you can't break it!",
      "🎮 Bazzite is perfect for gaming on AMD hardware",
      "⏰ No more forced Windows updates!",
      "💚 Open source and community driven",
      "🚀 Games often run faster than on Windows"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    addMessage('bazzi', fact);
  });

  document.getElementById('emergencyReset')?.addEventListener('click', () => {
    term.clear();
    term.writeln('\x1b[1;31m🚨 Emergency reset\x1b[0m');
    term.writeln('\x1b[1;33m🔥 Welcome back to Bazzite Campfire\x1b[0m');
    term.writeln('\x1b[1;33mMission 1: Try "ls" first!\x1b[0m');
    term.write('\x1b[1;33m$\x1b[0m ');
    currentLine = '';
    commandHistory = [];
    currentMission = 1;
    
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.innerHTML = `
        <div class="message message-bazzi">
          <div class="message-content">
            Hey there! I'm Bazzi. Everything's reset. How can I help?
          </div>
        </div>
      `;
    }
  });
  
});
