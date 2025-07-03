import { Link } from 'react-router-dom'

export function BottomWarning({label, buttonText, to}){
    return <div className="py-2 test-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="point underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}