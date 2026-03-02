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
  scrollback: 5000  // Von 500 auf 5000 erhöht!
});

// Whitelist der erlaubten Befehle
const SAFE_COMMANDS = [
  'ls', 'ls -l', 'ls -a', 'ls -la',
  'pwd', 'whoami', 'date', 'cal', 'clear',
  'echo', 'echo hello', 'echo "hello"',
  'which steam', 'flatpak list', 'lutris'
];

// ==================== MISSION SYSTEM ====================
let currentMission = 1;
let completedMissions = [];
let missionProgress = {
  1: { name: 'First Steps', commands: ['ls', 'pwd', 'whoami'], completed: [] },
  2: { name: 'Files & Folders', commands: ['ls -l', 'ls -a'], completed: [] },
  3: { name: 'Exploring', commands: ['date', 'cal', 'echo'], completed: [] },
  4: { name: 'Gaming on Linux', commands: ['which steam', 'flatpak list', 'lutris'], completed: [] }
};

// Command-History für Fortschritt
let commandHistory = [];

// Mission Chip Elements
let missionChips = {};

// Warte bis DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const terminalElement = document.getElementById('terminal');
  if (terminalElement) {
    term.open(terminalElement);
    
    term.writeln('\x1b[1;33m🔥 Welcome to Bazzite Campfire 3D!\x1b[0m');
    term.writeln('\x1b[1;32mType commands like ls, pwd, whoami, date\x1b[0m');
    term.writeln('\x1b[1;33m📌 Mission 1: Try "ls" first!\x1b[0m');
    term.write('\r\n\x1b[1;33m$\x1b[0m ');
  }
  
  // Mission Chips initialisieren
  for (let i = 1; i <= 4; i++) {
    missionChips[i] = document.getElementById(`mission${i}`);
  }
  
  // Fortschritt aus localStorage laden
  loadProgress();
  updateMissionUI();
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
  
  // Fortschritt speichern
  saveProgress();
}

function checkMissionProgress(cmd) {
  // Prüfen ob der Befehl zur aktuellen Mission gehört
  const mission = missionProgress[currentMission];
  if (!mission || completedMissions.includes(currentMission)) return;
  
  if (mission.commands.includes(cmd) && !mission.completed.includes(cmd)) {
    mission.completed.push(cmd);
    term.writeln(`\x1b[1;32m✅ Mission ${currentMission} step completed: ${cmd}\x1b[0m`);
    
    // Prüfen ob Mission komplett
    if (mission.completed.length === mission.commands.length) {
      completedMissions.push(currentMission);
      term.writeln(`\x1b[1;33m🎉 MISSION ${currentMission} COMPLETE! Great job!\x1b[0m`);
      
      // Nächste Mission
      if (currentMission < 4) {
        currentMission++;
        term.writeln(`\x1b[1;33m📌 Next: Mission ${currentMission} – ${missionProgress[currentMission].name}\x1b[0m`);
        
        // Bazzi gratuliert
        if (typeof addMessage === 'function') {
          const congrats = [
            '🎉 Super! Weiter so!',
            '🔥 Mission geschafft! Weiter zur nächsten!',
            '🌟 Du machst das großartig!',
            '💪 Stark! Nächste Mission wartet!'
          ];
          addMessage('bazzi', congrats[Math.floor(Math.random() * congrats.length)]);
        }
      } else {
        term.writeln(`\x1b[1;33m🎉🎉🎉 ALL MISSIONS COMPLETE! You're ready for Bazzite!\x1b[0m`);
        if (typeof addMessage === 'function') {
          addMessage('bazzi', '🔥 DU HAST ALLE MISSIONEN GESCHAFFT! Du bist bereit für echtes Bazzite!');
        }
      }
    }
    
    updateMissionUI();
  }
}

function updateMissionUI() {
  // Mission Chips aktualisieren
  for (let i = 1; i <= 4; i++) {
    const chip = missionChips[i];
    if (chip) {
      if (completedMissions.includes(i)) {
        chip.classList.add('completed');
        chip.classList.remove('active');
      } else if (i === currentMission && !completedMissions.includes(i)) {
        chip.classList.add('active');
        chip.classList.remove('completed');
      } else {
        chip.classList.remove('active', 'completed');
      }
    }
  }
  
  // Progress Bar
  const totalSteps = 12; // 4 Missionen * 3 Befehle
  let completedSteps = 0;
  for (let i = 1; i <= 4; i++) {
    completedSteps += missionProgress[i]?.completed.length || 0;
  }
  const percent = Math.round((completedSteps / totalSteps) * 100);
  
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  if (progressFill) progressFill.style.width = percent + '%';
  if (progressPercent) progressPercent.textContent = percent + '%';
}

function bazziTip(cmd, tip) {
  if (typeof addMessage === 'function') {
    // Bei ersten Malen Tipp geben
    const cmdCount = commandHistory.filter(c => c === cmd).length;
    if (cmdCount === 1) {
      addMessage('bazzi', tip);
    }
  }
}

// ==================== SPEICHERFUNKTIONEN ====================

function saveProgress() {
  const progress = {
    currentMission,
    completedMissions,
    missionProgress,
    commandHistory
  };
  localStorage.setItem('campfireProgress', JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem('campfireProgress');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      currentMission = data.currentMission || 1;
      completedMissions = data.completedMissions || [];
      missionProgress = data.missionProgress || missionProgress;
      commandHistory = data.commandHistory || [];
      updateMissionUI();
    } catch (e) {
      console.log('No saved progress');
    }
  }
}

function resetProgress() {
  currentMission = 1;
  completedMissions = [];
  missionProgress = {
    1: { name: 'First Steps', commands: ['ls', 'pwd', 'whoami'], completed: [] },
    2: { name: 'Files & Folders', commands: ['ls -l', 'ls -a'], completed: [] },
    3: { name: 'Exploring', commands: ['date', 'cal', 'echo'], completed: [] },
    4: { name: 'Gaming on Linux', commands: ['which steam', 'flatpak list', 'lutris'], completed: [] }
  };
  commandHistory = [];
  localStorage.removeItem('campfireProgress');
  updateMissionUI();
  
  term.clear();
  term.writeln('\x1b[1;33m🔥 Progress reset! Starting fresh.\x1b[0m');
  term.writeln('\x1b[1;33m📌 Mission 1: Try "ls" first!\x1b[0m');
  term.write('\x1b[1;33m$\x1b[0m ');
  
  if (typeof addMessage === 'function') {
    addMessage('bazzi', '🔄 Alles zurückgesetzt! Frischer Start – viel Erfolg!');
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
    setTimeout(() => addMessage('bazzi', "Ich bin hier! Frag mich zu Spotify, Discord (Fluxer!), Gaming oder Linux-Befehlen!"), 500);
  }
  
  input.value = '';
}

function addMessage(sender, text) {
  const chat = document.getElementById('chatMessages');
  if (!chat) return;
  
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
    resetProgress();
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
    resetProgress();
  });
  
  // Mission Chip Klicks
  document.getElementById('mission1')?.addEventListener('click', () => {
    if (!completedMissions.includes(1)) {
      currentMission = 1;
      updateMissionUI();
      term.writeln('\x1b[1;33m📌 Mission 1: Try "ls", "pwd", and "whoami"\x1b[0m');
      term.write('\x1b[1;33m$\x1b[0m ');
    }
  });
  
  document.getElementById('mission2')?.addEventListener('click', () => {
    if (completedMissions.includes(1) && !completedMissions.includes(2)) {
      currentMission = 2;
      updateMissionUI();
      term.writeln('\x1b[1;33m📌 Mission 2: Try "ls -l" and "ls -a"\x1b[0m');
      term.write('\x1b[1;33m$\x1b[0m ');
    } else if (!completedMissions.includes(1)) {
      addMessage('bazzi', 'Du musst erst Mission 1 abschließen!');
    }
  });
  
  document.getElementById('mission3')?.addEventListener('click', () => {
    if (completedMissions.includes(2) && !completedMissions.includes(3)) {
      currentMission = 3;
      updateMissionUI();
      term.writeln('\x1b[1;33m📌 Mission 3: Try "date", "cal", and "echo"\x1b[0m');
      term.write('\x1b[1;33m$\x1b[0m ');
    } else if (!completedMissions.includes(2)) {
      addMessage('bazzi', 'Erst Mission 2 schaffen!');
    }
  });
  
  document.getElementById('mission4')?.addEventListener('click', () => {
    if (completedMissions.includes(3) && !completedMissions.includes(4)) {
      currentMission = 4;
      updateMissionUI();
      term.writeln('\x1b[1;33m📌 Mission 4: Try "which steam", "flatpak list", "lutris"\x1b[0m');
      term.write('\x1b[1;33m$\x1b[0m ');
    } else if (!completedMissions.includes(3)) {
      addMessage('bazzi', 'Fast geschafft! Aber erst Mission 3.');
    }
  });
});
