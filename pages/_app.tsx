import "styles/index.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <IntlProvider locale={router.locale || router.defaultLocale}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App;
