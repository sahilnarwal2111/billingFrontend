import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from 'axios'
export function CreateBill() {
    const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [amount, setamount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [organisations, setOrganisations] = useState([]);
    const [dropdown, setDropdown] = useState(false)
    const [selectedOrgId, setSelectedOrgId] = useState()
    const [selectedOrgName, setSelectedOrgName] = useState()
    const date = new Date().toLocaleDateString();

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

    const handleAddItem = () => {
        console.log(items)
        if (!itemName || !amount || !quantity) {
            alert("Check Input Fields properly !")
            return;
        }
        setItems([
            ...items,
            { itemName: itemName, priceOfItem: parseFloat(amount), quantityPurchased: parseInt(quantity) }
        ]);
        setItemName("");
        setamount("");
        setQuantity("");
    };

    const total = items.reduce((sum, item) => sum + item.priceOfItem * item.quantityPurchased, 0);

    return (<>
            <Appbar />
        <div className="flex justify-center">
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
                {(!selectedOrgName) ? "Select Organisation" : selectedOrgName}
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
                            setSelectedOrgId(org.id)
                            setSelectedOrgName(org.name)
                            setDropdown(false)
                        }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{org.name}</a>
                    </li>)
                })}
            </ul>
        </div>)
        }


        </div>
        
        <div style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
            <h2>Create Invoice</h2>
            <div style={{ marginBottom: 16 }}>
                <label>Customer Name: </label>
                <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    style={{ marginLeft: 8 }}
                    />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Date: </label>
                <span style={{ marginLeft: 8 }}>{date}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    />
                <input
                    type="number"
                    placeholder="Price"
                    value={amount}
                    onChange={e => setamount(e.target.value)}
                    />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Item Name</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Price Of Item</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Quantity</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.itemName}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.priceOfItem}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.quantityPurchased}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{(item.priceOfItem * item.quantityPurchased).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "right", fontWeight: "bold", marginBottom: 16 }}>
                Grand Total: ₹{total.toFixed(2)}
            </div>
            <div className="flex justify-center">
                <button onClick={ async()=>{
                    if(customerName === ""){
                        alert("Please provide a Customer Name")
                        return;
                    }
                    try{
                        const response = await axios.post("http://localhost:3000/api/v1/bill/create", {
                            customerName : customerName,
                            itemsPurchased : items,
                            organisation : selectedOrgId,
                        },{
                            headers : {
                                Authorization : "Bearer " + localStorage.getItem("token")
                            }
                        }
                        )
                        alert("Invoice Generated Successfully !")
                    }catch(err){
                        console.log(err);
                    }
                }} className="border pt-2 pb-2 pl-4 pr-4 rounded-2xl bg-blue-600 text-white" >Generate Invoice</button>
            </div>
        </div>
        </>
    );
}