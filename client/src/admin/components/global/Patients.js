import React from "react";
import { useState, useEffect } from "react";
import Trashicon from "./trash.png";
import edit from "./edited.png";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";

export default function Patients() {
  const [patient, setPatient] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // const [newPatient, setNewPatient] = useState({
  //     fullName:'',
  //     date:'',
  //     age:'',
  //     complaint:'',
  //     personalhistory:'',
  //     familyhistory:'',
  //     habits:'',
  //     gender:'',
  //     bloodgroup:''
  // })

  const fetchPatients = async () => {
    console.log(searchMobile, searchName);
    try {
      const response = await axiosInstance.get(`/Patient/Searchpatient`, {
        params: {
          name: searchName,
          mobile: searchMobile,
        },
      });
      console.log("Response Data: ", response.data.data);
      setPatient(response.data.data);
    } catch (err) {
      toast.error("error fetching patients");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatients();
  };

  const getData = async () => {
    const Data = await axiosInstance.get(`/Patient/allpatient`);
    setPatient(Data.data.data);
    // console.log(Data.data.data);
  };
  console.log(patient);

  const deleteAPI = async (patient) => {
    const id = patient._id;
    const deletedata = await axiosInstance.delete(
      `/Patient/deletepatient/${id}`
    );
    alert("are you sure you want to delete patient form this list?");
    getData(deletedata.data.msg);
    console.log("deletedata.data.msg");
  };

  const handleUpdate = async () => {
    try {
      const id = selectedPatient._id;
      await axiosInstance.put(`/Patient/updatepatient/${id}`, selectedPatient);
      toast.success("Patient updated successfully!");
      setIsModalOpen(false); // Close the modal after update
      getData(); // Refresh the patient list
    } catch (error) {
      toast.error("Error updating patient");
    }
  };

  useEffect(() => {
    getData();
    fetchPatients();
  }, []);

  const openModal = (patientData) => {
    setSelectedPatient(patientData);
    setIsModalOpen(true);
  };

  // Clear date input
  const clearDateFilters = () => {
    setSearchName("");
    setSearchMobile("");
  };
  return (
    <>
      <form onSubmit={handleSearch} className=" md:h-[10vh] sm:mb-10 mx-auto">
        <div className="container mx-auto  p-4 ">
          <div className="flex flex-wrap justify-between items-center mb-4 ">
            <div className="md:flex space-x-0 md:space-x-4 md:space-y-0 space-y-4 h-fit md:h">
              <input
                className="md:ml-20 md:w w-full h-[20px] p-5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Add Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <input
                className="sm:ml-20 md:w w-full  mr-4 h-[20px] p-5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Mobile No."
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
              />
            </div>

      
            <div className=" md:flex-wrap input my-2 flex"  >
                    <button
              className="  h-10 w-32 md:ml-4 my-2  b-2px-6 p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Search
            </button>
              {" "}
              <button
                className="  h-10 w-32 my-2  mr-2 ml-2 md:ml-4 sm:ml-5 b-2px-6 p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={clearDateFilters}
              >
                Clear Data
              </button>
            </div>
           
          </div>
        </div>
      </form>

      <div className="ml-4 w-[75vw] h-[50vh] sm:h-[75vh] overflow-x-auto sm:w-full">
        <table className="w-[60vw] sm:h-[70vh] overflow-x-scroll sm:w-full bg-white shadow-md rounded-lg overflow-hidden ">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                FullName
              </th>
              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Mobile
              </th>
              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Address
              </th>

              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Bloodgroup{" "}
              </th>
              <th className="px-4 py-2 text-left bg-gray-200">Visit Time</th>
              {/* <th className="px-6 py-3 text-left bg-gray-200 font-semibold">Date_of_birth</th> */}
              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Gender
              </th>
              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Age
              </th>

              <th className="px-6 py-3 text-left bg-gray-200 font-semibold">
                Habits
              </th>
              <th
                className="px-6 py-3 text-left bg-gray-200 font-semibold"
                colSpan={2}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* // excuted map function here... */}

            {patient.map((Data) => {
              return (
                <tr>
                  <td className="px-6 py-4">{Data.fullName}</td>
                  <td className="px-6 py-4">{Data.mobile}</td>
                  <td className="px-6 py-4">{Data.address}</td>
                  <td className="px-6 py-4">{Data.bloodgroup}</td>
                  <td className="px-6 py-4">{Data.visited} </td>
                  <td className="px-6 py-4">{Data.gender}</td>
                  <td className="px-6 py-4">{Data.age}</td>
                  <td className="px-6 py-4">{Data.habits}</td>

                  <td className=" text-center">
                    <img
                      className=" w-6 cursor-pointer"
                      src={edit}
                      onClick={() => openModal(Data)}
                    />
                  </td>
                  <td className=" text-center">
                    <img
                      className="w-6  cursor-pointer"
                      onClick={() => {
                        deleteAPI(Data);
                      }}
                      src={Trashicon}
                      alt="Delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[700px] h-[650px]">
            <h2 className="text-xl font-bold mb-4">Update Patient</h2>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                value={selectedPatient.fullName}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    fullName: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Mobile</label>
              <input
                type="text"
                value={selectedPatient.mobile}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    mobile: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="bloodgroup">
                Blood Group
              </label>
              <select
                name="bloodgroup"
                id="bloodgroup"
                value={selectedPatient.bloodgroup}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    bloodgroup: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {/* <label className="block mb-2">Bloodgroup</label>
                            <input
                                type="text"
                                value={selectedPatient.bloodgroup}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient,bloodgroup: e.target.value })}
                                className="border rounded px-4 py-2 w-full"
                            /> */}
            </div>

            <div className="mb-4">
              <label className="block mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={selectedPatient.gender}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* <label className="block mb-2">Gender</label>
              <input
                type="text"
                value={selectedPatient.gender}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              /> */}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input
                type="text"
                value={selectedPatient.address}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    address: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="habits">
                Habits
              </label>
              <select
                name="habits"
                id="habits"
                value={selectedPatient.habits}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    habits: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Habits</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Smoking">Smoking</option>
                <option value="Tobacco">Tobacco</option>
                <option value="Other">Other</option>
              </select>
              {/* <label className="block mb-2">Habits</label>
              <input
                type="text"
                value={selectedPatient.habits}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    habits: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              /> */}
            </div>
            {/* <div className="mb-4">
                            <label className="block mb-2">Personal History</label>
                            <input
                                type="text"
                                value={selectedPatient.personalhistory}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient, personalhistory: e.target.value })}
                                className="border rounded px-4 py-2 w-full"
                            />
                        </div> */}
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mx-6"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
