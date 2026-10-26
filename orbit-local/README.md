# Orbit (local)
# note for priyansh 
make it to work on the free llm api and enhance this project according to you 

Type a topic, get a short explainer film drawn live in code on a whiteboard.
Method from https://github.com/lemomo-ai/lemo-opuscar (Whiteboard Explainer).

## Run it
1. Install Node 18 or newer (https://nodejs.org).
2. Get an Anthropic API key (https://console.anthropic.com) and set it:
   - macOS / Linux:  export ANTHROPIC_API_KEY="sk-ant-..."
   - Windows (PowerShell):  $env:ANTHROPIC_API_KEY="sk-ant-..."
3. In this folder run:  node server.mjs
4. Open http://localhost:8080

Optional: PORT=3000 to change the port, ORBIT_MODEL=<model id> to change the model.

## Notes
- Opening index.html by double-click also works, but only the built-in sample film plays; writing new films needs the server.
- The key stays on your machine; the server only forwards the film prompt to the Anthropic API. API use is billed to your key.
- Fonts load from Google Fonts, so the handwriting look needs an internet connection.
- "Save film" records a .webm in real time (pen sounds and score; browser voice narration is not recorded). Use Chrome or Edge.
