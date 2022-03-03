import "../styles/globals.css";
import Layout from "../components/layout/layout";
import LabelsProvider from "../store/context/NavbarLabels/labels-provider";
import NotisProvider from "../store/context/Notification/noti-provider";
import { Provider } from "react-redux";
import Store from "../store/redux/store";


function MyApp({ Component, pageProps }) {
  return (
    <NotisProvider>
      <LabelsProvider>
        <Provider store={Store}>
          <Layout>
            <Component {...pageProps} />{" "}
          </Layout>
        </Provider>
      </LabelsProvider>
    </NotisProvider>
  );
}

export default MyApp;
