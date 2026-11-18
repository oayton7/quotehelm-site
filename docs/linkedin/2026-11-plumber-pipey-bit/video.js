// "The pipey bit": a plumber answers a call and gets nothing he can price from.
// Render: node .claude/skills/linkedin-video/tools/render.js docs/linkedin/2026-11-plumber-pipey-bit/video.js out.mp4
const DIA=[ // [start, who, text, talkSeconds]
  [6.3,'H',"I've got water coming out|the pipey bit under the sink.",2.0],
  [8.7,'P',"Is it the trap|or the tap feed?",1.4],
  [10.6,'H',"...",0],
  [11.9,'H',"The wet one.",0.8],
  [13.4,'P',"Right. Whereabouts|are you?",1.2],
  [15.0,'H',"Near the church.",0.9],
  [16.2,'P',"Which church?",0.7],
  [17.2,'H',"The big one.",0.8],
];
const FORM=[['Postcode','PO19'],["What's wrong?",'Leak under the sink'],['Photo','attached'],['When?','Today if you can']];
window.VIDEO={duration:35,
 captions:[[0,6,"You answered the phone.<br><em>Now the hard part.</em>"],[6,19.8,"Then you try to work out<br><em>what the job actually is.</em>"],[19.8,23.5,"More calls <em>before you can even price it.</em>"],[23.5,30,"A quote form asks <em>the right questions first.</em>"],[30,35,"Plumbers: <em>what's the best description of a leak you've been given?</em>"]],
 sounds:[{t:.3,type:'buzz'},{t:2.6,type:'pop'},{t:6,type:'whoosh'},
   ...DIA.map((d,i)=>({t:d[0],type:'pop'})),
   ...[7,7.7,8.4,9.1,9.8,10.5,11.2,11.9,12.6,13.3,14,14.7,15.4,16.1,16.8,17.5].map(t=>({t,type:'drip',gain:.35})),
   {t:18.3,type:'sigh-horn'},{t:19.8,type:'whoosh'},{t:20.1,type:'scribble'},{t:20.9,type:'scribble'},{t:21.7,type:'scribble'},
   {t:23.5,type:'whoosh'},{t:23.8,type:'tap'},{t:24.4,type:'tick'},{t:24.6,type:'tap'},{t:25.1,type:'tick'},{t:25.3,type:'tap'},{t:25.8,type:'tick'},{t:26.5,type:'tick'},
   {t:27.0,type:'ping'},{t:28.2,type:'pop'},{t:30,type:'whoosh'},{t:30.3,type:'chime'}],
 voices:[]};
const said=(who,t)=>[...DIA].reverse().find(d=>d[1]===who&&t>=d[0]);
const talking=(who,t)=>DIA.some(d=>d[1]===who&&t>=d[0]&&t<d[0]+d[3]);
window.scene=function(t){
 let s='';
 if(t<6){ // 1. phone buzzes in his pocket, he answers
  const out=t>=1.8, ear=t>=2.4, buzz=t>.3&&t<1.8&&(t%.5)<.3;
  s+=K.kitchen({style:'modern',t});
  s+=K.toolbox(330,880,1.1);
  s+=K.trade({x:760,y:960,s:1.5,trade:'plumber',t,e:ear?'smile':'worried',look:ear?[-5,0]:[6,10],talk:t>2.6&&t<3.6,
    L:[-62,-100],hold:ear?'phoneEar':(out?'phone':'wrench'),holdIn:ear||out?'R':'L',R:ear?[52,-212]:(out?[66,-150]:[55,-80])})
   +(ear||out?K.wrench(760-93,960-150,1.5,-20):'');
  if(!out)s+=K.phone(793,880,1.1,{lit:buzz})+K.buzz(793,880,buzz);
  if(t>2.6)s+=K.bubble(90,220,520,140,"Hello, how can I help?",40,{tail:[700,520],k:(t-2.6)/.3});
  s=K.camera(s,1+t*.012,760,620);
 } else if(t<19.8){ // 2. the vague call, split screen
  const sigh=t>=18.2, zoom=sigh?K.lerp(1,1.35,K.ease((t-18.2)/.5)):1;
  const left=K.kitchen({style:'cottage',leak:true,t,w:536})+K.home({x:420,y:960,s:1.15,who:'nan',towel:true,t,hold:'phoneEar',R:[52,-212],
    e:t>10.6&&t<11.9?'worried':'smile',look:t>10.6&&t<11.9?[-8,10]:[4,-2],talk:talking('H',t)});
  let right=K.kitchen({style:'modern',w:536,x0:544})+K.toolbox(650,900,.8);
  right+=K.camera(K.trade({x:900,y:960,s:1.15,trade:'plumber',t,hold:'phoneEar',R:[52,-212],L:[-62,-100],
    e:sigh?'shut':(t>=11.9?'flat':'smile'),talk:talking('P',t),look:[-6,0]})+K.wrench(900-71,960-115,1.15,-20),zoom,900,700);
  s+=K.split(left,right);
  const h=said('H',t),p=said('P',t);
  if(h)s+=K.bubble(24,40,488,150,h[2],{size:h[2].length>24?32:44,tail:[330,300],k:(t-h[0])/.3});
  if(p&&!sigh)s+=K.bubble(568,40,488,150,p[2],{size:38,tail:[860,300],k:(t-p[0])/.3});
 } else if(t<23.5){ // 3. his notes
  const tt=t-19.8;
  s+=`<rect width="1080" height="1020" fill="#2a3a36"/><g transform="rotate(-4 540 480)"><rect x="170" y="120" width="740" height="740" rx="14" fill="#FFF8D6"/>`;
  for(let i=0;i<9;i++)s+=`<line x1="200" y1="${250+i*70}" x2="880" y2="${250+i*70}" stroke="#9EC5E8" stroke-width="3"/>`;
  [["Pipey bit?",.3],["The wet one",1.1],["Big church??",1.9]].forEach((n,i)=>{if(tt>n[1])s+=`<text x="230" y="${300+i*140}" font-family="'Comic Neue','Comic Sans MS',cursive" font-size="76" fill="#2b2b2b" transform="rotate(${i%2?1:-1} 540 ${300+i*140})">${n[0]}</text>`});
  if(tt>2.7)s+=`<path d="M220 760 Q540 700 860 770" stroke="${K.C.red}" stroke-width="10" fill="none" stroke-linecap="round"/><text x="540" y="740" text-anchor="middle" font-family="Inter" font-weight="800" font-size="54" fill="${K.C.red}">no idea</text>`;
  s+=`</g>`;
 } else if(t<30){ // 4. the quote form
  const tt=t-23.5, got=t>=27;
  const left=`<rect width="540" height="1020" fill="#F3E3C0"/>`+K.form(48,60,'Get a plumbing quote',FORM,t,24.4,.7)+K.home({x:270,y:1010,s:.95,who:'nan',t,hold:'phone',R:[30,-170],look:[0,-8]});
  let right=K.kitchen({style:'modern',w:536,x0:544,open:false})+K.trade({x:810,y:1000,s:1.3,trade:'plumber',t,hold:got?'phone':'mug',lit:got,R:got?[40,-170]:[50,-110],L:[-60,-110],
    e:t>=27.6?'grin':'smile',look:got?[0,8]:[0,0],talk:t>28.2&&t<29.6});
  if(got)right+=K.notify(560,150,500,'New quote request','PO19, leak, photo',(t-27)/.35);
  s+=K.split(left,right);
  if(t>28.2)s+=K.bubble(568,360,488,150,"Compression joint.|I'll be there at four.",{size:34,tail:[800,560],k:(t-28.2)/.3});
 } else {
  s+=K.endCard()+K.trade({x:930,y:1010,s:.7,trade:'plumber',t,e:'grin',R:[70,-200],L:[-55,-80]});
 }
 return s;
};
