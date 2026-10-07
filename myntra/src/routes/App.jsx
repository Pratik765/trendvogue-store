import { Outlet } from "react-router-dom";
import "../App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/FetchItems";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { ToastProvider } from "../components/Toast";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <ToastProvider>
      <div className="app-root">
        <Header />
        <FetchItems />
        <div className="main-content-area">
          {fetchStatus.currentlyFetching ? <Loading /> : <Outlet />}
        </div>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
