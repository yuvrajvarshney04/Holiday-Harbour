import React from 'react'
import {Link, useActionData} from "react-router-dom";
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = ()=>{
    const {isLoggedIn} = useAppContext();
    

    return (
        <div className = "bg-blue-800 py-6">
         <div className = "container  mx-auto flex justify-between " >
            <span className =" ml-1 max-[388px]:ml-2.5 max-[440px]:mt-3.5 text-sm sm:text-3xl text-white font-bold tracking-tight" >
                <Link to = "/">HolidayHarbor</Link>
            </span>
            <span className = "flex space-x-2">
            {isLoggedIn?<>
                <Link className=' max-[768px]:ml-3 border-slate-300 max-[388px]:text-xs flex items-center text-white px-3 max-[425px]:px-1 font-bold hover:bg-blue-600 max-[378px]:p-0 ' to="/my-bookings">My Bookings</Link>
                <Link  className='flex items-center max-[388px]:text-xs text-white px-3 font-bold hover:bg-blue-600 max-[378px]:p-0' to="/my-hotels">My Hotels</Link>
               <SignOutButton />
            </> :<Link to = "/sign-in" className = "flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 mr-2 max-[378px]:p-0">Sign In</Link> }
            
            </span>
         </div>
        </div>
    )
}
export default Header;