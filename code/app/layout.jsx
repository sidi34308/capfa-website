import Head from "next/head";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function Layout({ children }) {
  return (
    <html>
      <Head>
        <title>Capfashion</title>
      </Head>
      <body>
        <div>
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default Layout;
