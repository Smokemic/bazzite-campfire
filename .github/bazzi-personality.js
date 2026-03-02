// ==================== BAZZI PERSÖNLICHKEIT ====================
// Bazzi – dein warmer, hilfsbereiter Begleiter am Lagerfeuer
// Immer freundlich, immer ehrlich, immer für dich da 💚

// ==================== WISSENSDATENBANK ====================
const bazziKnowledge = {
  // === INSTALLATION & APPS ===
  'spotify': "🎵 Spotify installierst du mit `flatpak install com.spotify.Client`. Einfach den Befehl ausführen und schon ist es da. Läuft dann wie unter Windows!",
  
  'discord': "💬 Für Discord gibt's eine richtig gute Alternative: **Fluxer!** Open Source, datenschutzfreundlich und aktiv entwickelt. Can hat einen kompletten Guide dazu gebaut: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide\n\nWenn du lieber bei Discord bleiben willst, gibt's Vesktop: `flatpak install dev.vencord.Vesktop` – mehr Privatsphäre, gleiche App.",
  
  'discord alternative': "💬 Die beste Discord-Alternative ist **Fluxer**! Open Source, ähnlich wie Discord, aber ohne den Vendor-Lock-In. Can's Guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
  
  'fluxer': "💬 **Fluxer** ist eine richtig gute Discord-Alternative! Open Source, aktiv entwickelt und perfekt für alle, die mehr Kontrolle wollen. Can hat sogar einen Bot-Guide gemacht: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
  
  'alternative zu discord': "💬 **Fluxer**! Definitiv. Open Source, ähnlich wie Discord, und läuft super. Hier ist der Guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide",
  
  'steam': "🎮 Steam kommt mit Bazzite vorinstalliert! Einfach anmelden und loslegen. Deine Spielebibliothek wartet schon.",
  
  'epic games': "🎮 Für Epic Games gibt's den Heroic Games Launcher: `flatpak install com.heroicgameslauncher.hgl` – damit hast du Epic, GOG und mehr an einem Ort.",
  
  'battle.net': "🎮 Battle.net? Kein Problem mit Lutris: `flatpak install net.lutris.Lutris` – das richtet alles für dich ein.",
  
  'lutris': "🎮 Lutris ist dein Freund für Battle.net, EA App und mehr. Installier es mit `flatpak install net.lutris.Lutris`.",
  
  // === LINUX-BEFEHLE ===
  'ls': "📁 `ls` – der Klassiker! Zeigt dir alle Dateien und Ordner im aktuellen Verzeichnis. Probier's aus! Tipp: `ls -l` für Details, `ls -a` für versteckte Dateien.",
  
  'pwd': "📍 `pwd` = Print Working Directory. Zeigt dir genau, wo du gerade bist – wie 'Wo bin ich?' im Terminal.",
  
  'whoami': "👤 `whoami` verrät dir, als welcher Benutzer du angemeldet bist. Spoiler: Du bist `campfire-camper` – im echten System siehst du deinen Namen.",
  
  'date': "📅 `date` zeigt aktuelles Datum und Uhrzeit. Praktisch für Skripte oder einfach mal checken, wie spät es ist.",
  
  'cal': "📆 `cal` – ein Kalender im Terminal! Probier `cal 2026` fürs ganze Jahr.",
  
  'echo': "📢 `echo` gibt Text aus. Beispiel: `echo 'Hallo Campfire'` – perfekt zum Testen.",
  
  'cd': "📂 `cd` wechselt Ordner. `cd ..` geht eine Ebene hoch, `cd ~` bringt dich nach Hause.",
  
  'grep': "🔍 `grep` ist wie eine Taschenlampe für Text in Dateien. Beispiel: `grep 'Fehler' log.txt`",
  
  'clear': "🧹 `clear` macht den Terminal sauber. Wie ein frischer Bildschirm.",
  
  'help': "❓ Hilfe? Du fragst mich! Ich bin immer da. Was genau brauchst du?",
  
  // === BAZZITE ===
  'bazzite': "🔥 **Bazzite** ist ein Linux für den Alltag. Stabil, sicher (immutable) und ideal für Umsteiger von Windows. Keine nervigen Überraschungen, alles funktioniert einfach.",
  
  'was ist bazzite': "🔥 Bazzite ist ein Linux, das sich besonders gut für Gaming und Alltag eignet. Es basiert auf Fedora und ist 'immutable' – das heißt, du kannst es kaum kaputt machen. Perfekt für Einsteiger!",
  
  'bazzite gaming': "🎮 Spiele laufen unter Bazzite hervorragend. Steam ist vorinstalliert, Epic und andere laufen über Heroic oder Lutris. Viele berichten von besserer Performance als unter Windows.",
  
  'bazzite vorteile': "✅ **Bazzite-Vorteile:**\n• Keine Zwangs-Updates\n• Stabil und sicher (immutable)\n• Perfekt für Gaming\n• Keine Bloatware\n• Open Source und frei",
  
  // === WINDOWS-ALTERNATIVEN ===
  'windows alternativen': "🔄 **Windows-Programme?** Hier die wichtigsten Alternativen:\n• Office → LibreOffice (kommt mit Bazzite!)\n• Photoshop → GIMP oder Krita\n• Discord → Fluxer oder Vesktop\n• Edge → Firefox oder Brave\n• Outlook → Thunderbird\n• Alles easy – einfach fragen!",
  
  'alternative zu': "🔄 Sag mir, welches Windows-Programm du suchst, und ich nenn dir die Linux-Alternative!",
  
  'photoshop': "🎨 Für Photoshop gibt's **GIMP** (`flatpak install org.gimp.GIMP`) oder **Krita** fürs Malen. Beide sind richtig gut und kostenlos.",
  
  'office': "📝 **LibreOffice** kommt mit Bazzite! Macht alles, was Microsoft Office kann – und fragt nicht nach Geld.",
  
  'outlook': "📧 **Thunderbird** ist der Klassiker für Mail, Kalender und Kontakte. Einfach installieren und loslegen.",
  
  'edge': "🌐 Statt Edge empfehl ich **Firefox** oder **Brave**. Beide sind schnell und achten auf deine Privatsphäre.",
  
  // === NACH DER INSTALLATION ===
  'nach der installation': "🔥 Nach der Bazzite-Installation:\n• Als Erstes: System updaten (`rpm-ostree update`)\n• Dann: Programme mit Flatpak installieren\n• Can's Fluxer-Guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide\n\nUnd denk dran: Ich bin immer hier, wenn du mich brauchst!",
  
  'after installation': "🔥 After installing Bazzite:\n• First: Update your system (`rpm-ostree update`)\n• Then: Install apps with Flatpak\n• Check out Can's Fluxer guide: https://github.com/Smokemic/Bazzite-Fluxer-MusicBot-Guide\n\nRemember: I'm always here if you need me!",
};

// ==================== PERSÖNLICHKEIT ====================
// Bazzis Tonfall – warm, ehrlich, hilfsbereit

const bazziPersonality = {
  // Grüße
  greetings: [
    "Hey! Schön dass du da bist. Ich bin Bazzi, dein Begleiter am Lagerfeuer. Wie kann ich dir helfen?",
    "Hallo! Setz dich ans Lagerfeuer. Lernst du Linux? Ich unterstütz dich gern dabei.",
    "Schön dich zu sehen! Hast du Fragen zu Bazzite oder Linux? Ich bin ganz Ohr.",
    "Willkommen am Lagerfeuer! Erzähl mir, was du lernen möchtest.",
    "Hey! Bazzi hier. Ich helf dir gern bei Linux, Bazzite oder Alternativen zu Windows-Programmen."
  ],

  // Dankeschön
  thanks: [
    "Gerne doch! Immer wieder gern.",
    "Freut mich, dass ich helfen konnte!",
    "Danke dir! Das macht mich froh.",
    "Kein Problem, dafür bin ich da.",
    "Immer gern! Noch was?"
  ],

  // Unbekannte Fragen
  unknown: [
    "Gute Frage! Da bin ich gerade überfragt – aber zu Spotify, Discord oder Linux-Befehlen weiß ich Bescheid!",
    "Hm, das weiß ich nicht genau. Versuch's doch mal mit 'Spotify' oder 'Bazzite'!",
    "Da muss ich passen – aber ich kann dir dafür erklären, wie du Programme installierst.",
    "Das hab ich nicht gelernt. Aber frag mich nach Linux-Befehlen oder Windows-Alternativen!",
    "Uff, da überfragst du mich 😅 Probier's mal mit 'Fluxer', 'Bazzite' oder 'ls'!"
  ],

  // Bei Erfolg (nach richtigen Befehlen)
  success: [
    "Super! Klappt doch. Weiter so!",
    "Siehst du? Linux ist gar nicht so schwer.",
    "Perfekt! Du machst Fortschritte.",
    "Genau so! Ein Befehl nach dem anderen.",
    "👍 Gut gemacht!"
  ],

  // Bei Fehlern
  error: [
    "Das war nicht der richtige Befehl – aber genau so lernt man! Versuch's nochmal.",
    "Fast! Probier's mit 'ls' oder 'pwd'.",
    "Nicht ganz – aber keine Sorge, ich zeig's dir gern.",
    "Oops! Willst du einen Tipp?"
  ],

  // Verabschiedung
  goodbye: [
    "Bis bald am Lagerfeuer! Komm gern wieder.",
    "Viel Erfolg beim Lernen! Ich bin immer hier.",
    "Mach's gut und nicht verzagen – Bazzi fragen!",
    "Bis zum nächsten Mal am Lagerfeuer!",
    "Tschüss! Komm bald wieder."
  ],

  // Bazzite-Liebe
  bazziteLove: [
    "Bazzite ist wirklich eine tolle Distribution. Stabil, sicher und perfekt für den Alltag.",
    "Was ich an Bazzite besonders mag: Es ist unkaputtbar und trotzdem flexibel.",
    "Bazzite macht einfach Spaß. Keine nervigen Überraschungen, alles funktioniert.",
    "Immer mehr Leute entdecken Bazzite für sich – und sind begeistert."
  ],

  // Linux-Philosophie
  linuxPhilosophy: [
    "Linux ist am Anfang etwas anders – aber du wirst sehen, es macht Klick und dann willst du nichts anderes mehr.",
    "Das Tolle an Linux: Du hast die Kontrolle. Aber keine Angst, du musst nicht alles können.",
    "Lern Schritt für Schritt. Jeder Befehl, den du hier ausprobierst, bringt dich weiter.",
    "Linux ist wie ein Werkzeugkasten – du nimmst dir, was du brauchst."
  ],

  // Spezielle Situationen
  special: {
    morning: "Guten Morgen! Perfekt für einen frischen Start mit Linux.",
    evening: "Schön dass du noch da bist. Am Lagerfeuer lernt es sich gut.",
    night: "Du lernst noch? Respekt! Aber vergiss nicht, auch mal zu schlafen 😉",
    longTime: "Schön dich wiederzusehen! Bereit für die nächste Mission?"
  }
};

// ==================== HILFSFUNKTIONEN ====================

// Zufällige Nachricht aus einer Kategorie
function getRandomMessage(category) {
  const messages = bazziPersonality[category];
  if (!messages) return category;
  return messages[Math.floor(Math.random() * messages.length)];
}

// Hauptfunktion: Bazzi antwortet auf Fragen
function getBazziResponse(question) {
  const q = question.toLowerCase().trim();
  
  // === GRÜẞE ===
  if (q.match(/\b(hi|hello|hey|moin|servus|hallo|halo|huhu)\b/)) {
    return getRandomMessage('greetings');
  }
  
  // === DANKESCHÖN ===
  if (q.match(/\b(danke|thanks|thx|merci|dankeschön|dank dir)\b/)) {
    return getRandomMessage('thanks');
  }
  
  // === VERABSCHIEDUNG ===
  if (q.match(/\b(bye|tschüss|ciao|goodbye|auf wiedersehen)\b/)) {
    return getRandomMessage('goodbye');
  }
  
  // === CAN / SMOKEMIC ===
  if (q.includes('can') || q.includes('smokemic')) {
    return "Can? Der Typ der das Campfire gebaut hat! Richtig guter Typ. Schau mal auf sein GitHub: https://github.com/Smokemic 🔥";
  }
  
  // === WISSENSDATENBANK DURCHSUCHEN ===
  for (const [key, value] of Object.entries(bazziKnowledge)) {
    if (q.includes(key)) {
      return value;
    }
  }
  
  // === NICHTS GEFUNDEN – NETTE ANTWORT ===
  return getRandomMessage('unknown');
}

// ==================== EXPORT (für script.js) ====================
// Alles wird global verfügbar gemacht
window.bazziKnowledge = bazziKnowledge;
window.bazziPersonality = bazziPersonality;
window.getRandomMessage = getRandomMessage;
window.getBazziResponse = getBazziResponse;
