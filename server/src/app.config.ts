import config from '@colyseus/tools';
import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import { TownRoom } from './rooms/TownRoom';
import { handleListCharacters } from './db/character-api';

export default config({
  options: {
    devMode: true,
  },
  initializeGameServer: (gameServer) => {
    gameServer.define('town', TownRoom).filterBy(['instanceKey']);
  },
  initializeExpress: (app) => {
    app.get('/health', (_req: Request, res: Response) => {
      res.status(200).send('ok');
    });
    app.get('/api/characters', handleListCharacters);

    // Serve the built browser client from the same Render service as the
    // Colyseus multiplayer server. Keep API routes above the static middleware.
    app.use(express.static(path.resolve(process.cwd(), 'dist/client')));
  },
});
