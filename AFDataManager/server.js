const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; //npm install --save @ffmpeg-installer/ffmpeg
const ffmpeg = require('fluent-ffmpeg'); 
ffmpeg.setFfmpegPath(ffmpegPath);

app.get('/api/:id', (req, res) => {
  const id  = req.params.id;
  const stream = ytdl(id, { quality: 'highestaudio' });

  const ffmpegProcess = ffmpeg(stream)
    .audioBitrate(320)
    .save(`${__dirname}/${id}.mp3`)
    .on('end', () => {
      console.log('Audio processing complete');
      res.status(200).send('Audio processing complete');
    })
    .on('error', (err) => {
      console.error('Error processing audio:', err);
      res.status(500).send('Error processing audio');
    });

});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});