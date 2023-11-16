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

app.post('/sign-in', async (c) => {
  const { email, password } = await c.req.json();

  if (email === 'son.tran@gmail.com' && password === '!Enouvo123') {
    return c.json({ token: '124' });
  }
  return c.json({ error: 'Invalid email or password' }, 401);
});

app.post('/sign-up', (c) => c.json({ token: '124' }));

export default handle(app);
