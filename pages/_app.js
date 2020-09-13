// custom app to inject Tailwind on every component https://nextjs.org/docs/advanced-features/custom-app

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
