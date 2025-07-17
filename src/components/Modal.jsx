import { useState,  } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function Modal({setOrganisations, setModalAppearance, modalAppearance}){
    const [name, setName] = useState()
    const [subHeading, setSubHeading] = useState()
    const [contactNumber, setContactNumber] = useState()
    const [contactEmail, setContactEmail] = useState()
    const [gstNumber, setGstNumber] = useState()
    const [address, setAddress] = useState()
    
    const navigate = useNavigate();
    async function handleCreateOrg(){
        const res = await axios.post("http://localhost:3000/api/v1/user/addOrganisation", {
                name, 
                subHeading, 
                contactEmail, 
                contactNumber, 
                gstNumber,
                address
            },
            {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        const newOrg = res.data.newOrg
        setOrganisations(prev => [...prev, newOrg])
        setModalAppearance(true)
        navigate('/orgs')
        
    }
    return (<div>
        {/* <!-- Modal toggle - */}
        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
        Add new Organisation
        </button>

        {/* <!-- Main modal --> */}
        {modalAppearance === false && <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Create New Organisation
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close Create Organisation</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">Organisation Name</label>
                                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="ACB Holdings Limited" 
                                onChange={(e) => setName(e.target.value) }/>
                            </div>
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">Brand Tagline</label>
                                <input placeholder="Always ahead..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                onChange={(e) => setSubHeading(e.target.value) } />
                            </div>
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">Contact Number</label>
                                <input  placeholder="9991233211" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                onChange={(e) => setContactNumber(e.target.value) }/>
                            </div>
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input placeholder="johndoe@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                onChange={(e) => setContactEmail(e.target.value) } />
                            </div>
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">GST Number</label>
                                <input placeholder="ABC21343" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                onChange={(e) => setGstNumber(e.target.value) }/>
                            </div>
                            <div>
                                <label className="my-2 block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                                <input  placeholder="Down Town NY" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                onChange={(e) => setAddress(e.target.value) }/>
                            </div>
                            
                            <button type="submit" className="my-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            onClick={() =>{
                                handleCreateOrg()
                            }}
                            >Create Organisation</button>
                    </div>
                </div>
            </div>
        </div> }

    </div>)
}