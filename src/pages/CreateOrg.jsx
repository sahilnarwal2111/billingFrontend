import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Heading } from "../components/Heading";
import { TableRowForOrganisations } from "../components/TableRowForOrganisations";
import axios from 'axios'
import { Modal } from "../components/Modal";
export function CreateOrgantisation(){
    const [organisations, setOrganisations] = useState([]);
    const [modalAppearance, setModalAppearance] = useState(false);
    useEffect(()=>{
        fetchAllOrgs(setOrganisations)
    },[])
    return <div>
        <div>
            <Appbar/>
        </div>
        <div className="flex justify-center mb-3">
            <Heading label={"All Oraganisations"} />
        </div>
        <div>
            <div className="ml-8 mr-8 overflow-auto rounded-lg shadow">
                <table className="w-full bg-gray-200 border-grey-200" >
                    <thead className="border-b-2 border-gray-500">
                        <tr>
                   
                            <th className="p-3 w-20 text-m font-semibold tracking-wide text-left">S.No</th>
                            <th className="p-3 w-24 text-m font-semibold tracking-wide text-left">Organisation Id</th>
                            <th className="p-3 w-100 text-m font-semibold tracking-wide text-left">Organisation Name</th>
                            <th className="p-3 text-m font-semibold tracking-wide text-left">GST Number</th>
                            <th className="p-3 w-25 text-m font-semibold tracking-wide text-left">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {organisations.map((currentOrg, index)=>{
                                return <TableRowForOrganisations
                                    key={currentOrg.id || index}
                                    Idx={index + 1}
                                    Name={currentOrg.name}
                                    OrgId={currentOrg.id} 
                                    gstNumber={currentOrg.gstNumber}
                                    contactNumber={currentOrg.contactNumber} // total bill
                            />
    
                        })}
                    </tbody>
                </table>
            </div>        
        </div>
        <div className="pl-8 pt-3">
            <Modal setOrganisations={setOrganisations} setModalAppearance={setModalAppearance} modalAppearance={modalAppearance}/>

        </div>
    </div>
}

export async function fetchAllOrgs(setOrganisations){
    try{
        const orgs = await axios.get("http://localhost:3000/api/v1/user/organisations", {
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        setOrganisations(orgs.data.organisations)                
    }catch(err){
        console.log("Something went wrong " + err);
    }
}