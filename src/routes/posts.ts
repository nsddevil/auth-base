import express from 'express';

const postsRouter = express.Router();

postsRouter.get('/', (req, res) => {
  res.send({ user: req.user });
});

postsRouter.get('/test/1', (req, res) => {
  res.send('test');
});

export default postsRouter;
