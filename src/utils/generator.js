import templateHtml from './template.html?raw';

const odiaTranslations = {
  "Start Learning →": "ଶିଖିବା ଆରମ୍ଭ କରନ୍ତୁ →",
  "Enter your name...": "ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ...",
  "Powered by Aveti Learning": "ଆଭେଟି ଲର୍ଣ୍ଣିଂ ଦ୍ୱାରା ପରିଚାଳିତ",
  "Finish ✓": "ସମାପ୍ତ ✓",
  "⭐ XP": "⭐ ଏକ୍ସପି",
  "🔥 Streak": "🔥 ଷ୍ଟ୍ରିକ୍",
  "👆 Tap card to reveal answer": "👆 ଉତ୍ତର ଦେଖିବା ପାଇଁ କାର୍ଡରେ ଟ୍ୟାପ୍ କରନ୍ତୁ",
  "How did you do?": "ଆପଣ କିପରି କଲେ?",
  "❌ &nbsp;Wrong": "❌ &nbsp;ଭୁଲ୍",
  "✅ &nbsp;Correct": "✅ &nbsp;ଠିକ୍",
  "⟵ Swipe to move ⟶": "⟵ ଘୁଞ୍ଚାଇବା ପାଇଁ ସ୍ୱାଇପ୍ କରନ୍ତୁ ⟶",
  "⏭ Skip": "⏭ ବାଦ୍ ଦିଅନ୍ତୁ",
  "↩ Re-answer": "↩ ପୁନର୍ବାର ଉତ୍ତର ଦିଅନ୍ତୁ",
  "Your Score": "ଆପଣଙ୍କ ସ୍କୋର",
  "✅ Correct": "✅ ଠିକ୍",
  "❌ Wrong": "❌ ଭୁଲ୍",
  "⏭ Skipped": "⏭ ବାଦ୍ ଦିଆଯାଇଛି",
  "⭐ Total XP": "⭐ ମୋଟ ଏକ୍ସପି",
  "🔥 Max Streak": "🔥 ସର୍ବାଧିକ ଷ୍ଟ୍ରିକ୍",
  "🔁 Try Again": "🔁 ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
  "Class 1–12 | CBSE & Odia Board": "ପ୍ରଥମ - ଦ୍ୱାଦଶ ଶ୍ରେଣୀ | CBSE ଏବଂ ଓଡ଼ିଆ ବୋର୍ଡ",
  "For Schools": "ବିଦ୍ୟାଳୟଗୁଡ଼ିକ ପାଇଁ",
  "For Students": "ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କ ପାଇଁ",
  "For Parents": "ପିତାମାତାଙ୍କ ପାଇଁ",
  "NEP-aligned digital lessons.": "NEP-ଆଧାରିତ ଡିଜିଟାଲ୍ ପାଠ |",
  "Teach better, save time": "ଭଲ ପଢାନ୍ତୁ, ସମୟ ବଞ୍ଚାନ୍ତୁ",
  "Practice daily on Aveti App.": "ଆଭେଟି ଆପ୍ ରେ ପ୍ରତିଦିନ ଅଭ୍ୟାସ କରନ୍ତୁ |",
  "Improve exam scores": "ପରୀକ୍ଷା ସ୍କୋରରେ ଉନ୍ନତି କରନ୍ତୁ",
  "Offline Tuition:": "ଅଫଲାଇନ୍ ଟ୍ୟୁସନ୍:",
  "Personal attention for real marks improvement": "ପ୍ରକୃତ ମାର୍କ ଉନ୍ନତି ପାଇଁ ବ୍ୟକ୍ତିଗତ ଧ୍ୟାନ",
  "Call: 7894040614 / 9124084100": "କଲ୍ କରନ୍ତୁ: ୭୮୯୪୦୪୦୬୧୪ / ୯୧୨୪୦୮୪୧୦୦",
  "Trusted by Schools & Parents": "ବିଦ୍ୟାଳୟ ଏବଂ ପିତାମାତାଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ",
  "Quality Content you can trust": "ଗୁଣାତ୍ମକ ବିଷୟବସ୍ତୁ ଯାହା ଉପରେ ଆପଣ ବିଶ୍ୱାସ କରିପାରିବେ",
  "Better Learning Better Future": "ଉତ୍ତମ ଶିକ୍ଷା ଉତ୍ତମ ଭବିଷ୍ୟତ",
  "🏆 Outstanding! You're a star!": "🏆 ଅସାଧାରଣ! ଆପଣ ଜଣେ ଷ୍ଟାର୍!",
  "🌟 Excellent work! Keep it up!": "🌟 ଚମତ୍କାର କାମ! ଏହାକୁ ବଜାୟ ରଖନ୍ତୁ!",
  "👍 Good effort! Revise a bit more.": "👍 ଭଲ ପ୍ରୟାସ! ଟିକେ ଅଧିକ ସମୀକ୍ଷା କରନ୍ତୁ |",
  "📚 Keep practising — you can do it!": "📚 ଅଭ୍ୟାସ ଜାରି ରଖନ୍ତୁ - ଆପଣ ଏହା କରିପାରିବେ!",
  "💪 Don't give up — try again!": "💪 ହାର ମାନନ୍ତୁ ନାହିଁ - ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ!",
  "Flashcards": "ଫ୍ଲାସକାର୍ଡ"
};

export function generateHTML(data, metadata, language = 'english') {
  let html = templateHtml;
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>Aveti Learning — ${metadata.chapterName} | ${metadata.className} ${metadata.subject}</title>`);
  
  // Replace Home Card details
  html = html.replace(/<div class="home-title">.*?<\/div>/, `<div class="home-title">🔬 ${metadata.title}</div>`);
  html = html.replace(/<div class="home-sub">.*?<\/div>/, `<div class="home-sub">${metadata.subtitle}</div>`);
  
  // Replace the strong tag inside chapter-box
  html = html.replace(/<div class="chapter-box">\s*<strong>[\s\S]*?<\/strong>/, `<div class="chapter-box">\n      <strong>${metadata.chapterName}</strong>`);
  
  html = html.replace(/<p>Class 8 &nbsp;•&nbsp; Science &nbsp;•&nbsp; Chapter 2<\/p>/g, `<p>${metadata.className} &nbsp;•&nbsp; ${metadata.subject} &nbsp;•&nbsp; ${metadata.chapterNo}</p>`);
  html = html.replace(/✨ \d+ Flashcards/g, `✨ ${data.length} Flashcards`);
  
  // Replace Quiz Counter
  html = html.replace(/id="qCounter">1 \/ \d+</, `id="qCounter">1 / ${data.length}<`);
  
  // Replace Result Card details
  html = html.replace(/<div class="res-chapter">.*?<\/div>/g, `<div class="res-chapter">${metadata.className} • ${metadata.subject} • ${metadata.chapterName}</div>`);
  
  // Replace Share string
  html = html.replace(/The Invisible Living World \| Class 8 Science/g, `${metadata.chapterName} | ${metadata.className} ${metadata.subject}`);
  html = html.replace(/Class 8 Science — The Invisible Living World/g, `${metadata.className} ${metadata.subject} — ${metadata.chapterName}`);
  
  // Replace the FLASHCARDS data
  const flashcardsString = JSON.stringify(data, null, 2);
  const arrayRegex = /const FLASHCARDS = \[[\s\S]*?\];/;
  html = html.replace(arrayRegex, `const FLASHCARDS = ${flashcardsString};`);

  if (language === 'odia') {
    Object.keys(odiaTranslations).forEach(key => {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(escapedKey, 'g'), odiaTranslations[key]);
    });
    
    html = html.replace(/>Share</g, '>ସେୟାର କରନ୍ତୁ<');
    html = html.replace(/"Share"/g, '"ସେୟାର କରନ୍ତୁ"');
    html = html.replace(/"Share it 🎉"/g, '"ଏହାକୁ ସେୟାର କରନ୍ତୁ 🎉"');
    html = html.replace(/"My Aveti Quiz Result"/g, '"ମୋର ଆଭେଟି କୁଇଜ୍ ଫଳାଫଳ"');
    html = html.replace(/"My Aveti Result"/g, '"ମୋର ଆଭେଟି ଫଳାଫଳ"');
    html = html.replace(/"Result copied! Share it 🎉"/g, '"ଫଳାଫଳ କପି ହୋଇଛି! ସେୟାର କରନ୍ତୁ 🎉"');
  }

  return html;
}
