// Cute interactions for the map
const modal = document.getElementById('modal');
const title = document.getElementById('modalTitle');
const desc = document.getElementById('modalDesc');
const badgeRow = document.getElementById('badgeRow');
const playBtn = document.getElementById('playBtn');
const previewBtn = document.getElementById('previewBtn');
const closeModal = document.getElementById('closeModal');
const levelList = document.getElementById('levelList');

let SOUND_ON = true;
const audioPop = new Audio('data:audio/wav;base64,UklGRhAAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=');
// (silent tiny wav placeholder to avoid broken audio; replace with your own SFX)

function openModal(level){
  title.textContent = level.title;
  desc.textContent = level.desc;
  badgeRow.innerHTML = '';
  (level.badges||[]).forEach(b => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = b;
    badgeRow.appendChild(span);
  });
  modal.hidden = false;
  if(SOUND_ON){ audioPop.currentTime = 0; audioPop.play().catch(()=>{}); }
}

function close(){
  modal.hidden = true;
}
closeModal.addEventListener('click', close);
modal.addEventListener('click', e => { if(e.target === modal) close(); });

// Populate sidebar
window.LEVELS.forEach((lvl, i)=>{
  const li = document.createElement('li');
  li.className = 'level-item';
  li.innerHTML = `<span class="tag">L${i+1}</span> <div><div><strong>${lvl.title}</strong></div><div class="muted">${lvl.desc}</div></div>`;
  li.addEventListener('click', ()=>openModal(lvl));
  levelList.appendChild(li);
});

// Hook up nodes
document.querySelectorAll('.node').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.dataset.id;
    const level = window.LEVELS.find(l => l.id === id);
    if(level) openModal(level);
  });
});

// Buttons
document.getElementById('helpBtn').addEventListener('click', ()=>{
  openModal({title:'How to play', desc:'Tap a glowing pin to open a level. Read the task, then press Start. You can wire this page to your Blockly/JS game later.', badges:["👉","🧱","🚀"]});
});
document.getElementById('muteBtn').addEventListener('click', (e)=>{
  SOUND_ON = !SOUND_ON;
  e.currentTarget.textContent = SOUND_ON ? '🔈 Sound' : '🔇 Muted';
});

// Example handlers
playBtn.addEventListener('click', ()=>{
  alert('Hook this to your game route or level loader. For now this is a demo. 😊');
});
previewBtn.addEventListener('click', ()=>{
  alert('Preview could show sample blocks or GIF. Add your own later!');
});
