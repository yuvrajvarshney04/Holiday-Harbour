import React from "react";

const Hero = ()=>{
    return (
        <div className = "bg-blue-800 pb-16">
            <div className= "container flex mx-auto flex-col gap-2">
                <h1 className = "ml-2 max-[457px]:text-4xl text-5xl text-white font-bold">
                    Find your next stay
                </h1>
                <p className = " ml-2 text-2xl text-white">
                    Search low prices on hotels for your dream vacation
                </p>
            </div>
        </div>

    )
}
export default Hero;