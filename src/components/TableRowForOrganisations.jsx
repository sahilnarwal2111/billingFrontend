export function TableRowForOrganisations({Idx ,OrgId, Name, gstNumber, contactNumber}){
    function rowColor(){
        if(Idx % 2){
            return "bg-amber-50"
        }else{
            return "bg-white"
        }
    }
    return <tr className={rowColor + "whitespace-nowrap hover:bg-amber-100"}>
        <td className="p-3 text-sm text-gray-700">{Idx}</td>
        <td>{OrgId}</td>
        <td>{Name}</td>
        <td>{gstNumber}</td>
        <td>{contactNumber}</td>
    </tr>
}