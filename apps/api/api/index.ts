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

app.get('/orgs/:orgId/channels/:channelId/members', (c) =>
  c.json([
    {
      id: 1,
      name: 'John',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      roles: ['Admin', 'F0'],
      backgroundColor: '#d40000',
      category: {
        id: 1,
        name: 'Đà Nẵng',
      },
    },
    {
      id: 2,
      name: 'Tin Nguyen',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      roles: ['Học viên'],
      backgroundColor: '#d40000',
      category: {
        id: 2,
        name: 'Online',
      },
    },
    {
      id: 3,
      name: 'Son Tran',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      roles: ['Học viên'],
      backgroundColor: '#d40000',
      category: {
        id: 2,
        name: 'Online',
      },
    },
  ])
);

export default handle(app);
