import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

function VideoDetails({ heading }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [videosData, setVideosData] = useState({});
  const [videourl, setvideourl] = useState(null); // Handle file as null initially
  const [title, settitle] = useState("");
  const [caption, setcaption] = useState("");
  const [section, setsection] = useState("");

  // Fetch data and populate the form fields
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/video/OneVideoData/${id}`);
      const video = response.data.data;

      setVideosData(video);
      settitle(video.title || ""); // Populate the state with fetched data
      setcaption(video.caption || "");
      setsection(video.section || "");
      setvideourl(null); // You cannot set file inputs with a string URL, so handle file upload separately
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/video/deletevideo/${id}`);
      setPopupMessage("Video deleted successfully!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/admin/Video");
      }, 2000);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddNewVideo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("section", section);

    if (videourl) {
      formData.append("videourl", videourl); // Only append file if a new file is selected
    }

    try {
      const response = await axiosInstance.put(
        `/video/updatevideo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setPopupMessage("Video Data updated Successfully!");
      setShowPopup(true);
      await setTimeout(() => {
        setShowPopup(false);
        navigate("/admin/Video");
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to update video data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <h1>{heading}</h1>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleAddNewVideo}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Video Source */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="videourl">
                  Video Source
                </label>
                <input
                  type="file"
                  name="videourl"
                  id="videourl"
                  onChange={(e) => {
                    setvideourl(e.target.files[0]);
                  }}
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
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
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
                  value={caption}
                  onChange={(e) => setcaption(e.target.value)}
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
                  value={section}
                  onChange={(e) => setsection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Section</option>
                  <option value="Glam Heading">Glam Heading</option>
                  <option value="Glam Advertisement">Glam Advertisement</option>
                  <option value="Home Section 1">Home Section 1</option>
                  <option value="Home Section 2">Home Section 2</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between  mt-6">
              <button
                type="button"
                onClick={() => {
                  navigate("/admin/Video");
                }}
                className="px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
                  className="px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-6"
                >
                  Update
                </button>
              </div>

            </div>
          </form>

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
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
