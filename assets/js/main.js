(function(){
// 霓虹粒子背景（轻量）
const c = document.getElementById('bg');
const dpr = Math.max(1, window.devicePixelRatio || 1);
const ctx = c.getContext('2d');
let W, H, dots;
function resize(){ W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr; ctx.scale(dpr,dpr); }
function reset(){ dots = Array.from({length: 60}, ()=>({
x: Math.random()*innerWidth, y: Math.random()*innerHeight, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
})); }
function frame(){
ctx.clearRect(0,0,W,H);
ctx.globalCompositeOperation = 'lighter';
dots.forEach(p=>{
p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>innerWidth) p.vx*=-1; if(p.y<0||p.y>innerHeight) p.vy*=-1;
const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,120);
g.addColorStop(0,'rgba(124,58,237,.08)');
g.addColorStop(1,'rgba(6,182,212,0)');
ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x,p.y,120,0,Math.PI*2); ctx.fill();
});
requestAnimationFrame(frame);
}
addEventListener('resize', resize);
resize(); reset(); frame();


// 搜索 & 标签过滤
const q = document.querySelector('#search');
const cards = Array.from(document.querySelectorAll('[data-title]'));
const tagBar = document.querySelector('.tag-bar');
function applyFilter(){
const t = (q && q.value || '').toLowerCase();
const activeTag = tagBar?.querySelector('.tag.active')?.dataset.tag || '';
cards.forEach(el=>{
const hit = el.dataset.title.includes(t) && (!activeTag || (el.dataset.tags||'').split(',').includes(activeTag));
el.style.display = hit? 'block':'none';
});
}
q && q.addEventListener('input', applyFilter);
tagBar && tagBar.addEventListener('click', e=>{
if(!e.target.classList.contains('tag')) return;
tagBar.querySelectorAll('.tag').forEach(t=>t.classList.remove('active'));
e.target.classList.add('active');
applyFilter();
});
})();