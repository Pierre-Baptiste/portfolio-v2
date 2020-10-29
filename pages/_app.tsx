import "styles/index.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { messages } from "messages";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  return (
    <IntlProvider
      locale={locale || defaultLocale}
      messages={messages[locale || defaultLocale]}
    >
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App;
