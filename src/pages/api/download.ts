// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import youtubeDL from 'youtube-dl-exec';

type Data = {
  result: any
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  youtubeDL(req.body.url, {
    ignoreErrors: true,
    format: "bestaudio",
    extractAudio: true,
    audioFormat: "mp3",
    audioQuality: 160,
    yesPlaylist: true,
    output: "downloads/%(title)s.%(ext)s",
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ]
  }).then((output) => {
    console.log(output);
    res.status(200).json({result: output});
  }).catch((e) => {
    console.log(e);
    res.status(500).json({result: e});
  })
}
