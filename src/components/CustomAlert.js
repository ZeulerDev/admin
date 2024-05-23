import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react"
import { useAppContext } from "../context/AppContext"
import { useState, useEffect, useRef } from "react"
import { SET_ALERT } from "../context/context_reducer"

const CustomAlert = () => {

    const [toast, addToast] = useState(0)
    const toaster = useRef()

    const [{alert}, dis] = useAppContext()

    const ToastComponent = (
        <CToast color={alert?.color}>
          <CToastHeader closeButton>
            <svg
              className="rounded me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
            >
              <rect width="100%" height="100%" fill="#ff4d4d"></rect>
            </svg>
            <div className="fw-bold me-auto">{alert?.title}</div>
            {/* <small>7 min ago</small> */}
          </CToastHeader>
          <CToastBody>{alert?.message}</CToastBody>
        </CToast>
      )

    useEffect(() => {
      console.log(alert)
        if(alert?.status){
            addToast(ToastComponent)
        } else {
            addToast(0)
        }
    }, [alert])

    

    return (
        <>
          <CToaster className="p-3" placement="top-center" push={toast} ref={toaster} />
        </>
      )
}

export default CustomAlert