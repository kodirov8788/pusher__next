/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";


const ProductsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
    sale: "",
    book: "",
  };
  const videoInitial = {
    video_1: "",
    video_2: "",
    video_3: "",
    video_4: "",
    video_5: "",
    video_6: "",
    video_7: "",
    video_8: "",
    video_9: "",
    video_10: "",
  };

  const videoInitialModule = {
    videoModule_1: "",
    videoModule_2: "",
    videoModule_3: "",
    videoModule_4: "",
    videoModule_5: "",
    videoModule_6: "",
    videoModule_7: "",
    videoModule_8: "",
    videoModule_9: "",
    videoModule_10: "",
    videoModule_11: "",
    videoModule_12: "",
    videoModule_13: "",
    videoModule_14: "",
    videoModule_15: "",
    videoModule_16: "",
    videoModule_17: "",
    videoModule_18: "",
    videoModule_19: "",
    videoModule_20: "",
    videoModule_21: "",
    videoModule_22: "",
    videoModule_23: "",
    videoModule_24: "",
    videoModule_25: "",
    videoModule_26: "",
    videoModule_27: "",
    videoModule_28: "",
    videoModule_29: "",
    videoModule_30: "",
    videoModule_31: "",
    videoModule_32: "",
    videoModule_33: "",
    videoModule_34: "",
    videoModule_35: "",
    videoModule_36: "",
    videoModule_37: "",
    videoModule_38: "",
    videoModule_39: "",
    videoModule_40: "",
    videoModule_41: "",
    videoModule_42: "",
    videoModule_43: "",
    videoModule_44: "",
    videoModule_45: "",
    videoModule_46: "",
    videoModule_47: "",
    videoModule_48: "",
    videoModule_49: "",
    videoModule_50: "",
  };


  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;
  const [product, setProduct] = useState(initialState);
  const { sale, title, price, inStock, description, content, category, book } =
    product;
  // --------------- video upload--------------------
  const [videoInput, setVideoInput] = useState(false);
  const [pdfInput, setPdfInput] = useState(false);
  const [categoryArr, setCategoryArr] = useState('');
  const [videoSelect, setVideoSelect] = useState("videos");
  // console.log("videoSelect", videoSelect);
  useEffect(() => {
    const x = (categories?.filter(item => item?._id === category)).map(item => item.name)
    return setCategoryArr(x)
  }, [category]);

  useEffect(() => {
    if (categoryArr == ('video courses')) {
      setVideoInput(true), setPdfInput(false);
    } else if (categoryArr == ('Books')) { setPdfInput(true), setVideoInput(false) } else { setPdfInput(false), setVideoInput(false) }
  }, [categoryArr]);
  // console.log("categoryArr", categoryArr);
  // console.log("videoInput", videoInput);
  // console.log("pdfInput", pdfInput);
  // --------------- end of video upload--------------------
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(videoInitial);
  const [videoMudule, setVideoModule] = useState(videoInitialModule);
  // console.log("video >>>", video);
  console.log("videoMudule", videoMudule);

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleVideoInput = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleVideoInputModule = (e) => {
    const { name, value } = e.target;
    setVideoModule({ ...videoMudule, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 3000 * 3000)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };
  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media], video, videoMudule },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });

  };

  return (
    <div
      className="products_manager"
      style={{ width: "90%", margin: "0 auto" }}
    >
      <Head>
        <title>Products Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="price">In Stock</label>
              <input
                type="number"
                name="inStock"
                value={inStock}
                placeholder="inStock"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Content"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={content}
          />

          <div className="input-group-prepend px-0 my-2">
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="all">All Products</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-info my-2 px-4">
            {onEdit ? "Update" : "Create"}
          </button>
        </div>
        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>
          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />
                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
          <div className="col-sm-6">
            <label htmlFor="sale">Sale</label>
            <input
              type="number"
              name="sale"
              value={sale}
              placeholder="sale product"
              className="d-block w-100 p-2"
              onChange={handleChangeInput}
            />
          </div>

          {videoInput ? (<>

            <div className="col-sm-6 my-2 ">
              <select
                name="videoSelect"
                id="videoSelect"
                value={videoSelect}
                onChange={(e) => setVideoSelect(e.target.value)}
                className="custom-select text-capitalize"
              >
                <option value="videos">videos</option>
                <option value="videosModule">videosModule</option>
              </select>
            </div>
            {videoSelect === "videos" ?
              <div className="create__videos">
                <label htmlFor="video link">Video links</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_1"
                    value={video.video_1}
                    placeholder="video_1 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_2"
                    value={video.video_2}
                    placeholder="video_2 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_3"
                    value={video.video_3}
                    placeholder="video_3 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_4"
                    value={video.video_4}
                    placeholder="video_4 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_5"
                    value={video.video_5}
                    placeholder="video_5 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_6"
                    value={video.video_6}
                    placeholder="video_6 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_7"
                    value={video.video_7}
                    placeholder="video_7 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_8"
                    value={video.video_8}
                    placeholder="video_8 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_9"
                    value={video.video_9}
                    placeholder="video_9 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="video_10"
                    value={video.video_10}
                    placeholder="video_10 link"
                    className="d-block w-100 p-2"
                    onChange={handleVideoInput}
                  />
                </div>
              </div>
              :
              <div className="create__videosContainer">
                <div className="create__videosInputCollection">
                  <label htmlFor="video link">Videos Module</label>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_1"
                      value={videoMudule.videoModule_1}
                      placeholder="videoModule_1 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_2"
                      value={videoMudule.videoModule_2}
                      placeholder="videoModule_2 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_3"
                      value={videoMudule.videoModule_3}
                      placeholder="videoModule_3 link"
                      className="2"
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_4"
                      value={videoMudule.videoModule_4}
                      placeholder="videoModule_4 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_5"
                      value={videoMudule.videoModule_5}
                      placeholder="videoModule_5 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_6"
                      value={videoMudule.videoModule_6}
                      placeholder="videoModule_6 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_7"
                      value={videoMudule.videoModule_7}
                      placeholder="videoModule_7 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_8"
                      value={videoMudule.videoModule_8}
                      placeholder="videoModule_8 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_9"
                      value={videoMudule.videoModule_9}
                      placeholder="videoModule_9 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_10"
                      value={videoMudule.videoModule_10}
                      placeholder="videoModule_10 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                </div>
                <div className="create__videosInputCollection">
                  <label htmlFor="video link">Module Group 2</label>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_11"
                      value={videoMudule.videoModule_11}
                      placeholder="videoModule_11 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_12"
                      value={videoMudule.videoModule_12}
                      placeholder="videoModule_12 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_13"
                      value={videoMudule.videoModule_13}
                      placeholder="videoModule_13 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_14"
                      value={videoMudule.videoModule_14}
                      placeholder="videoModule_14 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_15"
                      value={videoMudule.videoModule_15}
                      placeholder="videoModule_15 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_16"
                      value={videoMudule.videoModule_16}
                      placeholder="videoModule_16 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_17"
                      value={videoMudule.videoModule_17}
                      placeholder="videoModule_17 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_18"
                      value={videoMudule.videoModule_18}
                      placeholder="videoModule_18 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_19"
                      value={videoMudule.videoModule_19}
                      placeholder="videoModule_19 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_20"
                      value={videoMudule.videoModule_20}
                      placeholder="videoModule_20 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                </div>

                <div className="create__videosInputCollection">
                  <label htmlFor="video link">Module Group 3</label>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_21"
                      value={videoMudule.videoModule_21}
                      placeholder="videoModule_21 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_22"
                      value={videoMudule.videoModule_22}
                      placeholder="videoModule_22 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_23"
                      value={videoMudule.videoModule_23}
                      placeholder="videoModule_23 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_24"
                      value={videoMudule.videoModule_24}
                      placeholder="videoModule_24 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_25"
                      value={videoMudule.videoModule_25}
                      placeholder="videoModule_25 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_26"
                      value={videoMudule.videoModule_26}
                      placeholder="videoModule_26 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_27"
                      value={videoMudule.videoModule_27}
                      placeholder="videoModule_27 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_28"
                      value={videoMudule.videoModule_28}
                      placeholder="videoModule_28 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_29"
                      value={videoMudule.videoModule_29}
                      placeholder="videoModule_29 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_30"
                      value={videoMudule.videoModule_30}
                      placeholder="videoModule_30 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                </div>

                <div className="create__videosInputCollection">
                  <label htmlFor="video link">Module Group 4</label>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_31"
                      value={videoMudule.videoModule_31}
                      placeholder="videoModule_31 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_32"
                      value={videoMudule.videoModule_32}
                      placeholder="videoModule_32 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_33"
                      value={videoMudule.videoModule_33}
                      placeholder="videoModule_33 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_34"
                      value={videoMudule.videoModule_34}
                      placeholder="videoModule_34 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_35"
                      value={videoMudule.videoModule_35}
                      placeholder="videoModule_35 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_36"
                      value={videoMudule.videoModule_36}
                      placeholder="videoModule_36 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_37"
                      value={videoMudule.videoModule_37}
                      placeholder="videoModule_37 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_38"
                      value={videoMudule.videoModule_38}
                      placeholder="videoModule_38 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_39"
                      value={videoMudule.videoModule_39}
                      placeholder="videoModule_39 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_40"
                      value={videoMudule.videoModule_40}
                      placeholder="videoModule_40 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                </div>

                <div className="create__videosInputCollection">
                  <label htmlFor="video link">Module Group 5</label>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_41"
                      value={videoMudule.videoModule_41}
                      placeholder="videoModule_41 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_42"
                      value={videoMudule.videoModule_42}
                      placeholder="videoModule_42 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_43"
                      value={videoMudule.videoModule_43}
                      placeholder="videoModule_43 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_44"
                      value={videoMudule.videoModule_44}
                      placeholder="videoModule_44 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_45"
                      value={videoMudule.videoModule_45}
                      placeholder="videoModule_45 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_46"
                      value={videoMudule.videoModule_46}
                      placeholder="videoModule_46 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_47"
                      value={videoMudule.videoModule_47}
                      placeholder="videoModule_47 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_48"
                      value={videoMudule.videoModule_48}
                      placeholder="videoModule_48 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_49"
                      value={videoMudule.videoModule_49}
                      placeholder="videoModule_49 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="videoModule_50"
                      value={videoMudule.videoModule_50}
                      placeholder="videoModule_50 link"
                      className=""
                      onChange={handleVideoInputModule}
                    />
                  </div>
                </div>

              </div>
            }

          </>
          ) : (
            ""
          )}
          {pdfInput ? (
            <div className="col-sm-6">
              <label htmlFor="book's link">Book's link</label>
              <input
                type="text"
                name="book"
                value={book}
                placeholder="book's link"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form >
    </div >
  );
};

export default ProductsManager;
