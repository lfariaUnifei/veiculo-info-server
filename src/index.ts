import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Initial config working',
  });
});

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
