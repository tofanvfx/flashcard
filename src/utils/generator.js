import templateHtml from './template.html?raw';

export function generateHTML(data, metadata) {
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

  return html;
}
