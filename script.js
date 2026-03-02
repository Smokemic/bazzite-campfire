    // ==================== BAZZI KNOWLEDGE BASE ====================
    const bazziKnowledge = {
      // Installation & Apps
      'spotify': "🎵 To install Spotify on Bazzite: `flatpak install com.spotify.Client` – that's it! Then find it in your apps.",
      'install spotify': "🎵 To install Spotify on Bazzite: `flatpak install com.spotify.Client` – that's it! Then find it in your apps.",
      'how do i install spotify': "🎵 To install Spotify on Bazzite: `flatpak install com.spotify.Client` – that's it! Then find it in your apps.",
      
      'discord': "💬 For Discord, you have options:\n• Vesktop (better privacy): `flatpak install dev.vencord.Vesktop`\n• Fluxer (open source alternative): Can made a guide! https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
      'discord alternative': "💬 Check out Fluxer! It's an open source Discord alternative. Can even made a bot guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
      'fluxer': "💬 Fluxer is a great Discord alternative! Can's guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
      
      'steam': "🎮 Steam comes pre-installed on Bazzite! Just log in and play. Your 5800X3D and 9070XT will love it.",
      'epic games': "🎮 For Epic Games, use Heroic Games Launcher: `flatpak install com.heroicgameslauncher.hgl`",
      'battle.net': "🎮 Battle.net? Use Lutris: `flatpak install net.lutris.Lutris` – it sets everything up for you.",
      'lutris': "🎮 Lutris is your friend for Battle.net, EA App, and more. Install: `flatpak install net.lutris.Lutris`",
      
      // Commands
      'ls': "📁 `ls` lists files in your current directory. Try it! Pro tip: `ls -l` shows details, `ls -a` shows hidden files.",
      'pwd': "📍 `pwd` = Print Working Directory. It shows where you are right now. Type it and see!",
      'whoami': "👤 `whoami` tells you which user you're logged in as. Spoiler: it's you!",
      'date': "📅 `date` shows current date and time. Useful for scripts!",
      'cal': "📆 `cal` displays a calendar. Try `cal 2026` for the whole year!",
      'echo': "📢 `echo` prints text. Example: `echo 'Hello Campfire'`",
      'cd': "📂 `cd` changes directory. `cd ..` goes up one folder, `cd ~` goes home.",
      'grep': "🔍 `grep` searches inside files. Example: `grep 'error' log.txt`",
      'clear': "🧹 `clear` cleans up your terminal. Like a fresh start.",
      'help': "❓ You're asking me! I'm always here. What do you need?",
      
      // Bazzite specific
      'bazzite': "🔥 Bazzite is an immutable Linux distro based on Fedora, perfect for gaming. It's like SteamOS for your PC!",
      'what is bazzite': "🔥 Bazzite is an immutable Linux distro based on Fedora, perfect for gaming. It's like SteamOS for your PC!",
      'bazzite gaming': "🎮 Bazzite is MADE for gaming! Steam runs great, your AMD 9070XT is perfectly supported, and tools like Heroic/Lutris handle Epic/Battle.net.",
      'is bazzite good': "🔥 Yes! Bazzite is stable, secure (immutable), and gaming-focused. No more Windows updates interrupting you.",
      
      // Windows alternatives
      'windows alternatives': "🔄 Here are your Linux alternatives:\n• Office → LibreOffice (comes with Bazzite)\n• Photoshop → GIMP or Krita\n• Discord → Fluxer or Vesktop\n• Edge → Firefox or Brave\n• Everything else? Just ask me!",
      'alternative to': "🔄 Tell me which Windows program, and I'll find a Linux alternative!",
      'photoshop': "🎨 For Photoshop, try GIMP (`flatpak install org.gimp.GIMP`) or Krita for painting.",
      'office': "📝 LibreOffice comes with Bazzite! Does everything MS Office does, and it's free.",
      
      // After installation
      'after installation': "🔥 After you install Bazzite, remember:\n• I'll be here waiting for you!\n• Can's Fluxer guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
    };

    // Chat functions
    function sendChatMessage() {
      const input = document.getElementById('chatInput');
      const question = input.value.trim().toLowerCase();
      if (!question) return;
      
      // Add user message to chat
      addMessage('user', question);
      
      // Find answer in knowledge base
      let answer = "I'm not sure about that. Try asking about Spotify, Discord, Bazzite, or Linux commands!";
      
      for (const [key, value] of Object.entries(bazziKnowledge)) {
        if (question.includes(key)) {
          answer = value;
          break;
        }
      }
      
      // Special case for greetings
      if (question.includes('hi') || question.includes('hello') || question.includes('hey')) {
        answer = "Hey there! How can I help you with Linux or Bazzite today?";
      }
      
      // Add Bazzi response
      setTimeout(() => addMessage('bazzi', answer), 500);
      
      // Clear input
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
      
      // Scroll to bottom
      chat.scrollTop = chat.scrollHeight;
    }

    function quickQuestion(question) {
      document.getElementById('chatInput').value = question;
      sendChatMessage();
    }

    // Modal functions
    window.showModal = function(type) {
      document.getElementById(`modal${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
    };

    window.closeModal = function() {
      document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    };

    // Video functions
    let currentPlaylist = [];
    let currentVideoIndex = 0;

    window.playVideo = function(videoId, title) {
      document.getElementById('youtubePlayer').src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
      document.getElementById('videoModal').classList.add('active');
      
      // Bazzi says something
      addMessage('bazzi', `🎬 Now playing: ${title}. Watch and learn!`);
    };

    window.closeVideoModal = function() {
      document.getElementById('youtubePlayer').src = '';
      document.getElementById('videoModal').classList.remove('active');
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
        playVideo(videoId, titles[videoId]);
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
        playVideo(videoId, titles[videoId]);
      } else {
        addMessage('bazzi', "That's the end of the playlist! Want to watch again?");
        closeVideoModal();
      }
    };

    // Terminal setup (simplified for demo)
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
        
        // Simple command handling
        const cmd = currentLine.trim().toLowerCase();
        
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

    // Button handlers
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
      
      // Clear chat
      document.getElementById('chatMessages').innerHTML = `
        <div class="message message-bazzi">
          <div class="message-content">
            Hey there! I'm Bazzi. Everything's reset. How can I help?
          </div>
        </div>
      `;
    });
