import { FaHome, FaMobile, FaShoppingCart, FaStore, FaUser } from "react-icons/fa"


const DashSideBar = () => {
  return (
    <div className=" flex flex-col gap-4 p-2 ">
           <div className=" flex border-gray-400 border-2 p-2 rounded-lg cursor-pointer items-center gap-2 hover:bg-gray-400">
                <FaHome/>
                <span>Home</span>
           </div>
           <div className=" flex border-gray-400 border-2 p-2 rounded-lg cursor-pointer items-center gap-2 hover:bg-gray-400">
                <FaStore/>
                <span>Products</span>
           </div>
           <div className=" flex border-gray-400 border-2 p-2 rounded-lg cursor-pointer items-center gap-2 hover:bg-gray-400">
                <FaShoppingCart/>
                <span>Cart</span>
           </div>
           <div className=" flex border-gray-400 border-2 p-2 rounded-lg cursor-pointer items-center gap-2 hover:bg-gray-400">
                <FaUser/>
                <span>Profile</span>
           </div>
    </div>
  )
}

export default DashSideBar