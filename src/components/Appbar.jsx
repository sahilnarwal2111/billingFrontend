import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Appbar({toPage}){
    const [email, setEmail] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate('/signin')
        }
        if(token){
            const decoded = jwtDecode(token);
            setEmail(decoded.email)
        }
    }, [])
    function handleLogOut(){
        localStorage.clear()
        navigate('/signin');
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <Link className='point pl-1 cursor-pointer' to={"/"} >Invoice Generator</Link>
        </div>

        <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center h-full mr-2">
                <Link className='point underline pl-1 cursor-pointer' to={`/${toPage}`} >{(toPage === 'orgs') ? "Organisations" : "Dashboard"}</Link>
            </div>
            <div className="flex flex-col justify-center h-full mr-2">
                <Link className='point underline pl-1 cursor-pointer' to={"/create"} >New Invoice</Link>
            </div>
            <div className="flex flex-col justify-center h-full mr-2">
                {/* Hello */}
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => setShowDialog(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

            </div>
        </div>

        {showDialog && (
          <div
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
            onClick={() => setShowDialog(false)} // Close on background click
          >
            <div
              style={{
                background: "white",
                padding: 24,
                borderRadius: 8,
                minWidth: 300,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                position: "relative"
              }}
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer"
                }}
                onClick={() => setShowDialog(false)}
              >
                &times;
              </button>
              <h3>User Email</h3>
              <div style={{ marginTop: 12, fontWeight: "bold" }}>{email}</div>
              <button className='bg-blue-500 text-white rounded-xl py-1 mt-2 px-2' onClick={handleLogOut} >
                Log out
              </button>
            </div>
          </div>
        )}

    </div>
}