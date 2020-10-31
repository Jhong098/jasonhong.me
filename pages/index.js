import Head from "next/head";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jason Hong</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Footer />
    </div>
  );
}
