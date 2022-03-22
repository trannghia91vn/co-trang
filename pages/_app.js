import "../styles/globals.css";
import Layout from "../components/layout/layout";
import LabelsProvider from "../store/context/NavbarLabels/labels-provider";
import { Provider } from "react-redux";
import Store from "../store/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <LabelsProvider>
      <Provider store={Store}>
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      </Provider>
    </LabelsProvider>
  );
}

export default MyApp;
