export function TableRowForDashboard({Idx ,Date, Name, Items, Amount}){
    function rowColor(){
        if(Idx % 2){
            return "bg-amber-50"
        }else{
            return "bg-white"
        }
    }
    return <tr className={rowColor + "whitespace-nowrap hover:bg-amber-100"}>
        <td className="p-3 text-sm text-gray-700">{Idx}</td>
        <td>{Date}</td>
        <td>{Name}</td>
        <td>{Items}</td>
        <td>{Amount}</td>
    </tr>
}