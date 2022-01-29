import React from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";

const Shipping = () => {
  return (
    <div className="about__container">
      <li>
        <Link href="/">
          <a>
            <BiChevronLeftCircle />
            <span>Back</span>
          </a>
        </Link>
      </li>
      <h1>The shipping</h1>
    </div>
  );
};

export default Shipping;
