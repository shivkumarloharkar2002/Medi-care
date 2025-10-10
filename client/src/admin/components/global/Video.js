import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

function Video(props) {
  const [sectionValue, setSectionValue] = useState("Glam Heading");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div
          className={`cursor-pointer p-4 rounded-lg h-32 shadow-lg flex items-center  bg-gradient-to-r from-blue-400 to-gray-200 to-95%`}
          onClick={() => {
            setSectionValue("Glam Heading");
          }}
        >
          <div>
            <p className="text-white text-lg">Glam Heading</p>
          </div>
        </div>

        <div
          className={`cursor-pointer p-4 rounded-lg h-32 shadow-lg flex items-center  bg-gradient-to-r from-green-400 to-gray-200 to-95%`}
          onClick={() => {
            setSectionValue("Glam Advertisement");
          }}
        >
          <div>
            <p className="text-white text-lg">Glam Advertisement</p>
          </div>
        </div>

        <div
          className={`cursor-pointer p-4 rounded-lg h-32 shadow-lg flex items-center  bg-gradient-to-r from-yellow-500 to-gray-200 to-95%`}
          onClick={() => {
            setSectionValue("Home Section");
          }}
        >
          <div>
            <p className="text-white text-lg">Home Section</p>
          </div>
        </div>

        <div
          className={`cursor-pointer p-4 rounded-lg h-32 shadow-lg flex items-center  bg-gradient-to-r from-red-400 to-gray-200 to-95%`}
          onClick={() => {
            setSectionValue("Service Section");
          }}
        >
          <div>
            <p className="text-white text-lg">Service Section</p>
          </div>
        </div>
      </div>

      <VideoData sectValue={sectionValue} />
    </div>
  );
}

export default Video;

const VideoData = ({ sectValue }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const [videosData, setVideosData] = useState([]); // State to hold videos
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/video/allvideo`);

      setVideosData(response.data.data); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(videosData);

  const handleAddVideo = () => {
    setShowAddForm(true);
  };

  const handleCardClick = (video) => {
    navigate(`/admin/videoDetails/${video._id}`);
  };

  // post video data

  const [videourl, setvideourl] = useState("");
  const [title, settitle] = useState("");
  const [caption, setcaption] = useState("");
  const [section, setsection] = useState("");
  // const [newVideo, setNewVideo] = useState({
  //     videourl: null,
  //     title: "",
  //     caption: "",
  //     section: "",
  // });

  const handleAddNewVideo = async (e) => {
    e.preventDefault();

    // Creating a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("videourl", videourl);
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("section", section);

    try {
      const response = await axiosInstance.post("/video/addvideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("New video added:", response.data);
      // Optionally, reset the form after successful submission
      setPopupMessage("New video Data added");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);

        setShowAddForm(false);
      }, 2000);
    } catch (error) {
      // await setPopupMessage('Failed to add video:', error.response?.data.msg || error.message);
      setPopupMessage(
        "A video already exists in this section. You cannot add another one."
      );
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowAddForm(false);
      }, 2000);
      console.log(
        "Failed to add video:",
        error.response?.data.msg || error.message
      );
    }
  };

  // cancel
  const handleCancel = () => {
    setShowAddForm(false);
    setvideourl("");
    settitle("");
    setcaption("");
    setsection("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* add video button */}
      <div className="container mx-auto p-4 w-fita">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div
            className="w-full md:w-1/3 px-4 py-2 mb-4 md:mb-0  rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            // onChange={(e) => setFilter(e.target.value)}
            defaultValue=""
          >
            <p>{sectValue}</p>
          </div>
          <button
            onClick={handleAddVideo}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Video
          </button>
        </div>

        {/* display form on click on add video button */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4  text-center">
              Add New Video
            </h3>
            <form onSubmit={handleAddNewVideo}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Video Source */}
                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="videourl"
                  >
                    Video Source
                  </label>
                  <input
                    type="file"
                    name="videourl"
                    id="videourl"
                    onChange={(e) => {
                      setvideourl(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => {
                      settitle(e.target.value);
                      console.log(title);
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Caption */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1" htmlFor="caption">
                    Caption
                  </label>
                  <textarea
                    name="caption"
                    id="caption"
                    onChange={(e) => {
                      setcaption(e.target.value);
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  ></textarea>
                </div>

                {/* Section */}
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="section">
                    Section
                  </label>
                  <select
                    name="section"
                    id="section"
                    onChange={(e) => {
                      setsection(e.target.value);
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="">Select Section</option>
                    <option value="Glam Heading">Glam Heading</option>
                    <option value="Glam Advertisement">
                      Glam Advertisement
                    </option>
                    <option value="Home Section">Home Section</option>
                    <option value="Service Section">Service Section</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 mr-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        )}

        {showPopup && (
          <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-600 text-white rounded-lg shadow-lg border border-green-700 z-50 transition-transform transform scale-100 animate-fade-in">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m0 0L5 7m14 10h-1m1 0h-1m-1 0H7"
                />
              </svg>
              <span className="font-semibold">{popupMessage}</span>
            </div>
          </div>
        )}

        {/* category vise video data */}
        <div className="grid sm:grid-cols-2  w-full">
          {Array.isArray(videosData) ? (
            videosData.map((video) => {
              if (video.section === sectValue) {
                // console.log(video.section)
                // console.log(video._id)

                return (
                  <div
                    key={video._id}
                    className="bg-white  min-h-3.5 p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 "
                    // onClick={() => handleCardClick(video)}
                  >
                    <video
                      src={video.videourl}
                      autoPlay
                      muted
                      loop
                      controls
                      className=" w-[96vw] h-72"
                    ></video>

                    <div onClick={() => handleCardClick(video)}>
                      <p className="text-gray-600">
                        {" "}
                        <span className="font-bold text-black capitalize">
                          {video.title}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        {" "}
                        <span className=" text-black">{video.caption}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <h1>No Data Found</h1>
          )}
        </div>
      </div>
    </>
  );
};
