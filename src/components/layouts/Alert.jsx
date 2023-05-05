import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext"
function Alert() {
    const {alert} = useContext(AlertContext);
        
    return (
        alert !== null && (
            <div className={`alert flex w-40 alert-${alert.type}`}>
                <i className='fas fa-info-circle' /> {alert.msg}   
            </div>
        )
  )
}

export default Alert