import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import gammingLogo from '../public/gamming-logo.svg';

const Layout = ({ children, title = 'Gamming Site' }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header_box">
        <Link href="/" passHref>
          <a>
            <Image
              src={gammingLogo}
              width={50}
              height={50}
              alt="Picture of the gamming"
            />
            <p> Gamming Hub</p>
          </a>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
