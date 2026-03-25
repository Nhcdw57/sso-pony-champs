import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";



export default function RootLayout() {
    return (
    <>
    <Navbar/>

    <div className="container pt-4">
        <Outlet/>
    </div>
    </>
    )
}