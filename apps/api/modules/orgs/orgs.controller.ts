import { Hono } from 'hono';

export const router = new Hono();

router
  .get('/', (c) =>
    c.json([
      {
        id: '1',
        icon: 'https://enouvo.com/wp-content/uploads/2022/07/cropped-logo-vien-trang-file-in-01.png',
        name: 'enouvo',
      },
      {
        id: '2',
        icon: 'data:image/png;base64,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',
        name: 'Axon',
      },
    ])
  )
  .get('/:orgId/channels', (c) =>
    c.json([
      {
        id: '1',
        name: 'Class 1',
        category: {
          id: 1,
          name: 'Class',
        },
      },
      {
        id: '2',
        name: 'Class 2',
        category: {
          id: 1,
          name: 'Class',
        },
      },
      {
        id: '3',
        name: 'Class 1',
        category: {
          id: 2,
          name: 'Class Audio',
        },
      },
      {
        id: '4',
        name: 'Class 2',
        category: {
          id: 2,
          name: 'Class Audio',
        },
      },
    ])
  )
  .get('/:orgId/channels/:channelId/members', (c) =>
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
