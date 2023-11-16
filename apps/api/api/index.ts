import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.post('/sign-in', (c) => c.json({ token: '124' }));
app.post('/sign-up', (c) => c.json({ token: '124' }));

export default handle(app);
