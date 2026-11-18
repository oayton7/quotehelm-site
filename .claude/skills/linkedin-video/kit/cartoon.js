// Pillion Web cartoon kit: characters, props, places and helpers for LinkedIn videos.
// Everything is SVG strings drawn at 1080 x 1020 (the picture area above the caption band).
// Free to use: no paid services, no network.
(function(){
const K={};
K.C={ink:'#12302B',brass:'#C8963E',mist:'#F2F5F3',red:'#9E3814',ok:'#1F7A4D',sky:'#CFE6F2',water:'#6EB6E0'};
K.clamp=v=>Math.max(0,Math.min(1,v));
K.lerp=(a,b,k)=>a+(b-a)*k;
K.ease=v=>{v=K.clamp(v);return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2};
K.pop=v=>{v=K.clamp(v);const c=1.7;return 1+(c+1)*Math.pow(v-1,3)+c*Math.pow(v-1,2)}; // overshoot ease for things appearing
K.fade=(t,a,b,d=.3)=>K.clamp((t-a)/d)*K.clamp((b-t)/d);
K.shake=(t,amp=4,speed=70)=>Math.sin(t*speed)*amp;
const SKIN={light:['#F1C09A','#DDA07A'],mid:['#D99A6C','#BF7F52'],deep:['#8D5A3B','#714528']};

// ---------- faces ----------
function eyes(e,look,y,blink,glasses){
  const [lx,ly]=look||[0,0];
  const big=e==='shock', ry=big?22:15, rx=big?17:13, p=big?5:7;
  let s='';
  if(blink){s+=`<path d="M-33 ${y} Q-21 ${y+6} -9 ${y} M33 ${y} Q21 ${y+6} 9 ${y}" stroke="#1b1f22" stroke-width="5" fill="none" stroke-linecap="round"/>`;}
  else if(e==='shut'){s+=`<path d="M-33 ${y+2} Q-21 ${y-6} -9 ${y+2} M33 ${y+2} Q21 ${y-6} 9 ${y+2}" stroke="#1b1f22" stroke-width="6" fill="none" stroke-linecap="round"/>`;}
  else s+=`<ellipse cx="-21" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="21" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff"/><circle cx="${-21+lx}" cy="${y+ly}" r="${p}" fill="#1b1f22"/><circle cx="${21+lx}" cy="${y+ly}" r="${p}" fill="#1b1f22"/><circle cx="${-18+lx}" cy="${y+ly-3}" r="2" fill="#fff"/><circle cx="${24+lx}" cy="${y+ly-3}" r="2" fill="#fff"/>`;
  if(glasses)s+=`<circle cx="-21" cy="${y}" r="23" fill="none" stroke="${glasses}" stroke-width="6"/><circle cx="21" cy="${y}" r="23" fill="none" stroke="${glasses}" stroke-width="6"/><path d="M-2 ${y-2} L2 ${y-2}" stroke="${glasses}" stroke-width="6"/>`;
  const B={worried:`M-36 ${y-18} L-8 ${y-28} M36 ${y-18} L8 ${y-28}`,cross:`M-36 ${y-30} L-8 ${y-18} M36 ${y-30} L8 ${y-18}`,shock:`M-36 ${y-40} Q-22 ${y-50} -8 ${y-40} M36 ${y-40} Q22 ${y-50} 8 ${y-40}`,flat:`M-36 ${y-24} L-8 ${y-24} M36 ${y-24} L8 ${y-24}`,shut:`M-36 ${y-24} L-8 ${y-24} M36 ${y-24} L8 ${y-24}`,sly:`M-36 ${y-22} L-8 ${y-28} M36 ${y-32} L8 ${y-26}`};
  s+=`<path d="${B[e]||`M-34 ${y-26} Q-21 ${y-34} -8 ${y-26} M34 ${y-26} Q21 ${y-34} 8 ${y-26}`}" fill="none" stroke="#4a2f22" stroke-width="7" stroke-linecap="round"/>`;
  return s;
}
function mouth(e,talk,t,y){
  const line=(d)=>`<path d="${d}" fill="none" stroke="#3b1d1d" stroke-width="5" stroke-linecap="round"/>`;
  if(talk){const k=Math.abs(Math.sin(t*19))+Math.abs(Math.sin(t*7))*.4; return `<ellipse cx="0" cy="${y}" rx="${10+k*5}" ry="${3+k*9}" fill="#5a1f1f"/>`;}
  if(e==='shock')return `<ellipse cx="0" cy="${y+4}" rx="15" ry="20" fill="#5a1f1f"/><ellipse cx="0" cy="${y+14}" rx="9" ry="6" fill="#e06b6b"/>`;
  if(e==='grin')return `<path d="M-28 ${y-6} Q0 ${y+30} 28 ${y-6} Z" fill="#5a1f1f"/><path d="M-24 ${y-4} L24 ${y-4} L20 ${y+4} L-20 ${y+4}Z" fill="#fff"/>`;
  if(e==='worried')return line(`M-18 ${y+6} Q0 ${y-8} 18 ${y+6}`);
  if(e==='cross')return line(`M-20 ${y+4} Q-10 ${y-4} 0 ${y+4} Q10 ${y-4} 20 ${y+4}`);
  if(e==='flat'||e==='shut')return line(`M-16 ${y} L16 ${y}`);
  if(e==='sly')return line(`M-18 ${y} Q4 ${y+10} 20 ${y-8}`);
  return line(`M-22 ${y-4} Q0 ${y+16} 22 ${y-4}`);
}
K.blinkAt=(t,seed=0)=>((t+seed*1.37)%3.4)<.12;
const arm=(sx,sy,ex,ey,c,w=24,skin)=>{const mx=(sx+ex)/2+(ey-sy)*.15,my=(sy+ey)/2-(ex-sx)*.15;return `<path d="M${sx} ${sy} Q${mx} ${my} ${ex} ${ey}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><circle cx="${ex}" cy="${ey}" r="14" fill="${skin}"/>`};

// ---------- props (drawn around 0,0) ----------
K.phone=(x,y,s=1,o={})=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot||0})"><rect x="-17" y="-29" width="34" height="58" rx="7" fill="#1b1f22"/><rect x="-13" y="-24" width="26" height="46" rx="4" fill="${o.lit?'#9FE3C1':'#33463f'}"/></g>`;
K.mug=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-16" y="-34" width="32" height="34" rx="5" fill="#fff" stroke="${K.C.ink}" stroke-width="4"/><path d="M16 -26 q14 0 14 10 q0 10 -14 10" fill="none" stroke="${K.C.ink}" stroke-width="4"/><path d="M-6 -42 q6 -8 0 -16 M6 -42 q6 -8 0 -16" stroke="#9aa" stroke-width="3" fill="none"/></g>`;
K.wrench=(x,y,s=1,rot=0)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})"><rect x="-6" y="-60" width="12" height="80" rx="5" fill="#9aa3a8"/><path d="M-18 -60 L-18 -84 L-6 -76 L6 -76 L18 -84 L18 -60 Z" fill="#9aa3a8"/></g>`;
K.toolbox=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-60" width="140" height="60" rx="8" fill="#C0392B"/><rect x="-70" y="-60" width="140" height="14" fill="#a5301f"/><path d="M-30 -60 v-14 h60 v14" fill="none" stroke="#333" stroke-width="7"/></g>`;
K.bowl=(x,y,s=1,fill=.5)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 -60 L70 -60 L55 0 L-55 0Z" fill="#F4C430"/><rect x="${-66+8*(1-fill)}" y="${-60+60*(1-fill)}" width="${132-16*(1-fill)}" height="6" rx="3" fill="${K.C.water}"/></g>`;
K.drip=(x,y,t,fall=180,rate=1.4)=>{const k=(t*rate)%1;return `<ellipse cx="${x}" cy="${y+k*fall}" rx="${7}" ry="${10+k*4}" fill="${K.C.water}" opacity="${1-k*.3}"/>`};
K.puddle=(x,y,w=160)=>`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${w/9}" fill="${K.C.water}" opacity=".55"/>`;
K.buzz=(x,y,on)=>on?`<g stroke="${K.C.brass}" stroke-width="5" stroke-linecap="round"><path d="M${x+28} ${y-20} l14 -8 M${x+30} ${y} l16 0 M${x+28} ${y+20} l14 8 M${x-28} ${y-20} l-14 -8 M${x-30} ${y} l-16 0 M${x-28} ${y+20} l-14 8"/></g>`:'';

// ---------- people ----------
const OUTFIT={
  plumber:{top:'#2C4A7A',trou:'#4a4f55',hat:null,strips:false,belt:false},
  electrician:{top:'#5c6670',trou:'#2F3B45',hat:null,strips:false,belt:true},
  scaffolder:{top:'#F28C28',trou:'#2F3B45',hat:'#F6C431',strips:true},
  roofer:{top:'#F28C28',trou:'#2F3B45',hat:'beanie',strips:true},
  builder:{top:'#F6C431',trou:'#5b4a3a',hat:'#ffffff',strips:true},
  decorator:{top:'#F4F1EA',trou:'#F4F1EA',hat:'cap',strips:false,splodge:true},
};
K.trade=function(o){
  const {x=0,y=0,s=1,flip=false,trade='plumber',e='smile',talk=false,t=0,look=[0,0],L=[-55,-80],R=[55,-80],hold=null,holdIn='R',seed=0,hat=[0,0,0],skin='light',bob=0}=o;
  const of=OUTFIT[trade]||OUTFIT.plumber, [SK,SKD]=SKIN[skin]||SKIN.light;
  const hand=holdIn==='R'?R:L;
  let held='';
  if(hold==='phone')held=K.phone(hand[0],hand[1]-18,1,{lit:o.lit});
  if(hold==='phoneEar')held=K.phone(hand[0]-6,hand[1]-30,1,{lit:o.lit,rot:-10});
  if(hold==='mug')held=K.mug(hand[0]+4,hand[1]+12);
  if(hold==='wrench')held=K.wrench(hand[0],hand[1]+20,1,-20);
  const breathe=Math.sin(t*2.4+seed)*2;
  let hatSvg='';
  if(of.hat==='beanie')hatSvg=`<path d="M-58 -232 Q-58 -300 0 -300 Q58 -300 58 -232 Z" fill="#2C4A7A"/><rect x="-62" y="-242" width="124" height="20" rx="8" fill="#22385e"/>`;
  else if(of.hat==='cap')hatSvg=`<path d="M-56 -238 Q-54 -292 0 -292 Q54 -292 56 -238 Z" fill="#3C7A5A"/><path d="M20 -242 Q70 -244 96 -232 L56 -232Z" fill="#2f6148"/>`;
  else if(of.hat)hatSvg=`<path d="M-54 -248 Q-54 -305 0 -308 Q54 -305 54 -248Z" fill="${of.hat}"/><rect x="-66" y="-254" width="132" height="14" rx="7" fill="${of.hat}"/><rect x="-7" y="-307" width="14" height="56" rx="5" fill="rgba(0,0,0,.12)"/>`;
  else hatSvg=`<path d="M-56 -238 Q-60 -284 -10 -286 Q40 -290 56 -244 Q30 -262 0 -258 Q-30 -262 -56 -238Z" fill="#6b5a4a"/>`; // short hair
  return `<g transform="translate(${x} ${y+bob}) scale(${flip?-s:s} ${s})">
  <rect x="-28" y="-75" width="22" height="66" rx="8" fill="${of.trou}"/><rect x="6" y="-75" width="22" height="66" rx="8" fill="${of.trou}"/>
  <ellipse cx="-20" cy="-6" rx="26" ry="13" fill="#2b2b2b"/><ellipse cx="20" cy="-6" rx="26" ry="13" fill="#2b2b2b"/>
  <g transform="translate(0 ${breathe*.5})">
  <rect x="-48" y="-165" width="96" height="100" rx="34" fill="${of.top}"/>
  ${of.strips?`<rect x="-48" y="-128" width="96" height="10" fill="#EEF2F3"/><rect x="-48" y="-104" width="96" height="10" fill="#EEF2F3"/>`:''}
  ${of.belt?`<rect x="-48" y="-80" width="96" height="14" fill="#6b4a2a"/><rect x="18" y="-82" width="22" height="30" rx="4" fill="#8a6a42"/>`:''}
  ${of.splodge?`<circle cx="-20" cy="-120" r="9" fill="#5BA4D9"/><circle cx="24" cy="-96" r="7" fill="#E57373"/><circle cx="-10" cy="-30" r="8" fill="#5BA4D9"/>`:''}
  ${trade==='plumber'||trade==='electrician'?`<path d="M-18 -165 L0 -145 L18 -165" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="5"/>`:''}
  ${arm(-42,-145,L[0],L[1],of.top,24,SK)}${arm(42,-145,R[0],R[1],of.top,24,SK)}
  <circle cx="-60" cy="-212" r="14" fill="${SK}"/><circle cx="60" cy="-212" r="14" fill="${SK}"/>
  <circle cx="0" cy="-212" r="62" fill="${SK}"/><path d="M-50 -190 Q0 -140 50 -190 Q30 -160 0 -158 Q-30 -160 -50 -190Z" fill="#6b4a3a" opacity=".2"/>
  ${eyes(e,look,-222,K.blinkAt(t,seed)&&e!=='shut',null)}<ellipse cx="0" cy="-200" rx="15" ry="12" fill="${SKD}"/>${mouth(e,talk,t,-176)}
  <g transform="translate(${hat[0]} ${hat[1]}) rotate(${hat[2]} 0 -262)">${hatSvg}</g>
  ${held}</g></g>`;
};
const HOME={
  nan:{top:'#9B7BC4',trou:'#2C3E63',hair:'#D9DCE0',glasses:'#C0392B',feet:'#F29BB0',style:'bob'},
  dad:{top:'#3E7C59',trou:'#4D6FA3',hair:'#6b5a4a',glasses:null,feet:'#3a2b20',style:'bald'},
  young:{top:'#E07A5F',trou:'#2C3E63',hair:'#3b2a20',glasses:null,feet:'#fff',style:'bun'},
};
K.home=function(o){
  const {x=0,y=0,s=1,flip=false,who='nan',e='smile',talk=false,t=0,look=[0,0],L=[-58,-78],R=[58,-80],hold=null,seed=1,skin='light',towel=false}=o;
  const h=HOME[who]||HOME.nan, [SK,SKD]=SKIN[skin]||SKIN.light;
  let held='';
  if(hold==='phoneEar')held=K.phone(R[0]-4,R[1]-30,1,{rot:-10});
  if(hold==='phone')held=K.phone(R[0],R[1]-18,1,{lit:true});
  if(hold==='mug')held=K.mug(R[0]+4,R[1]+12);
  let hair='';
  if(h.style==='bob')hair=`<path d="M-66 -190 Q-74 -290 0 -284 Q74 -290 66 -190 Q60 -232 30 -250 Q0 -236 -30 -250 Q-60 -232 -66 -190Z" fill="${h.hair}"/>`;
  if(h.style==='bald')hair=`<path d="M-62 -200 Q-66 -236 -50 -244 M62 -200 Q66 -236 50 -244" stroke="${h.hair}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  if(h.style==='bun')hair=`<circle cx="0" cy="-292" r="26" fill="${h.hair}"/><path d="M-64 -200 Q-66 -282 0 -280 Q66 -282 64 -200 Q50 -250 0 -254 Q-50 -250 -64 -200Z" fill="${h.hair}"/>`;
  const breathe=Math.sin(t*2.6+seed)*2;
  return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">
  <rect x="-24" y="-70" width="18" height="62" fill="${h.trou}"/><rect x="6" y="-70" width="18" height="62" fill="${h.trou}"/>
  <ellipse cx="-18" cy="-6" rx="24" ry="12" fill="${h.feet}"/><ellipse cx="18" cy="-6" rx="24" ry="12" fill="${h.feet}"/>
  <g transform="translate(0 ${breathe*.5})">
  <path d="M-46 -60 L-40 -160 Q0 -172 40 -160 L46 -60Z" fill="${h.top}"/><path d="M0 -165 L0 -60" stroke="rgba(0,0,0,.15)" stroke-width="5"/>
  ${towel?`<path d="M-44 -162 L-20 -162 L-28 -96 L-48 -100Z" fill="#7FA7D9"/><path d="M-42 -150 L-24 -150 M-44 -130 L-26 -130 M-46 -110 L-28 -110" stroke="#fff" stroke-width="4"/>`:''}
  ${arm(-40,-140,L[0],L[1],h.top,22,SK)}${arm(40,-140,R[0],R[1],h.top,22,SK)}
  <circle cx="-58" cy="-210" r="13" fill="${SK}"/><circle cx="58" cy="-210" r="13" fill="${SK}"/>
  <circle cx="0" cy="-212" r="58" fill="${SK}"/><circle cx="-36" cy="-188" r="10" fill="#E88" opacity=".35"/><circle cx="36" cy="-188" r="10" fill="#E88" opacity=".35"/>
  ${hair}${eyes(e,look,-218,K.blinkAt(t,seed)&&e!=='shut',h.glasses)}<ellipse cx="0" cy="-196" rx="11" ry="9" fill="${SKD}"/>${mouth(e,talk,t,-174)}
  ${held}</g></g>`;
};

// ---------- places ----------
K.sky=(t=0)=>`<rect width="1080" height="1020" fill="${K.C.sky}"/><circle cx="150" cy="140" r="60" fill="#FBE7A1"/><g fill="#fff" opacity=".9" transform="translate(${(t*8)%200} 0)"><ellipse cx="330" cy="120" rx="80" ry="26"/><ellipse cx="380" cy="100" rx="50" ry="30"/></g><rect y="975" width="1080" height="45" fill="#7E8A6A"/>`;
K.kitchen=function(o={}){const {style='modern',leak=false,t=0,open=true,x0=0,w=1080}=o;
  const wall=style==='cottage'?'#F3E3C0':'#EEF3F6', unit=style==='cottage'?'#E8D9B5':'#FFFFFF', floor=style==='cottage'?'#C9A77C':'#D5DCE0', top=style==='cottage'?'#8B6B4A':'#9AA5AD';
  let s=`<g transform="translate(${x0} 0)"><rect width="${w}" height="1020" fill="${wall}"/><rect y="860" width="${w}" height="160" fill="${floor}"/>`;
  s+=`<rect x="${w*.18}" y="170" width="${w*.34}" height="230" fill="#cfe6f2" stroke="#fff" stroke-width="14"/>`;
  if(style==='cottage')s+=`<path d="M${w*.18} 170 h${w*.34} v60 q-${w*.17} 30 -${w*.34} 0z" fill="#fff" opacity=".8"/>`;
  s+=`<rect x="${w*.05}" y="560" width="${w*.9}" height="300" fill="${unit}" stroke="rgba(0,0,0,.08)" stroke-width="4"/><rect x="${w*.04}" y="540" width="${w*.92}" height="26" fill="${top}"/>`;
  s+=`<rect x="${w*.27}" y="520" width="${w*.16}" height="24" rx="8" fill="#b9c3c9"/><path d="M${w*.35} 520 v-50 h30" fill="none" stroke="#b9c3c9" stroke-width="12" stroke-linecap="round"/>`;
  if(open)s+=`<rect x="${w*.2}" y="590" width="${w*.3}" height="250" fill="#3b3b3b"/><path d="M${w*.33} 590 v80 q0 30 30 30 h20 v-110" fill="none" stroke="#c9d1d5" stroke-width="16"/>`;
  else s+=`<rect x="${w*.2}" y="590" width="${w*.3}" height="250" fill="${unit}" stroke="rgba(0,0,0,.1)" stroke-width="4"/>`;
  if(style==='cottage')s+=`<g transform="translate(${w*.72} 540)"><ellipse cx="0" cy="-36" rx="44" ry="36" fill="#C0392B"/><rect x="-14" y="-82" width="28" height="12" rx="4" fill="#922"/></g>`;
  if(leak&&open)s+=K.drip(w*.39,700,t,110)+K.bowl(w*.37,840,.8,.6)+K.puddle(w*.33,870,180);
  return s+`</g>`;};
K.scaffoldHouse=function(){let s=`<rect x="560" y="140" width="520" height="840" fill="#B8664A"/>`;for(let r=0;r<38;r++)for(let c=0;c<12;c++)s+=`<rect x="${560+c*48+(r%2?24:0)-24}" y="${142+r*22}" width="44" height="18" fill="#C2735A" opacity=".55"/>`;
  return s+`<polygon points="530,150 820,30 1110,150" fill="#4A3F3A"/><g stroke="#8A9399" stroke-width="12" stroke-linecap="round"><line x1="470" y1="170" x2="470" y2="980"/><line x1="700" y1="170" x2="700" y2="980"/><line x1="930" y1="170" x2="930" y2="980"/></g><g fill="#B07B45"><rect x="455" y="355" width="490" height="18"/><rect x="455" y="595" width="490" height="18"/><rect x="455" y="835" width="490" height="18"/></g>`;};
K.vanCab=function(o={}){const {x0=0,w=1080}=o;return `<g transform="translate(${x0} 0)"><rect width="${w}" height="1020" fill="#2a3a36"/><rect x="${w*.06}" y="80" width="${w*.88}" height="420" rx="40" fill="#cfe6f2"/><rect x="${w*.06}" y="380" width="${w*.88}" height="120" fill="#a9c79a"/><rect x="0" y="560" width="${w}" height="460" fill="#1d2a27"/><circle cx="${w*.5}" cy="690" r="120" fill="none" stroke="#111" stroke-width="30"/><rect x="0" y="520" width="${w}" height="60" rx="20" fill="#3a4a46"/></g>`};
K.split=(left,right)=>`<defs><clipPath id="kl"><rect x="0" y="0" width="536" height="1020"/></clipPath><clipPath id="kr"><rect x="544" y="0" width="536" height="1020"/></clipPath></defs><g clip-path="url(#kl)">${left}</g><g clip-path="url(#kr)">${right}</g><rect x="536" width="8" height="1020" fill="${K.C.ink}"/>`;

// ---------- text ----------
K.bubble=function(x,y,w,h,txt,o={}){const size=o.size||38, lines=txt.split('|'), k=o.k===undefined?1:K.pop(o.k);
  const cx=x+w/2, cy=y+h/2;
  let tail='';if(o.tail){const [tx,ty]=o.tail,bx=Math.max(x+30,Math.min(x+w-30,tx)),by=ty>y?y+h:y;tail=`<path d="M${bx-18} ${by} L${tx} ${ty} L${bx+18} ${by}" fill="#fff" stroke="${K.C.ink}" stroke-width="5" stroke-linejoin="round"/><rect x="${bx-15}" y="${by-(ty>y?8:-2)}" width="30" height="8" fill="#fff"/>`;}
  return `<g transform="translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="#fff" stroke="${K.C.ink}" stroke-width="5"/>${tail}${lines.map((l,i)=>`<text x="${cx}" y="${cy+size*.36+(i-(lines.length-1)/2)*size*1.2}" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="${size}" fill="${K.C.ink}">${l}</text>`).join('')}</g>`;};
K.notify=function(x,y,w,title,body,k=1){const cx=x+w/2;return `<g transform="translate(${cx} ${y}) scale(${K.pop(k)}) translate(${-cx} ${-y})"><rect x="${x}" y="${y}" width="${w}" height="150" rx="26" fill="#fff" stroke="${K.C.ink}" stroke-width="5"/><rect x="${x+24}" y="${y+28}" width="56" height="56" rx="14" fill="${K.C.ink}"/><rect x="${x+38}" y="${y+42}" width="28" height="28" transform="rotate(45 ${x+52} ${y+56})" fill="${K.C.brass}"/><text x="${x+100}" y="${y+60}" font-family="Inter,Arial" font-weight="800" font-size="30" fill="${K.C.ink}">${title}</text><text x="${x+100}" y="${y+104}" font-family="Inter,Arial" font-size="26" fill="#55615E">${body}</text></g>`;};
K.form=function(x,y,title,rows,t,start,step=.7){let s=`<g transform="translate(${x} ${y})"><rect width="440" height="${130+rows.length*96}" rx="40" fill="${K.C.ink}"/><rect x="18" y="40" width="404" height="${70+rows.length*96}" rx="22" fill="#fff"/><text x="44" y="96" font-family="Inter,Arial" font-weight="800" font-size="30" fill="${K.C.ink}">${title}</text>`;
  rows.forEach((r,i)=>{const on=t>start+i*step;s+=`<g transform="translate(40 ${126+i*96})"><rect width="360" height="80" rx="12" fill="${K.C.mist}"/><text x="16" y="30" font-family="Inter,Arial" font-size="21" fill="#55615E">${r[0]}</text>${on?`<text x="16" y="62" font-family="Inter,Arial" font-weight="700" font-size="25" fill="${K.C.ink}">${r[1]}</text><circle cx="332" cy="40" r="18" fill="${K.C.ok}"/><path d="M322 41 l7 7 l13 -15" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`:''}</g>`});
  return s+`</g>`;};
K.endCard=function(o={}){const {title='Pillion Web',line='Quote forms for trades firms',url='pillionweb.co.uk',foot='Chichester based. Sussex and Hampshire'}=o;
  return `<rect width="1080" height="1020" fill="${K.C.ink}"/><rect x="440" y="180" width="200" height="200" rx="44" fill="#fff"/><rect x="490" y="230" width="100" height="100" transform="rotate(45 540 280)" fill="${K.C.brass}"/>
  <text x="540" y="520" text-anchor="middle" font-family="'Source Serif 4',Georgia,serif" font-weight="700" font-size="88" fill="#fff">${title}</text>
  <text x="540" y="595" text-anchor="middle" font-family="Inter,Arial" font-size="36" fill="#cfd9d5">${line}</text>
  <text x="540" y="670" text-anchor="middle" font-family="Inter,Arial" font-weight="800" font-size="46" fill="${K.C.brass}">${url}</text>
  <text x="540" y="740" text-anchor="middle" font-family="Inter,Arial" font-size="32" fill="#cfd9d5">${foot}</text>`;};
// Camera: wrap a scene in a slow push-in or a punch-in on a point.
K.camera=(svg,zoom=1,cx=540,cy=510)=>`<g transform="translate(${cx} ${cy}) scale(${zoom}) translate(${-cx} ${-cy})">${svg}</g>`;
window.K=K;
})();
