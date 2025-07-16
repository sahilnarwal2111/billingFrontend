import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Heading } from "../components/Heading";
import { TableRowForOrganisations } from "../components/TableRowForOrganisations";
import axios from 'axios'
export function Dashboard(){
    const [bills, setBills] = useState([])
    const [organisations, setOrganisations] = useState([]);
    const [dropdown, setDropdown] = useState(false)

    // useEffect(()=>{
    //     set
    // })

    function handleOnClick(org) {
        async function fetchAllBills(){
        try{
            console.log(org.id)
            const res = await axios.get(`http://localhost:3000/api/v1/bill/bills/${org.id}`, {
                headers : {
                    Authorization : "Bearer " +  localStorage.getItem("token")
                }
            });
            setBills(res.data.bills)
            // console.log(res.data.bills)
            // console.log(bills)
            
        }catch(err){
            console.log("Something went wrong " + err);
        }
        }
        fetchAllBills();
    }
    let idx = 0 
    useEffect(()=>{
        async function fetchAllOrgs(){
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
        fetchAllOrgs()
        
        
    },[])
    return <div className="bg-gray-100 h-screen">
        <div >
            <Appbar/>
        </div>
        <div className="flex flex-row justify-center">
                <Heading label={"All Invoice"} />
        </div>
        


    <div>

        <button id="dropdownHoverButton" 
                data-dropdown-trigger="hover" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                onClick={()=>{
                    if(dropdown === false){
                        setDropdown(true)               
                    }else{
                        setDropdown(false)
                    }
                }}
                >
                Select Organisation
                <svg className="w-2.5 h-2.5 ms-3" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 10 6">
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
        </button>

        { dropdown && (<div id="dropdownHover" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">

                {organisations.map((org, index)=>{ return (
                    <li key={index}>
                        <a onClick={()=>{
                            handleOnClick(org)
                        }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{org.name}</a>
                    </li>)
                })}
            </ul>
        </div>)
        }

    </div>

        <div className="ml-8 mr-8 overflow-auto rounded-lg shadow">
            <table className="w-full bg-gray-200 border-grey-200" >
                <thead className="border-b-2 border-gray-500">
                    <tr>
                        <th className="p-3 w-20 text-m font-semibold tracking-wide text-left">S.No</th>
                        <th className="p-3 w-24 text-m font-semibold tracking-wide text-left">Date</th>
                        <th className="p-3 w-100 text-m font-semibold tracking-wide text-left">Name</th>
                        <th className="p-3 text-m font-semibold tracking-wide text-left">Items</th>
                        <th className="p-3 w-25 text-m font-semibold tracking-wide text-left">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   <TableRowForOrganisations Idx={1} Name={"Sahil"} Date={"24-6-2000"} Items={["apple", "mango"]} Amount={"100"}/>
                   <TableRowForOrganisations Idx={2} Name={"Sahil"} Date={"24-6-2000"} Items={["apple", "mango"]} Amount={"100"}/>
                    
                    {bills.map((currentBill, index)=>{
                         return <TableRowForOrganisations
                                key={currentBill.id || index}
                                Idx={index + 1}
                                Name={currentBill.customerName}
                                Date={new Date(currentBill.date).toLocaleDateString()} 
                                Items={(currentBill.items || []).map(item => item.itemName)}
                                Amount={(currentBill.items || []).reduce((sum, item) => sum + item.priceOfItem * item.quantityPurchased, 0)} // total bill
                        />

                    })}
                </tbody>
            </table>
        </div>
    </div>
}