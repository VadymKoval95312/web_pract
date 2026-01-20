import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import "./wrapper.css"
import { Header } from "../header.component/header.component"
import { Footer } from "../footer.component/footer.component"

export const AuthorizedWrapper = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) navigate("/")
  }, [navigate])

  return <div className="wrapper"><Outlet /></div>
}

export const NonAuthorizedWrapper = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) navigate("/login")
  }, [navigate])

  return (
    <>
      <Header />
      <div className="min-height">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
