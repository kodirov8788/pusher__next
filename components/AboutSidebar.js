import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
const AboutSidebar = () => {
  const [routerClick, setRouterClick] = useState("about");
  // useEffect(() => {}, [routerClick]);
  console.log("RouterClick", routerClick);
  const router = useRouter();
  return (
    <div className="about__page">
      <h1>Our Services</h1>
      <div
        className={
          routerClick !== "about"
            ? "about__listItem__container short "
            : "about__listItem__container"
        }
      >
        <li onClick={() => setRouterClick("about")}>
          <Link href="/about/aboutus">
            <a
              className={
                router.pathname.includes("/aboutus") && "Sidebar__activeItem"
              }
            >
              {routerClick !== "about" ? (
                <BiChevronDownCircle />
              ) : (
                <BiChevronUpCircle />
              )}
              About us
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "about" && "about__listItem"}
          onClick={() => setRouterClick("about")}
        >
          <Link href="/about/connect">
            <a
              className={
                router.pathname.includes("/connect")
                  ? "Sidebar__activeItem"
                  : ""
              }
            >
              connect us
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "about" && "about__listItem"}
          onClick={() => setRouterClick("about")}
        >
          <Link href="/about/delevery">
            <a
              className={
                router.pathname.includes("/about/delevery") &&
                "Sidebar__activeItem"
              }
            >
              Delevery
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "about" && "about__listItem"}
          onClick={() => setRouterClick("about")}
        >
          <Link href="/about/contact">
            <a
              className={
                router.pathname.includes("/about/contact") &&
                "Sidebar__activeItem"
              }
            >
              Contact
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "about" && "about__listItem"}
          onClick={() => setRouterClick("about")}
        >
          <Link href="/about/services">
            <a
              className={
                router.pathname.includes("/about/services") &&
                "Sidebar__activeItem"
              }
            >
              Services
            </a>
          </Link>
        </li>
      </div>
      <div className={routerClick !== "BuyProduct" ? "short " : "long"}>
        <li onClick={() => setTimeout(() => setRouterClick("BuyProduct"), 500)}>
          <Link href="/about/blog">
            <a
              className={
                router.pathname.includes("/blog") && "Sidebar__activeItem"
              }
            >
              {routerClick !== "BuyProduct" ? (
                <BiChevronDownCircle />
              ) : (
                <BiChevronUpCircle />
              )}
              The blog
            </a>
          </Link>
        </li>
        <li onClick={() => setRouterClick("BuyProduct")}>
          <Link href="/about/faqs">
            <a
              className={
                router.pathname.includes("/faqs") ? "Sidebar__activeItem" : ""
              }
            >
              FAQs
            </a>
          </Link>
        </li>
        <li onClick={() => setRouterClick("BuyProduct")}>
          <Link href="/about/ordertraking">
            <a
              className={
                router.pathname.includes("/ordertraking") &&
                "Sidebar__activeItem"
              }
            >
              The order
            </a>
          </Link>
        </li>
        <li onClick={() => setRouterClick("BuyProduct")}>
          <Link href="/about/shipping">
            <a
              className={
                router.pathname.includes("/shipping") && "Sidebar__activeItem"
              }
            >
              The shipping
            </a>
          </Link>
        </li>
      </div>

      <div className={routerClick !== "address" ? "short " : "long"}>
        <li onClick={() => setTimeout(() => setRouterClick("address"), 500)}>
          <Link href="/about/office">
            <a
              className={
                router.pathname.includes("/office") && "Sidebar__activeItem"
              }
            >
              {routerClick !== "address" ? (
                <BiChevronDownCircle />
              ) : (
                <BiChevronUpCircle />
              )}
              Office
            </a>
          </Link>
        </li>
        <li onClick={() => setRouterClick("address")}>
          <Link href="/about/production">
            <a
              className={
                router.pathname.includes("/production")
                  ? "Sidebar__activeItem"
                  : ""
              }
            >
              Production
            </a>
          </Link>
        </li>
        <li onClick={() => setRouterClick("address")}>
          <Link href="/about/number">
            <a
              className={
                router.pathname.includes("/number") && "Sidebar__activeItem"
              }
            >
              Phone
            </a>
          </Link>
        </li>
      </div>
    </div>
  );
};

export default AboutSidebar;
