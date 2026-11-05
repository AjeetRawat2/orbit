# Orbit

Orbit turns a topic into a short animated explainer film. Gemini directs a recurring cast of characters and props, then the browser renders them in code with scene actions, camera moves, narration, sound effects, and a light score. Films include style selection, playback controls, a storyboard, theatre/fullscreen/mini-player viewing, and WebM export.

## Run locally

### Requirements

- Node.js 20 or newer
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- A modern browser such as Chrome or Edge

### Setup

1. Download or clone this repository, then open a terminal in the `orbit-local` folder.
2. Copy `.env.example` to `.env`.

   **Windows PowerShell:**

   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS / Linux:**

   ```sh
   cp .env.example .env
   ```

3. Open `.env` in a text editor and put your key after `GEMINI_API_KEY=`. Keep this file private; it is excluded from Git.
4. Start the app:

   ```sh
   node server.mjs
   ```

5. Open the local address printed in the terminal. The default is `http://127.0.0.1:4173/`.

No package installation is needed. The server uses Node's built-in modules. The sample film can play without an API key, but generating a new film needs one. Set `GEMINI_MODEL` in `.env` if you want to use a different Gemini model. Set `PORT` to choose a preferred port; if it is busy, Orbit tries the next one.

## What to expect

- The browser's built-in voice narrates the film during playback.
- Narration uses the selected browser voice; the automatic choice avoids voices named Dave or David when another compatible voice is available.
- WebM export records the canvas and generated audio. Browser speech is not included in the saved video.
- Generated scenes use the friend-provided coded-film method: a recurring cast, animated props, speech bubbles and labels, scene-specific backgrounds, camera moves, and deterministic time-based rendering. The implementation is dependency-free and runs on the browser Canvas.
- The style menu contains the integrated Lemo-Opuscar-inspired visual library. Orbit can match a style to the topic, or you can choose a style and switch it without regenerating the film.
- The player includes theatre mode, browser fullscreen, and a mini-player where Picture-in-Picture is supported.
- The optional **Ground the film in your sources** panel supports pasted notes, local plain-text/Markdown/PDF files, user-entered web URLs, and best-effort public web search. Orbit extracts text from common text-based PDFs and ranks short local excerpts by topic before sending them to Gemini, so no vector database or embedding service is required.
- The research scope can be set to **Use only my provided material**, which prevents supplemental web search and instructs Gemini not to add unsupported outside facts, or **Allow Gemini to add online context**.
- Source use is configurable: research can remain internal, be named in the ending, or be attributed briefly in narration. Retrieval is bounded and web search may be unavailable when a public search endpoint blocks local requests.
- PDF files are supported when they contain selectable text. Scanned or image-only PDFs are reported as unsupported because they require OCR; Orbit does not currently run OCR or send documents to a paid OCR service.
- If a scanned PDF is needed, use a text-based export or OCR it locally first, then upload the resulting searchable PDF or text file.
- Fonts load from Google Fonts, so the hand-drawn type styling needs an internet connection.
- The film drawing method is inspired by [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar). Its style catalog is included under `lemo-opuscar/styleboard/`.
- The friend’s notes referred to the Lemo-Opuscar director method, but no separate skill file or installable skill package was included. The relevant directing rules are integrated into Orbit’s Gemini prompt; no additional skill is required to run the app.
- The friend’s version did not include Orbit’s source-grounded RAG workflow. The merged version retains pasted notes, TXT/Markdown/PDF files, URLs, bounded public search, source ranking, research-scope controls, citation modes, and visible generated-film source lists.

## Keep API keys safe

Never paste an API key into `index.html`, commit `.env`, or share it publicly. The local server reads the key from `.env` and sends requests to Gemini; the key is not sent to browser code. If a key was exposed, revoke it in Google AI Studio and create a replacement.
