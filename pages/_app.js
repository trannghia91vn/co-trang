import "../styles/globals.css";
import Layout from "../components/layout/layout";
import LabelsProvider from "../store/context/NavbarLabels/labels-provider";

function MyApp({ Component, pageProps }) {
  return (
    <LabelsProvider>
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    </LabelsProvider>
  );
}

export default MyApp;
