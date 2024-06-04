import Layout from "../components/Layout/layout";
import { ShopContextProvider } from "../context/cartContextProvider";
import globalCSS from "../styles/global.css";

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FIRWL</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="This is my demo shop createn in Next.js by Filip Trajkovic."
        />
        <meta
          property="og:image"
          content="demo-shop-nextjs\public\favicon.png"
        />
      </Head>

      <ShopContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShopContextProvider>
    </>
  );
}
