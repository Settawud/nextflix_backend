import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  healthcheck() {
    const timestamp = new Date().toISOString();

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Nextflix Backend</title>
    <style>
      :root {
        color-scheme: light dark;
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: radial-gradient(circle at top, #512cf5 0, #120654 55%);
        min-height: 100vh;
        display: grid;
        place-items: center;
        color: #fff;
      }
      .card {
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 32px 40px;
        text-align: center;
        backdrop-filter: blur(12px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      h1 {
        margin: 0 0 12px;
        font-size: 28px;
        letter-spacing: 0.04em;
      }
      p {
        margin: 6px 0;
        font-size: 16px;
        opacity: 0.85;
      }
      code {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.12);
        font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Nextflix Backend</h1>
      <p>&#9989; Server is online and running</p>
      <p><code>last heartbeat: ${timestamp}</code></p>
    </div>
  </body>
</html>`;
  }
}
