import React from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";

const Contact = () => {
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

      <h1>Contact page</h1>
    </div>
  );
};

export default Contact;
