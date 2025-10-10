import React, { useState, useEffect } from "react";
import axiosInstance from "./../../axiosConfig.js";
import Navbar from "../../component/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

import "./glam.css";
import Footer from "../../component/Footer/Footer.js";
import Resultone from "../../assets/images/Result/result1.jpeg";
import Resulttwo from "../../assets/images/Result/result2.jpeg";
import Resultthree from "../../assets/images/Result/result3.jpeg";

// First Component
const VideoSection = () => {
  const [videosData, setVideosData] = useState([]); // State to hold videos
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/video/allvideo");

      setVideosData(response.data.data); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(videosData);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-screen z-8 sm:mt-[105px]  ">
      {videosData.map((video, index) => {
        if (video.section === "Glam Heading") {
          return (
            <video
              src={video.videourl}
              autoPlay
              muted
              loop
              controls
              className=" w-full h-5/6"
            ></video>
          );
        }
      })}
    </div>
  );
};

// Second Component

const TrustedBySection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-[-40px] sm:mt-[-40px]">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-200  p-4 text-center">
          <h2 className="text-2xl text-black font-bold">
            Trusted By thousands
          </h2>
          <p className="text-lg">
            Supported and trusted by millions of users and recognised in 200+
            countries
          </p>
        </div>
      ))}
    </div>
  );
};

// Third Component
const IntroductorySection = () => {
  const [videosData, setVideosData] = useState([]); // State to hold videos
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/video/allvideo");

      setVideosData(response.data.data); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(videosData);

  useEffect(() => {
    getData();
  }, []);

  const [doctorsData, setDoctorsData] = useState([]);
  const docData = async () => {
    try {
      const response = await axiosInstance.get("/auth/findDoctorsByRole");
      // const filteredDoctors = response.data.doctors
      //   .filter((item) => item.role === "Doctor")
      //   .sort((a, b) => a.specialty.localeCompare(b.specialty)); // Sort by specialty name

      // console.log(filteredDoctors);
      setDoctorsData(response.data.doctors); // Store filtered and sorted doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    docData();
  }, []);
  const navigate = useNavigate();

  // Check if user is log in
  const isLoggedIn = localStorage.getItem("token");

  const handleMakeAppointmentClick = () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to make an appointment.");
      navigate("/login"); // Redirect to login page
    } else {
      doctorsData.map((doc) => {
        if (doc.fullName == "Shraddha Dhawale") {
          navigate(`/appointment/${doc._id}`);
        }
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-white">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 p-4">
        {videosData.map((video, index) => {
          if (video.section === "Glam Advertisement") {
            return (
              <video
                src={video.videourl}
                autoPlay
                muted
                loop
                controls
                className=" w-full h-96"
              ></video>
            );
          }
        })}
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-1/2 p-4">
        <h2
          className="text-2xl md:text-3xl font-bold"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          Welcome to my community, Shraddha Dhawale
        </h2>
        <p className="mt-4 text-base md:text-base">
          Growing up in India, I faced significant challenges with severe acne
          and scarring, and the negative comments from those around me were
          difficult to endure. This experience drove me to establish a medical
          practice that blends empathy with cutting-edge innovation. My team and
          I are dedicated to providing specialized care for all skin types and
          tones, exclusively using treatments that are scientifically validated.
          So join us in this new adventure where every care is personal and get
          yourself more glowy and glassy.
        </p>

        {/* Consult Button */}
        {/* <Link to="/appointment"> */}
        <button
          className="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
          onClick={handleMakeAppointmentClick}
        >
          Book Appointment
        </button>
        {/* </Link> */}

        {/* Signature */}
        <div className="text-right mt-4">
          <p className="font-semibold">– Dr.Shraddha Dhawale</p>
          <p className="text-gray-500">B.H.M.S.PGDEMS</p>
        </div>
      </div>
    </div>
  );
};

const DynamicCheckupCard = () => {
  const checkupItems = [
    {
      id: 1,
      title: "ACNE >",
      src: "https://plus.unsplash.com/premium_photo-1706557115599-c5ce88552cdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNuZSUyMGZhY2UlMjBob3NwaXRhbHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Blackheads >",
      src: "https://plus.unsplash.com/premium_photo-1682088209248-c9cac22df472?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2toZWFkfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "Surgical Procedure >",
      src: "https://images.unsplash.com/photo-1633219664572-473fd988a44f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1cmlnY2FsJTIwaG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      title: "Pimples >",
      src: "https://plus.unsplash.com/premium_photo-1679750867410-7f226618d3e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGltcGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    // { id: 5, title: "ACNE >", src: "https://plus.unsplash.com/premium_photo-1706557115599-c5ce88552cdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNuZSUyMGZhY2UlMjBob3NwaXRhbHxlbnwwfHwwfHx8MA%3D%3D" },
    {
      id: 5,
      title: "",
      src: "    https://www.fixderma.com/cdn/shop/articles/Skin_Problems_in_Women.jpg?v=1697178883",
    },
    {
      id: 6,
      title: " ",
      src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEBIWFhUVFRUVFRYWFRUVFxgVFRUWGBYYFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0dHR0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAMEBQYCBwj/xAA9EAABAwIDBQYEBQIGAgMAAAABAAIRAyEEEjEFQVFhcQYTIoGRsTKhwfAHQlLR4RRiIzNygsLxorIVQ3P/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAgEQEBAQEAAwEAAgMAAAAAAAAAAQIRAxIhMTJBBBNC/9oADAMBAAIRAxEAPwC+auwuQuwqSKK5RQYpIIoIUkEkAUkEkwKdw9Fz3BjRJcYCaWr7M7NyN71w8Th4eTePU+3VFEW+CwwpU2sG4a8TvPqnd6LUHjeoWJWZ7VsIpki3PhNpWnCrNu4HvqT2aFzSJ6gwlTzfrzzBbaP9TTaD4WsMDkSAPYr0fAVw4AheH7Hrn+pqONsvhjhlsfnK9d7HUXml3r9Hf5Y/t/V57vXelF7aDcmKlcBd16gAJJAWd2pjwGFwKpmlbRxobqbBwB5tcJHyDvRUr9pZmlpPia7L5if2Pqs/jNqOeIJtmLj0DQB9VCZiSXSeOY9bn3dCXVcazD7SDiG1II3TdS20MPVMfAdzhp5hY5tVTcDjiXRMDd5o9i9VntHAuouyugyJBGhCirQupitRIcbs0PCVnlUvUWEkkkmQJIoIBJFJJAclckLsrkoBuEF3CCA6CKCKAKSCSA6SQRQBSQSQBSSSQFjsPAd/UAPwtu7puHn7StuQs92SMNfbVwvxtpPL6rRhKqhum5OESmHjKZ3H3TrHJGDCunCyFRs6apl9WAS4wPuUB899ucU/BYnEU2PiscSXBvdMymhUbnY81DJLsxykCNHL3Xsxje9wOFrEAZ8PReQ0QBmptMAcLrwP8Z8UypjmOaRm7qHAG4DXuLJ53cvTvwz7RsqbKpZnNBoh1BwkSAw/4dubC1H9Hf1dbZxbnVC0XsLeqym2sfAyk6axx4J7am2B4i0m+/UkDQAeaxmMxZe69gNB+/NStP8A6hz92Uep8gpFEKtw71NbiABKQSnvyhCjUuIVfWrzr9k6fL3UzCOAgngkGt2O49zWM6sPqFl9k7VsA5XT8aW4SqRAlpA/dYmg6NFnvVzZxp48zUvW5a8HRFZ7A44hXNDFBy0x5pf1nvw2fiQgigtmJJJIIIkCigUBykikgAigkgCigigEigkgCkkkgEkkkmG32U0dxTDf0gjmYk+dyp1GrKoOzWOBZ3bjdunQ3t0Ktq4cPEy53jSenNRVJpvqmHHIeXH91xhMYH23jUaKS4Ai+iALXSqztHhO9ouaHlji0gPbq0/XomcbjP6dzQ5xyuMN5ECY9AdVS9qe07GU3NpnO/IYa25k9OH1SqpPrwzZeBoYjaD6eOqZWta7Mc+UuqN0aHHWZNhewVMcUcHiH924gNeWxJGZgcYzDpfkoGMxlZlWoc7muc52bK4jUmQY9lXp/wBFf3r1zZW1qOJY5wzNNN2S4EzEyBe37Jqq4N/NI56rG9nsaWveB+drXeYsfdaChLjLtUqqLGiS7Sw+nE8AiK+Y/wBov/JUfEV4blbqfiP0UapVAEE3Ov0AU1S1wVXMS92g0HMqfhnyb77npuVVgnggCOg48yrLvBJmwGp5BSEnbWOmm1g3/wDqNFT0Sua1c1HF3pyG5OUwsN3tdOJyJNMqbRrQoLE+xZ1a9w2N4qaysCs/TepNOqQnnes/ideOaXMpKDSxKkMqrpx55f1zb8Fn4eQSBSW/esASSSTIEkEkAUUEUAUkEUAkUEkAUEkkyFriDIMHkrDDbYqN18Q52Vckg+pFfaFV9QPkMibNuXf6iQrTD9o3gQ4AnjB+YVIglw/ZO2vtE13D9Ld+kmOG4XUIJJBOThW9eK9t9iVRj6wo0nvD3CoMjHO/zAHHQfqLlEw/YzGvaXGjkaJkvc1sRrLfi+S93lQqtMFz2nRwBPRwLSP/AA+aXB1kezH4e/072Va9YPLQfAxvgOYGznO+IX/SFYdo+z8DvMOIgeJo9wtFs15NNs6gZT1Ycp9lJRwdryGo6oLWHNGg0AyTJ+S9H2psCjWBIaGv3OFr8wvO9qYepQcWERHz5rPU40zepTa0fEY5DVF+KL7CzRu+pVK1xm6mUKix03zJFthypTVX0KinU3rOtYksT7SozCnmlRYpJpuT7SojU9TcpVEppT7KijNKcaUjTaGJymTdW5w4qND6fmFnVc9msRDizcbj6rfw+Sy8YebxyzoGi4flPoktWwgjRJdfXFxjkUEVRCEkkkAUkEkEKKCSAKSSSASSKSYJKEkUAIRSTNXFMZZzgN9yAgHlHxI8TDxzN9Rm/wCB9VRdoe19PDQGZajjOjhAAG8jyVRhu2pxLX0i0U6kB1MtcD4gQQ3xRc3CBxrtl1QTUA/UHAW0cL/NrvVT1lsPt9jS1z5D3shzM9M6AOORrXE5fiuYBnWbKVie0tPue9YRJs1p1LuFkodi+zDTeq7bWyWYlsO+IfCVkT2mJbd5a5sl4sHEmwibXPDQBXOwts1KlKagzPPwNbE5dAXu0F/so/S/GP2nsx1Fxa8R9QobbL0faOBbVbFVzc3KXQeULC7TwvdOImRxiJ9VlrPG+NuaL1Oo1VU06m5S6dRY2N86W1OopDXqrpVFLp1FnY0lT6b0610KHTenw5RVJzHJ5jlApvUlj0lJBKm7GfFZvmq3Mp2xb1hyBVZ/lE7/AI1smVLIJqkZCS7HAzyIQSWrMUUEUAkkkUESSSKASKQRTBJQomPx7KLS525YLb/bKtcMLWN5CXHhMz7I6fG22jtujQJa8mQMzsrS7KCYBdwlZLbPbuQ4YcRBbDjrGZoNvMrDvxL6pJc5xk3Jk9JTJsS074g8IIcPmFPsfq1eD7e4gFzSWuAsMzZOpjT83LkoOO21UqFxc8kxJdEHKP0gGAN1iqGpQygunVwOrSNHTdulibwuKVXuoi+8CQTctm4tENAjml0+Di6Rc4ib/UX13atvzTNBjqZD2HxSMpIgEi4A3yY3xKk06odIJHiGUQb5bgE8zp/tC6eYM2vF7HmQ3eJiN0SdUGtNpwMXlH5v8NhvdrxLNCIAD2jfoqjO+M2Y5YLoncBMTx03aK5GFq4s0Rh2Zqj2uYA10NmkAAHG0eAMJkiMw4qv27RNGvWpvhrmuqsiRYkyG66CYnRBU1SxRZWFSoMwaRrviACRqQtjsrtCwBwBEZi6Tz5DW825hefV4IgO04bzxI1nncdNEzSrPYQWkiD7J9HHoWP23UPhzlpOjGtBdG7Nub81S43FVDYud0JH0aqOntE6lxk6nefNS6WNBFzM6iYSBp+KqN3SOisMBtUGx9N/8qBiXhwndyEfNQHC9j66qblc1xt6NYESCpVOqsXgNqOYYcfvmtPhcSHtDhv+7rHWeNs76tqdRSWVFV06ikU6iysayrIPTrKqgCouhUUcXKsxVVv2f1c7yCzLay1mxqWVrW/7itPHn71Hm1zPGipvAACKhAl1+KC6OuRXpJJLZkKKCKASKCKASIQRQTpVe2tsU8O3xG5EwLnyCj9qNvswdMknxn4R/G88uS8d2ttJ2IcXPeTmMk6jWwPEDy6JWqkXW3O1j8QS1tmzY6qpwtHMZcR1mVX9wd0EqVhabnTF41j791Kl06lkHwkgb5MD5KoxD8zxMAg+V/5hXGGfLL+Ejfx68PZVOKJzw6JnXSfLrzKAf+B4n4XC44H74KQ+lSyzA3nQ8bx8vZRKz8zmnlB4A/SZMJzF1wGiNBPsTf005wgBhe51gWcBpBvoADc9fmpOLfTqMzTpezXT8JmOvi+yoncZDI0PvMjz+LyQYQ0BvEx5S4/QIC07O7cGGeHUrwRUyQ7KXMGY2i3hBBI/tN4EV3aLEU61V9S5NR/eHWfGMxknXUJjA0wyqxx0DmkRJ0PisATEKXiW0xGS8AZibCb/AAjWIgX4TwS6fEBtNh/L6AH3XD8O0TBjyIPTSCpJYw3c703+qYcKf6jbz+v0TJDfQnSBxCXcyJG71/65p4kbiV0G9UAGYi1xdN1Mh5cQlVpXnjqmKrTvQDrmAhPbLxzqLtfCdRx6c1FbMWXJM9QiwSt3h6ocJaZBUgOWY2Di8tjpMEcOfRaYMWGsujOjzai7D1HiFIwuHNQ8t5UevV+/FhsehmdmOg05lamlUgQNXeyo6dRtMADdoOJU/C1DLZ+JxnoFtnPIw1r2vWsw4AaBySUUYmLJKkICKCK1ZikkigEigiEAlD2rje5Z4QC42aDxjf6KY4wvPfxE2vlbkYfE/O0boY3/ADHdXHw9AgRiu0+1O/rOLXZhPxm+cwAT/p4Dgqyk8g6ctY9d3yTQbKsNn4cPN/vgpWkUMPmjcfQ9In6qfVw+W4iedgRob7uhTTi0WJ0F+nEdNf8Aoo1cTI/aYPNIC3F24HdOvOTx+76qtxTQ67LcRuA5cOnouagM+EiN/DzCZdUn4beeqAcNcuEcI4TI39f3KPeEjj9/yU1TvY/W38KbQoab5sSPKBIslafHYqZqbp1aQ4dbDy3roUi4h33x19ETh8ubl9dJ8hpbTzVpszBmNDusTA1Dp1U3SpDVDDzJHKN1ncfPf+4TVWkAJOuthu+vNXFR7ACGwTrljcN17jXQrPVqsEzMaAb76KJ9XfiDjSNWnqOH8KvcTxU2q6SXKThtg1q4L6FCtUYNSyjUe0H/AFNBHktpGNU4KnVsPVpECtTfTkSM7XMkcRmFwtv+C2Ept2q0V2jM2nVLAbxUAF4P5g3OeIhfRGPwwqNyugg2MwRG+xTJ8it8Qjfz/dNxGv3929F9A9rPwjwuKAfg4w1UAnwtmm8mDD2AiNNRx0K8Y7SdmMXgHRiqDmtmBUALqThMWqAR5GDxCRqBzYNt3smagGoUwUiOnlomatKAY3XHQoBYOuWOBB3/AHK9M2FRZWYJOsQeAOnl9V5WLLWdktplh7vnLec6t+vVI28fsANuZKj1XFvhaw+i0ey8QKjBBmw+ypXdN4BV6xPtWSoMLfG+53BStkPLnuqO3WCv62Ea4RCr6ezC2zdEvUdJ+Nukn/8A41qKODqWkkirSSKCSAKIQXQQDGLq5Gud+kW6leH9pcf39UvOkBjTxDQPcknzC9e7U4jJhaztPC6DzgAR5n5LxbalDKYG4x6AfWVNVIj0RfcrrD4ljRBbB46x6fsFR0SdNfvqpIeOQP8AcM3/AKn6JGfrYnMeYNon5ppof+WzdSNwHJaXYnZ0vAc7Tj+1loafZeRDWgDiWgmfX3WOvNJXRnwWzrzmqwkRBjiNfPiuGYYkzlPoV6g3skbDKJ/tG7mXellb4LsMwQSBPQdNVP8AuV/oeT4fZ7iR4T5Tv8tfJaXZWx3OgkTcXNrSN8RFzbX6+mYbskwH4R6bvPiu8R2dyCGgAAeEAWsDuPX5Troe9pXxyPNKuzB3gbBgmXTwDQ6CdLgBpQ2g4tvoBby3fObny3rW7Q2QW30jfExvPhtE2nfz3LLYvCmSJ3aTLSIgFpO7+RzS79Hr8UGOLrmSb/FPn5/woDqUwQZ4249Borl1LKCD8+VvZQ8QzuwXN+7ae/yW2fjLU6u/ww2fQq7UoNxADm/4ha1wlrqjGFzQQRcCHOg7wOi+ky4OGXjZfKOE2qGPa8O7qqxzXsfP5mkFpO43A1X0F2M7Z0MbTAJZTr6Op5hLiBJdTm7mq+o4usdsOhXdTq1aY76mQadYDLUaeGcXIIkFpkEblMdTMhpNvuyfDgUd9/v+UydApqrSDpDrgi4IkEb5B1XbmLkWmUB552i/CLBYl3e0C7CuI+Gk1ppTuJpHTo0tC8o7Ufh/jtnk56Rq0hpVohz2xf42gZmGBvEcyvp0EHRBzUB8XObG+33H3yUvZ9UscHDcdOq+i+134V4HHZnsb/T1jfvKQAaTf46XwuuZJGVx4rx7tP8AhzjtnZnOp99REnvaIc4NAM/4jNWW1NwOKmnGm7K4/wAQ/S4T/u3+615cvKezGPhzIM+IEdL5h7r1Fj5AKuJp5BCUk0ikgkgOUVyF0gEigigCEkkkBn+2NPNQqNEwA0nzewfuvMdo0QQ1x4O/8XSZ9F63tSlmZU5iPSD9F5Rt20NbeA6I529dFNXGZc2CQd1lZ9ncKa9dlMAETLp4D23KHiKJFyPivotv+F2Azd5V4EMb11cfm1Z+TXrm1p4s+25HoGz9ntaBb5FX2Gwoi46D7sE3hKNgrGm2F53evSruhhxN+v36KbSpDhvUem5Ph61yx0lAAKPiHBDvE2Vfsj1QMVh5Bj0IBnz1WS29s1sZmiCJ+d/+J+ytrUVLtymO7nc0ib/lNifIGVFv1pI8x2/hwBI3kj52+QVFhaffPZSc6M1RjCeEvDZva0la/bOFzUzylrjzzAZo3gOAB5HmsftGkQS6YMXg621B6zdbY11j5Mc+vpnZnZvB4am2lRw1NrWiPgaXGLS5xEudzJWf2z+GuFrjPQJw1dpLmVKVm57wXMEXkzLS13M6J38O+2dPaWHGZwGJpgCszQncKjR+l3yMjhOwDhrPRdLkYHs/2gx2CccPtlrWNFqeMAmg+N1aoBFN39zg2eA1O8p1MwBEEESCDII3EEJzLKpqewBRfnwbu6BcS+iP8h5Opaz/AOp++WQDJzAm4AuGu4pOUGliw4lpDmkOLYe0tnLF2z8TbjxCyksegcAgi4XVOtuOq6lN1mBASAg5qjUsQBvlOd6Sg2U292BwmKqitDqVa8vpZWg//o3KQ46idY36Kv2jsZ2GgZszLQ6I6giT6reNam8TQa4EESDqiXhV58ElZbU2X3ZJZdo1G8D6j2+arVSeEkgkmTkIrgFdhAFJBFAEIhBGEBGrU8zXtGp+o/heaVMKC+o1w8RlrORLhI8wfkvTniHA7j4T7t+o8wqjG7Aa6qKwMeIFw3W0d1lKw5WE2l2edlewGHUjMb4jwny0W5/D/ZBo4SmHCHOBe7q4z7QuKgpYjFMDXCQCKsQQW7mnnK3GFohotuXJ/k3/AJjs/wAac7quaVOFIYF21iS5ZHTaDU+xNtCfY1XlNIAIOKLwo9Vyq/EyG6pUDFAOBHJP1HqNUWVrWRj9o0zQM5C6mRcXOtiIG6OumhWJ2q3LOW7dxJGm9rouNLExpe69bxFKRcTPRZ3auxabrhgB5SPZXjfL9TvHY8ppYuph6ratCo6lUaZa5szz0EOad40IkEL6C/Drtg/G0C6rReHsOVzmsd3bnbyxxtuu2ZB5QV41t3Y4AMW8vnC+iuy2JoV8HR7huSmKbGhlhkGUQBHqCPeV3Zss+ODWbm/Vjh8UHCykAqFWlglzS4De0DN5jf5eiYwO16dYE05scpzDKQRuLTceY5qup4sqjQdVDfTLfhuOH7FPd5K6lAhqnVldOvYoupA9eKDKRndHH+EgIYu58hxRcQ3quMk6pgQ7hpxTeIqxbf7DiV290aaqrxL5B8UMHxv4ngECIVeoXO8N5t1VHiKYk5DIGsaTvj+2d/8ACsMViDUBawZae8/mf14N5b1CZ4SlLw7OokpKwGBa7xB+Wd0THzQV9jPisaV2EkkydIpJIAhFJJAc1GSIPy9xzC5b4mlp10PpqOoIKSSA87xlCphyXs3uMOm8ybH01Ws7Gdq3VvBVuRv84uEklx7+y9d2PlkbinVkIkpJLmbiKik0q7fuUkleU6/HT67R/wBKFisWwWk+iSSvScor6k+ii1akJJLHTbJh1VMVLhJJZtFFtbAtqAg6pfhz2iOBxH9FWk06h/wiL5SSSWmN0+Lq53EJJLo8Gr3jn8+Zc9e0B0qHidmMcczfC+CA4c+PEIpLuefFcK1SkQ2rv0cDYnpq359VPpV5SSSiqcFRCpWmwSSTIaTI5kpw1ItvGqKSAg7QxQa2XTBtbU8hwVBWrurGXWaPhYNAOfEpJKf7VPkdEqLVCSSZGpSSSUm//9k=",
    },
    {
      id: 7,
      title: "",
      src: "https://www.manipalhospitals.com/uploads/image_gallery/common-skin-problems-in-women.jpg",
    },
    {
      id: 8,
      title: " ",
      src: "    https://media.istockphoto.com/id/2155224543/photo/dermatologist-examining-her-patients-scalp.jpg?s=612x612&w=0&k=20&c=Z9t41l8M5j-4rBDZTvtrZUWZJpBnFYIa2dPVd2EamHc=",
    },
  ];
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      {checkupItems.map((item) => (
        <div
          key={item.id}
          className="relative bg-cover bg-center p-4 text-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 h-[30vh] sm:h-[30vh] w-full"
          style={{ backgroundImage: ` url(${item.src})` }}
          aria-label={item.title} // For accessibility
        >
          <div className="absolute bottom-0 left-0 right-0 text-black bg-opacity-75 py-2 rounded-b-md">
            <h2 className="text-lg font-bold">{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

const TestimonialsCarousel = () => {
  const testimonialCardClasses = "bg-card p-6 rounded-lg shadow-lg text-left";
  const ratingStarClasses = "text-green-500";
  const imageClasses = "w-8 h-8 rounded-full mr-2";
  const testimonials = [
    {
      name: "Ravi Rathi",
      condition: "Hair Loss",
      testimonial:
        "Dr. Shraddha Dhawale was incredible! I had been dealing with hair loss for years, trying different shampoos and supplements without results. After following treatment plan, I started noticing new growth and healthier hair within a few months. I’m grateful for the confidence I've regained thanks to Dr. Shraddha Dhawale's treatment.",
      rating: "★★★★★",
      image: Resultthree,
      date: "2024-10-15",
    },
    {
      name: " Bharat Malani",
      condition: "Hair Loss",
      testimonial:
        "I saw amazing results within a few weeks. My hair was thinning rapidly, and I had tried numerous treatments with little success. Highly recommend her for anyone facing similar issues!",
      rating: "★★★★☆",
      image: Resulttwo,
      date: "2024-09-10",
    },
    {
      name: "Satish Jadhav",
      condition: "Hair Loss",
      image: Resultone,
      testimonial:
        "A great experience with effective treatment. The results have been life-changing, and I appreciate the professionalism and dedication of Dr. Shraddha Dhawale and her team. Highly recommended for anyone struggling with hair loss.",
      rating: "★★★★★",
      date: "2024-08-20",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="bg-gray-200 min-h-[100px] flex justify-center items-center">
      <div className="mx-auto md:w-[80%] ">
        <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 text-center">
          <button
            onClick={handlePrevious}
            className="p-3 text-orange-500 text-2xl font-bold hover:scale-110 transition-all duration-300"
          >
            {"<"}
          </button>
          {/* <div className="flex justify-center w-full px-4 sm:px-12 md:px-20">
            <div className="p-4 sm:p-6 md:p-8 text-center w-48 sm:w-64 h-48 sm:h-64 flex flex-col justify-center items-center space-y-4"> */}
          {/* <div className="bg-gray-400 w-16 sm:w-24 h-16  sm:h-24 rounded-full"></div> */}
          {/* <h3 className=" font-bold text-md sm:text-lg">
                {testimonials[currentIndex].name}
              </h3>
              <p className=" text-sm text-gray-700">
                {testimonials[currentIndex].testimonial}
              </p>
            </div>
          </div> */}

          {/* {/* <TestimonialCard  {...testimonials} largeImage={false} /> */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-left md:flex space-y-6 space-x-4 justify-between gap-10 w-full md:w-[80%] md:h-[56vh]">
            <div className="flex justify-center items-center md:w-[50%]  ">
              <img
                src={testimonials[currentIndex].image}
                className="w-full h-full"
                alt={testimonials[currentIndex].name}
              />
            </div>

            <div className="md:w-[50%] content-center">
              <div className="flex items-center mb-4 ">
                <span className={ratingStarClasses}>
                  {testimonials[currentIndex].rating}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 text-lg">
                {testimonials[currentIndex].testimonial}
              </p>
              <div className="flex items-center">
                {/* <img src={team1}/> */}
                <div className="text-end w-[100%]">
                  <p className="font-bold">{testimonials[currentIndex].name}</p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].condition}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-3 text-orange-500 text-2xl font-bold hover:scale-110 transition-all duration-300"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DynamicCardWithImage = () => {
  const dummyData = [
    {
      imgSrc:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Skin",
      content:
        "A dermatologist specializes in the medical and surgical care of the skin, hair and nails for people of all ages. A dermatologist diagnoses and treats many diseases, including acne, eczema, psoriasis, rosacea, nail infections, hair loss, and skin cancer",
      link: "#",
    },
    {
      imgSrc:
        "https://img.freepik.com/premium-photo/cosmetologist-doctor-dermatologist-beauty-clinic-facial-skin-care-cosmetic-procedures_76964-25369.jpg",
      title: "Hair Treatment",
      content:
        "A medical facility, with licensed trained medical and Dermatology staff, where consultation and treatment services cover a range of medical and cosmetic skin issues:",
      link: "#",
    },
    {
      imgSrc:
        "data:image/jpeg;base64,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",
      title: " Dry Skin",
      content:
        "Dry skin is not always related to an underlying condition. It may be caused Exposure to hot or cold weather with low humidity levels Harsh soaps or detergents.",
      link: "#",
    },
    {
      imgSrc:
        "https://www.health.com/thmb/oLe3JI2nOH2CMhmk5jvTQZf2330=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Health-GettyImages-1427691093-6e9e43fb723f48289506ff3fad973912.jpg",
      title: "How to Pop a Pimple Safely, According to a Dermatologist",
      content:
        "Most dermatologists recommend against popping your own pimples,  be an acceptable option, like if the pimple has a visible whitehead or a blackhead that's close to the skin's surface..",
      link: "#",
    },
    {
      imgSrc:
        "https://www.health.com/thmb/V2BEHNtSX7LtXcjP6PgSHgRXIcQ=/364x242/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1488191591-a166fba39a394200989924d2ecc28ed1.jpg",
      title: "7 Benefits of Red Light Therapy",
      content:
        "Red light therapy, also commonly called photobiomodulation or low-level light therapy (LLLT), is a therapeutic treatment that may help improve acne, fine lines, wrinkles, alopecia, and other skin and health conditions.1 ",
      link: "#",
    },
    {
      imgSrc:
        "https://www.health.com/thmb/91W3bkaRaocJZVGMLmHOwKkqRI4=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Health-GettyImages-1350501259-f392570c344b41ada80823921ce6ef52.jpg",
      title: "Uses and Benefits of Amla Oil",
      content:
        "The oil of amla plants is most commonly used as a hair care product. It’s often touted as a product that can help reduce hair loss. However, the research on this is limited.",
      link: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {dummyData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="w-full h-48 object-cover"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="mt-2 text-base text-gray-600 ">{item.content}</p>
            {/* <a href={item.link} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                Learn More →
              </a> */}
          </div>
        </div>
      ))}
    </div>
  );
};

// Seventh Component
const ContactSection = () => {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
        Contact
      </h2>
      <p className="text-sm justify-center flex font-semibold text-blue-600 mb-8 uppercase">
        Get in Touch
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-64 h-64 p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-900 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10l1.546-1.54c.245-.244.632-.29.926-.123l1.785.978c.318.174.741.02.928-.298L9 6.548c.245-.425.745-.674 1.26-.673H14.74c.515 0 1.015.248 1.26.673l.815 1.457c.186.318.609.473.928.298l1.785-.978c.294-.167.681-.12.926.123L21 10m-9 7v5m-4-5v5m8-5v5"
            />
          </svg>
          <h4 className="font-semibold text-lg text-blue-900 mb-2">
            Emergency
          </h4>
          <p className="text-base text-blue-900">+91 7588694436</p>
        
        </div>
        <div className="w-64 h-64 p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-900 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m2-5h-5l1.5 1.5H16V7.5H7.5V5h5L9 3m12 9c0 5-4.6 9-9 9-4.6 0-9-4-9-9 0-4.4 3.4-8 8-9h2c2.8 1 6 5 6 9z"
            />
          </svg>
          <h4 className="font-semibold text-lg text-blue-900 mb-2">Location</h4>
          <p className="text-base text-blue-900">Sai Multispeciality Hospital , Sai colony,
Bhairavnath Chawk, Daund-Jamkhed Road,
Shrigonda, Ahmednagar, 413701</p>
          {/* <p className="text-base text-blue-900">9876 Some country</p> */}
        </div>
        <div className="w-64 h-64 p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-900 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7M16 3.5v5h1.5M8 3.5v5H9m-1 2.5h6"
            />
          </svg>
          <h4 className="font-semibold text-lg text-blue-900 mb-2">Email</h4>
          <p className="text-base text-blue-900">
            saihospitalshrigonda@gmail.com
          </p>
          {/* <p className="text-base text-blue-900">saimulti-specialityhospital26@gmail.com</p> */}
        </div>
        <div className="w-64 h-64 p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-900 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7.5 12H5.6a2.8 2.8 0 000 5.6h.9m6.2 0H14m-7 0h1.4a2.8 2.8 0 010-5.6H7m5 0h-1.4a2.8 2.8 0 100 5.6H12m1.4 0H14M12 12V9a3 3 0 00-6 0v3m6 0a3 3 0 00-6 0m0 0v3m6-3v3m6-3v3m0 0V9a3 3 0 00-6 0v3"
            />
          </svg>
          <h4 className="font-semibold text-lg text-blue-900 mb-2">
            Working Hours
          </h4>
          <p className="text-base text-blue-900">
            {" "}
            Monday to Saturday: <br/>
            08:00 AM - 8:00 PM{" "}
          </p>
          
        </div>
      </div>
    </div>
  );
};

// Main Glam Component
const Glam = () => {
  return (
    <div>
      <Navbar />
      <VideoSection />
      <TrustedBySection />
      <IntroductorySection />
      <DynamicCheckupCard />
      <TestimonialsCarousel />
      <DynamicCardWithImage />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Glam;
