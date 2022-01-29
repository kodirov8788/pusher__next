import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import MediaFooter from "./MediaFooter";
import MediaNavBar from "./Media/MediaNavBar";
import AboutSidebar from "./AboutSidebar";
import Link from "next/link";
import LanguageSelect from "../pages/LanguageSelect";
import { useRouter } from "next/router";

function Layout({ children }) {
  const [route, setRoute] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes("about")) {
      setRoute(true);
    } else {
      setRoute(false);
    }
  }, [router]);

  // console.log("Router", route);
  return (
    <div>
      <NavBar />
      <MediaNavBar />
      <Notify />
      <Modal />
      <MediaFooter />
      {route && <AboutSidebar />}
      {/* <LanguageSelect /> */}
      {children}
    </div>
  );
}

export default Layout;
