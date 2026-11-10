# Orbit

Orbit turns a topic into a short animated explainer film. Gemini plans the film, and Orbit renders the characters, props, camera movement, captions, narration, music, and sound effects directly in the browser.

## Quick start

### You need

- [Node.js 20 or newer](https://nodejs.org/)
- A modern browser, such as Chrome or Edge
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- Optional: a Gnani API key for higher-quality narration

### 1. Open the Orbit folder

In a terminal, move into this folder:

```text
orbit/orbit-local
```

### 2. Create your environment file

Copy the example file:

**Windows PowerShell**

```powershell
Copy-Item .env.example .env
```

**macOS or Linux**

```sh
cp .env.example .env
```

Open `.env` and add your Gemini key:

```env
GEMINI_API_KEY=your_gemini_key_here
```

Gnani is optional. Add it if you want Gnani narration during playback and in exported videos:

```env
GNANI_API_KEY=your_gnani_key_here
```

Keep `.env` private. It is excluded from Git.

### 3. Start Orbit

```sh
node server.mjs
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/) in your browser.

No package installation is required. Orbit uses Node.js built-in modules.

## Make a film

1. Enter a topic, or choose one of the example topics.
2. Select a language.
3. Select a visual style, or leave it on automatic matching.
4. Optionally open **Ground the film in your sources** to add notes, files, URLs, or web research.
5. Click **Make the film**.
6. Use the player controls to play, pause, scrub, change the theme, enter theatre/fullscreen mode, or open the mini-player.

Supported language choices include English, Hindi, Bengali, Gujarati, Kannada, Malayalam, Marathi, Tamil, Telugu, Spanish, and French. Gemini generates the film text in the selected language, and Gnani uses it for narration when available.

## Narration and export

- With `GNANI_API_KEY`, Orbit uses Gnani Timbre TTS for narration.
- Without Gnani, playback falls back to the browser's default speech voice.
- The **Voice on/off** control affects playback and export.
- WebM export includes the canvas, music, sound effects, and Gnani narration when Gnani is configured and Voice is enabled.
- Browser speech is playback-only and cannot be captured into a WebM file.

## Source-grounded films

The optional research panel supports:

- Pasted notes
- TXT and Markdown files
- Text-based PDFs
- User-entered web URLs
- Best-effort public web search

Orbit ranks relevant excerpts locally before sending them to Gemini. It does not require a vector database or embedding service.

You can choose whether Gemini should:

- Use only the material you provided
- Add online context

Sources can stay internal, appear in an ending note, or be mentioned briefly in narration.

### PDF limitations

Orbit can extract selectable text from common PDFs. Scanned or image-only PDFs require OCR, which Orbit does not currently run. OCR the document locally first, or upload a searchable PDF or text file.

## How Orbit works

- Gemini creates a compact structured film plan.
- The browser renders a recurring cast and animated props on Canvas.
- Scenes include actions, expressions, movement, camera changes, labels, charts, counters, and speech bubbles.
- Rendering is deterministic, so scrubbing remains stable.
- The visual system is inspired by the [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) director method and styleboard.
- Orbit includes the directing rules directly in its Gemini prompt; no separate skill package is required.

## Configuration

The `.env` file supports:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash-lite
GNANI_API_KEY=
GNANI_TTS_MODEL=timbre-v2.5
GNANI_TTS_VOICE=Nalini
PORT=4173
```

`GEMINI_API_KEY` is used for film generation. `GNANI_API_KEY` is used only for narration. Orbit never uses the Gnani key to generate film plans.

If port `4173` is already in use, Orbit tries the next available port. You can set `PORT` to choose a preferred starting port.

## Keep your keys safe

Never put an API key in `index.html`, commit `.env`, or share it publicly. The local server reads keys from `.env` and keeps them out of browser code.

If a key is exposed, revoke it from the relevant provider dashboard and create a replacement.
