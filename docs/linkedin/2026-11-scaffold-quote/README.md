# Scaffold quote carousel and video (November 2026)

LinkedIn assets for the topic bank idea "What to ask before you price a scaffold" in `docs/18-linkedin-posts.md`.

- `scaffold-quote-carousel.pdf`: seven slides at 1080 by 1350. Upload it as a document post.
- `scaffold-cartoon-video.mp4`: 31-second cartoon. A scaffolder answers his phone on the scaffold and gets nothing usable from the customer ("Near the big roundabout", "Erm... tall-ish?"), then a quote form asks the right questions first. Ends on the question "Scaffolders: what's the vaguest quote request you've had?". Sound effects only, captions burnt in for muted viewing.
- `carousel.html`, `cartoon.html` and `character.js`: the sources. The characters are cartoons, not real people or clients. The quote request on the phone is labelled Example.

To re-render, open the HTML in Chromium (Playwright): print `carousel.html` to PDF at 1080 by 1350, and for the video call `render(t)` in `cartoon.html` for each frame at 25 frames a second for 31 seconds, then join the frames with ffmpeg (`-c:v libx264 -pix_fmt yuv420p`).

An earlier version had the phone left in the van. Oscar rejected it: trades keep their phone in their pocket, and the real problem is the vague call.
