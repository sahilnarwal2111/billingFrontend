import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from 'axios'
export function CreateBill() {
    const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [amount, setamount] = useState("");
    const [quantity, setQuantity] = useState("");
    const date = new Date().toLocaleDateString();

    const handleAddItem = () => {
        console.log(items)
        if (!itemName || !amount || !quantity) {
            alert("Check Input Fields properly !")
            return;
        }
        setItems([
            ...items,
            { itemName: itemName, amount: parseFloat(amount), quantity: parseInt(quantity) }
        ]);
        setItemName("");
        setamount("");
        setQuantity("");
    };

    const total = items.reduce((sum, item) => sum + item.amount * item.quantity, 0);

    return (<>
            <Appbar />
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
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>amount</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Quantity</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.itemName}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.amount.toFixed(2)}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.quantity}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{(item.amount * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "right", fontWeight: "bold", marginBottom: 16 }}>
                Grand Total: ₹{total.toFixed(2)}
            </div>
            <button onClick={ async()=>{
                if(customerName === ""){
                    alert("Please provide a Customer Name")
                    return;
                }
                try{
                    const response = await axios.post("http://localhost:3000/api/v1/bill/create", {
                        customerName : customerName,
                        items 
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
            

            }} style={{ width: "100%", padding: 12, fontSize: 16 }}>Generate Invoice</button>
        </div>
        </>
    );
}