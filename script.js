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

term.open(document.getElementById('terminal'));

term.writeln('\x1b[1;33m🔥 Welcome to Bazzite Campfire 3D!\x1b[0m');
term.writeln('\x1b[1;32mType commands like ls, pwd, whoami, date\x1b[0m');
term.write('\r\n\x1b[1;33m$\x1b[0m ');

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
    
    // Simple command handling
    if (cmd === 'ls') {
      term.writeln('Documents/  Pictures/  Music/  Videos/  README.txt');
    } else if (cmd === 'pwd') {
      term.writeln('/home/camper/campfire');
    } else if (cmd === 'whoami') {
      term.writeln('campfire-camper');
    } else if (cmd === 'date') {
      term.writeln(new Date().toString());
    } else if (cmd === 'cal') {
      term.writeln('   March 2026');
      term.writeln('Su Mo Tu We Th Fr Sa');
      term.writeln(' 1  2  3  4  5  6  7');
      term.writeln(' 8  9 10 11 12 13 14');
      term.writeln('15 16 17 18 19 20 21');
      term.writeln('22 23 24 25 26 27 28');
      term.writeln('29 30 31');
    } else if (cmd === 'clear') {
      term.clear();
    } else {
      term.writeln(`\x1b[1;31mCommand not available in demo mode.\x1b[0m`);
    }
    
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

// ==================== CHAT FUNKTIONEN ====================

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const question = input.value.trim();
  if (!question) return;
  
  addMessage('user', question);
  
  // Bazzi antwortet (aus bazzi-personality.js)
  const answer = getBazziResponse(question);
  
  setTimeout(() => addMessage('bazzi', answer), 500);
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

function showModal(type) {
  document.getElementById(`modal${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ==================== VIDEO FUNKTIONEN ====================

let currentPlaylist = [];
let currentVideoIndex = 0;

function playVideo(videoId, title) {
  document.getElementById('youtubePlayer').src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
  document.getElementById('videoModal').classList.add('active');
  addMessage('bazzi', `🎬 Now playing: ${title}. Watch and learn!`);
}

function closeVideoModal() {
  document.getElementById('youtubePlayer').src = '';
  document.getElementById('videoModal').classList.remove('active');
}

function playPlaylist(type) {
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
    playVideo(videoId, titles[videoId]);
  }
}

function playNextVideo() {
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
    playVideo(videoId, titles[videoId]);
  } else {
    addMessage('bazzi', "That's the end of the playlist! Want to watch again?");
    closeVideoModal();
  }
}

// ==================== BUTTON HANDLER ====================

document.getElementById('resetSession').addEventListener('click', () => {
  term.clear();
  term.writeln('\x1b[1;33m🔥 Fresh start! Ready to learn?\x1b[0m');
  term.write('\x1b[1;33m$\x1b[0m ');
  currentLine = '';
  addMessage('bazzi', "Fresh campfire! What would you like to learn today?");
});

document.getElementById('showCommands').addEventListener('click', () => {
  term.writeln('\r\n\x1b[1;33m🔥 Available commands:\x1b[0m');
  term.writeln('ls, pwd, whoami, date, cal, clear');
  term.write('\x1b[1;33m$\x1b[0m ');
});

document.getElementById('bazziteFacts').addEventListener('click', () => {
  const facts = [
    "🔥 Bazzite is immutable – you can't break it!",
    "🎮 Your 9070XT is perfectly supported on Bazzite",
    "⏰ No more forced Windows updates!",
    "💚 Open source and community driven",
    "🚀 Games often run faster than on Windows"
  ];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  addMessage('bazzi', fact);
});

document.getElementById('emergencyReset').addEventListener('click', () => {
  term.clear();
  term.writeln('\x1b[1;31m🚨 Emergency reset\x1b[0m');
  term.writeln('\x1b[1;33m🔥 Welcome back to Bazzite Campfire\x1b[0m');
  term.write('\x1b[1;33m$\x1b[0m ');
  currentLine = '';
  
  document.getElementById('chatMessages').innerHTML = `
    <div class="message message-bazzi">
      <div class="message-content">
        Hey there! I'm Bazzi. Everything's reset. How can I help?
      </div>
    </div>
  `;
});
