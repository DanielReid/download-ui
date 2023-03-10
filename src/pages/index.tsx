import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  return (
    <>
      <Head>
        <title>Youtube downloaden naar Jellyfin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
	  <form>
	    <label>Youtube URL:{' '}            
	      <input id="url" name="url" type="text" onChange={event => event.target.value && setUrl(event.target.value)}/>
	    </label>
            {isDownloading ? <div>Even wachten...</div> : <button onClick={download}>Download</button>}
	  </form>
          {error && <div>Er is iets foutgegaan. Klopt de URL wel?</div>}
          {response && <div>Response: {JSON.stringify(response, null, 2)}</div>}
        </div>
      </main>
    </>
  )

  async function download() {
    setError('');
    setResponse(null);
    setIsDownloading(true);
    try {
      const result = await axios.post('/api/download', {
        url
      });
      setResponse(result.data);
      setIsDownloading(false);
    } catch (e) {
      setResponse(null);
      setError(e as any);
      setIsDownloading(false);
    }
  }
}
