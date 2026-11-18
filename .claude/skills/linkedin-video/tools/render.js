#!/usr/bin/env node
// Render a storyboard (video.js) to an MP4 with sound, or to a contact sheet for checking.
//   node render.js path/to/video.js out.mp4
//   node render.js path/to/video.js sheet.png --preview 1,4,8.5,12
// Needs: Playwright with Chromium, ffmpeg, python3. No paid services.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const [,,story,out,...rest]=process.argv;
if(!story||!out){console.error('usage: render.js video.js out.(mp4|png) [--preview t1,t2,...] [--fps 25]');process.exit(1);}
const opt=k=>{const i=rest.indexOf(k);return i>=0?rest[i+1]:null};
const preview=opt('--preview'), fps=+(opt('--fps')||25);
const kit=path.join(__dirname,'..','kit','cartoon.js');
const page_html=`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=Inter:wght@400;600;800&family=Source+Serif+4:opsz,wght@8..60,700&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;overflow:hidden;background:#12302B;font-family:Inter,Arial,sans-serif}
#st{position:absolute;left:0;top:0}#cap{position:absolute;left:0;right:0;top:1020px;height:330px;background:#12302B;color:#fff;padding:0 70px;display:flex;align-items:center}
#capt{font-family:"Source Serif 4",Georgia,serif;font-size:62px;line-height:1.15;font-weight:700}#capt em{font-style:normal;color:#C8963E}</style></head>
<body><svg id="st" width="1080" height="1020" viewBox="0 0 1080 1020"></svg><div id="cap"><div id="capt"></div></div></body></html>`;
(async()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'lv-'));
  fs.writeFileSync(path.join(tmp,'page.html'),page_html);
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
  await p.goto('file://'+path.join(tmp,'page.html'));
  await p.addScriptTag({path:kit});await p.addScriptTag({path:path.resolve(story)});
  await p.evaluate(()=>{
    window.__draw=t=>{document.getElementById('st').innerHTML=window.scene(t);
      const caps=VIDEO.captions||[],c=caps.find(c=>t>=c[0]&&t<c[1]),el=document.getElementById('capt');
      if(!c){el.style.opacity=0;return}
      if(el.dataset.k!=c[0]){el.innerHTML=c[2];el.dataset.k=c[0]}
      const last=c===caps[caps.length-1],o=Math.min(K.clamp((t-c[0])/.3),last?1:K.clamp((c[1]-t)/.25));
      el.style.opacity=o;el.style.transform=`translateY(${(1-o)*16}px)`;};
  });
  await p.waitForLoadState('networkidle').catch(()=>{});await p.evaluate(()=>document.fonts.ready);
  const V=await p.evaluate(()=>({duration:VIDEO.duration,sounds:VIDEO.sounds||[],voices:VIDEO.voices||[]}));
  if(preview){
    const ts=preview.split(',').map(Number);
    for(let i=0;i<ts.length;i++){await p.evaluate(t=>__draw(t),ts[i]);await p.screenshot({path:path.join(tmp,`p${i}.png`)});}
    await b.close();
    const cols=Math.min(ts.length,5);
    execFileSync('ffmpeg',['-loglevel','error','-y','-i',path.join(tmp,'p%d.png'),'-vf',`scale=360:450,tile=${cols}x${Math.ceil(ts.length/cols)}:padding=6:color=white`,'-frames:v','1',out]);
    console.log('sheet',out,'times',ts.join(' '));return;
  }
  const n=Math.round(V.duration*fps);
  for(let i=0;i<n;i++){await p.evaluate(t=>__draw(t),i/fps);await p.screenshot({path:path.join(tmp,`f${String(i).padStart(5,'0')}.png`)});}
  await b.close();
  const sfx=path.join(tmp,'sfx.wav');
  fs.writeFileSync(path.join(tmp,'cues.json'),JSON.stringify({duration:V.duration,cues:V.sounds}));
  execFileSync('python3',['-I',path.join(__dirname,'sfx.py'),path.join(tmp,'cues.json'),sfx]);
  // Mix voices (files relative to the storyboard) over the effects, each delayed to its start time.
  const base=path.dirname(path.resolve(story));const ins=['-i',sfx];let fil='';const labels=['[0:a]'];
  V.voices.forEach((v,i)=>{ins.push('-i',path.resolve(base,v.file));const ms=Math.round(v.t*1000);fil+=`[${i+1}:a]adelay=${ms}|${ms},volume=${v.gain||1.6}[v${i}];`;labels.push(`[v${i}]`)});
  const mix=path.join(tmp,'mix.wav');
  if(V.voices.length){execFileSync('ffmpeg',['-loglevel','error','-y',...ins,'-filter_complex',`${fil}${labels.join('')}amix=inputs=${labels.length}:normalize=0,atrim=0:${V.duration}[a]`,'-map','[a]',mix]);}
  else fs.copyFileSync(sfx,mix);
  execFileSync('ffmpeg',['-loglevel','error','-y','-framerate',String(fps),'-i',path.join(tmp,'f%05d.png'),'-i',mix,'-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart',out]);
  fs.rmSync(tmp,{recursive:true,force:true});
  console.log('video',out,`${V.duration}s`,`${n} frames`,`${V.sounds.length} sounds`,`${V.voices.length} voice lines`);
})();
