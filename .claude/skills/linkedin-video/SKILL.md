---
name: linkedin-video
description: Make short funny cartoon videos for Pillion Web's LinkedIn, for free. Animation is drawn in code (SVG), rendered with the browser and ffmpeg already installed, with generated sound effects and optional free voices. Use when Oscar asks for a LinkedIn video, an animation, a cartoon, a reel or a moving version of a post. Never uses paid video, image or voice services.
---

# Free cartoon videos for LinkedIn

Make 25 to 40 second cartoon videos, 1080 by 1350 (4:5, the best size for the LinkedIn feed), that trades owners in West Sussex, East Sussex and Hampshire recognise, laugh at and comment on. **Cost: nothing.** No Everygen, no paid AI video, image or voice tools, no stock libraries. If a step would need money, stop and say so.

Write the post text with the `linkedin-post` skill. Its rules apply here too: no invented clients, results or statistics, only the three live services, "from £225" only, no technology names, nothing private, drafts only (Oscar posts).

## What makes it work (lessons from Oscar's feedback)

- **True to the job, or it fails.** Trades keep their phone in their pocket and answer it. A joke built on a false premise ("the phone's in the van") was rejected straight away. Before writing, check the premise against how the trade really works, and ask Oscar if unsure.
- **The best pain is the useless call,** not the missed one: they answer and get nothing they can price from ("the pipey bit", "tall-ish", "near the big church"). The quote form fixes that by asking the right questions first. Find the trade's version: plumbers (leaks, "the thing under the sink"), roofers ("a tile's missing"; "which side?"; "the top"), electricians ("the switchy box"), builders ("a normal-sized extension"), decorators ("sort of grey but warm").
- **One recognisable scene, escalating, then the fix.** About four beats: answer, three rounds of vague answers getting worse, a deadpan reaction (eyes shut, sad horn, camera push in), the form arriving with exactly what he needed, the end card with a question.
- **End on a question the audience can answer with a story** ("Plumbers: what's the best description of a leak you've been given?"). That is where the comments come from.
- **Captions carry it.** Most LinkedIn video plays muted, so the caption band tells the story and the speech bubbles carry the dialogue. Sound is a bonus.
- **Rotate trades.** Do not make two in a row for the same trade. Avoid scaffolding for now (Oscar asked for something else).
- Played straight and kind: the customer is lovable, never stupid or mocked for age; the tradesperson is competent and patient.

## How to make one

1. **Pitch first, in chat, in five lines:** trade, the premise, the dialogue, the fix, the closing question. Wait for Oscar's yes. Do not build before the premise is approved.
2. **Write the storyboard** at `docs/linkedin/<YYYY-MM>-<slug>/video.js`. Copy the structure of `docs/linkedin/2026-11-plumber-pipey-bit/video.js`:
   - `window.VIDEO = {duration, captions:[[start,end,html]], sounds:[{t,type,gain}], voices:[{t,file}]}`
   - `window.scene = t => svgString` for the 1080 by 1020 picture above the caption band. Use `<em>` in captions for the brass highlight.
3. **Use the kit** (`kit/cartoon.js`, available as `K`):
   - People: `K.trade({trade:'plumber'|'electrician'|'roofer'|'builder'|'decorator'|'scaffolder', e, talk, t, look, L, R, hold, flip, s})` and `K.home({who:'nan'|'dad'|'young', towel, ...})`. Expressions `e`: smile, grin, worried, cross, shock, flat, shut, sly. `talk:true` flaps the mouth; eyes blink by themselves. `hold`: phone, phoneEar, mug, wrench (in the R hand unless `holdIn:'L'`).
   - Places: `K.kitchen({style:'modern'|'cottage', leak, open, w, x0})`, `K.scaffoldHouse()`, `K.sky(t)`, `K.vanCab()`, `K.split(leftSvg, rightSvg)` for phone calls.
   - Props and text: `K.phone`, `K.buzz`, `K.mug`, `K.wrench`, `K.toolbox`, `K.bowl`, `K.drip`, `K.puddle`, `K.bubble(x,y,w,h,'line one|line two',{size,tail:[x,y],k})`, `K.notify`, `K.form(x,y,title,rows,t,start)`, `K.endCard()`.
   - Motion: `K.camera(svg, zoom, cx, cy)` for push-ins, `K.ease`, `K.pop` (springy appear, pass `k:(t-start)/.3` to bubbles), `K.fade`, `K.shake`.
   - Add new characters or places to the kit rather than one-off code, so the next video is quicker.
4. **Check before rendering:** `node .claude/skills/linkedin-video/tools/render.js <video.js> <sheet.png> --preview 1,4,8,12,...` gives a contact sheet of those seconds. Look at it: nothing cut off, bubbles readable, text not overflowing, faces showing the right emotion, the premise reads without sound. Fix and check again.
5. **Render:** `node .claude/skills/linkedin-video/tools/render.js <video.js> <out.mp4>` (about a minute for 35 seconds).
6. **Send** the MP4 to Oscar with the post text from the `linkedin-post` skill, and record it in the topic bank and post log in `docs/18-linkedin-posts.md`.

## Sound

`tools/sfx.py` makes every effect from maths, so there are no licences to worry about: buzz (phone vibrating), ring (UK ring), pop (speech bubble), ping (notification), tick, tap (typing), scribble, boing, whoosh (scene change), drip, splash, sigh-horn (sad trombone), chime (end card). Put a pop on every bubble, a whoosh on every scene change, and keep a running sound (drips) quiet with `gain:.35`.

## Voices (optional, still free)

- **Best:** Oscar, or friends, record each line on a phone as a voice note. Real local voices beat any synthetic voice. Save them next to the storyboard and list them in `VIDEO.voices` with their start times.
- **Or Piper** (free, offline text to speech) on a machine that can reach huggingface.co, for example Oscar's laptop: `pip install piper-tts`, download a British voice (`en_GB-alan-medium`, `en_GB-southern_english_female-low`), then `tools/say.sh <voice> "<line>" voices/<n>.wav`. The cloud container blocks those downloads, so there it is bubbles and captions only.
- When voices are used, set each `talk` window to the line's real length.

## Rules for the picture

- Brand colours from the kit (`K.C`): ink green, brass, mist. Captions in Source Serif, bubbles in Inter.
- No real people, firms, logos or brand names. The form and request on screen are marked or plainly an example, with a made-up postcode-level address only.
- No em dashes or exclamation marks in captions. UK English.
- Keep it under 40 seconds; the end card holds for 4 to 5 seconds with the question in the caption band.
