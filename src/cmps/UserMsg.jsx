import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { setMsg } from "../store/actions/system.actions.js"

export function UserMsg() {
  const msg = useSelector((storeState) => storeState.systemModule.msg)
  const [isShown, setIsShown] = useState(false)
  const timeoutIdRef = useRef()

  useEffect(() => {
    if (!msg) return
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }

    setIsShown(true)

    timeoutIdRef.current = setTimeout(() => {
      closeMsg()
      setIsShown(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutIdRef.current)
    }
  }, [msg])

  function closeMsg() {
    setIsShown(false)
    setTimeout(() => {
      setMsg(null)
    }, 600)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type} ${isShown ? 'shown' : ''}`}>
      {msg.txt}
    </section>
  )
}