import "../global.css";
import Head from "next/head";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="shortcut icon" href="/logo.png" />
      <title>TechSA Connect Admin Panel</title>
      <meta name="description" content="TechSA Connect Admin Panel"/>
    </Head>
    <main>
      <Component {...pageProps} />
    </main>
    <Toaster 
      theme={"light"} 
      position={"bottom-right"} 
      offset={"20px"}
      richColors={true}
      toastOptions= {{
        className: 'job-seeker-toaster',
        duration: 5000,
      }}  
    />
  </>
}
