import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Heading } from "../components/Heading";
import { TableRow } from "../components/TableRow";
import axios from 'axios'
export function Dashboard(){
    const [bills, setBills] = useState([])
    let idx = 0 
    useEffect(()=>{
        async function fetchAllBills(){
            try{
                const res = await axios.get("http://localhost:3000/api/v1/bill/get", {
                    headers : {
                        Authorization : "Bearer " +  localStorage.getItem("token")
                    }
                });
                setBills(res.data.bills)
            }catch(err){
                console.log("Something went wrong " + err);
            }
        }
        fetchAllBills();
        
    },[])
    return <div className="bg-gray-100 h-screen">
        <div >
            <Appbar/>
        </div>
        <div className="flex flex-row justify-center">
                <Heading label={"All Invoice"} />
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
                   <TableRow Idx={1} Name={"Sahil"} Date={"24-6-2000"} Items={["apple", "mango"]} Amount={"100"}/>
                   <TableRow Idx={2} Name={"Sahil"} Date={"24-6-2000"} Items={["apple", "mango"]} Amount={"100"}/>
                    
                    
                    {bills.map((currentBill)=>{
                         return <TableRow
                                key={idx}
                                Idx={idx + 1}
                                Name={currentBill.customerName}
                                Date={new Date(currentBill.date).toLocaleDateString()}  // optional formatting
                                Items={currentBill.items.map(item => item.itemName)}
                                Amount={currentBill.items.reduce((sum, item) => sum + item.amount * item.quantity, 0)} // total bill
                                />

                    })}
                </tbody>
            </table>
        </div>
    </div>
}