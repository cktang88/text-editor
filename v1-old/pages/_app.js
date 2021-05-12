// custom app to inject Tailwind on every component https://nextjs.org/docs/advanced-features/custom-app

// quill css
import "react-quill/dist/quill.snow.css";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
