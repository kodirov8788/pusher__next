/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import filterSearch from "../../utils/filterSearch";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";
import en from "../../locales/en";
import { MdBusinessCenter } from "react-icons/md"
import { AiFillGift } from "react-icons/ai"
import { RiRadioButtonLine } from "react-icons/ri"
import { FaRegFileVideo } from "react-icons/fa"
import { ImBooks } from "react-icons/im"
import uz from "../../locales/uz";
const MediaCategory = () => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const router = useRouter();
  const { locale, pathname } = router;
  const t = locale === "en" ? en : uz;
  const [categoryId, setCategoryId] = useState("");
  useEffect(() => {
    locale === "en"
      ? setCategoryId("Category")
      : setCategoryId("kategoriyalar")
  }, [locale]);

  return (
    <div className="mediaCategory_container" >
      {categories.map((item) => (<>
        <li className="mediaCategory_listItem"
          onClick={() =>
            setCategoryId(item.name) +
            filterSearch({ router, category: item._id })
          }
          key={item._id}
          value={item._id}
        >
          <span> {item.name === "Business" && <><MdBusinessCenter /><b>{item.name}</b>
          </>
          }
            {item.name === "Online Business" && <><RiRadioButtonLine /><b>{item.name}</b>
            </>}
            {item.name === "video courses" && <><FaRegFileVideo /><b>{item.name}</b>
            </>}
            {item.name === "Books" && <><ImBooks /><b>{item.name}</b>
            </>}
            {item.name === "Gifts" && <><AiFillGift /><b>{item.name}</b>
            </>}
          </span>
        </li>
      </>))}
    </div>
  );
};

export default MediaCategory;
