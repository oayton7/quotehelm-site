# Scaffold quote carousel and video (November 2026)

LinkedIn assets for the topic bank idea "What to ask before you price a scaffold" in `docs/18-linkedin-posts.md`.

- `scaffold-quote-carousel.pdf`: seven slides at 1080 by 1350. Upload it as a document post.
- `scaffold-quote-video.mp4`: 23 seconds, silent, with captions burnt in, because most LinkedIn video plays muted.
- `carousel.html`, `video.html` and `character.js`: the sources. The character is an illustration, not a real person or client. The quote request on the phone is labelled Example.

To re-render, open the HTML in Chromium (Playwright): print `carousel.html` to PDF at 1080 by 1350, and for the video call `render(t)` for each frame at 25 frames a second for 23 seconds, then join the frames with ffmpeg (`-c:v libx264 -pix_fmt yuv420p`).
