// import dotenv from 'dotenv';
// dotenv.config();

// const  API_BASE_URL = process.env.VITE_API_BASE_URL;
// const API_BASE_URL1 = ''
// console.log( API_BASE_URL)


export const fetchCurrentUser = async () => {
    const response = await fetch(`/api/users/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    return response.json();
  };

export const register = async (formData)=>{
    const response  = await fetch(`/api/users/register`,{
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type":"application/json",
            
        },
        body : JSON.stringify(formData),

    })
    const responseBody = await response.json();
    if(!response.ok)
    {
        throw new Error(responseBody.message)
    }
}
export const signIn =async (formData)=>{
    const response  = await fetch(`/api/auth/login`,{
        method : "POST",
        credentials:"include",
        headers:{
            "Content-Type" : "application/json",
            
        },
        body : JSON.stringify(formData),
    })
    const body = await response.json();
    if(!response.ok)
    {
        throw new Error(body.message)
    }
    return body;


}
export const validateToken = async ()=>{
    const response = await fetch(`/api/auth/validate-token`, {
        method:"GET",
        credentials:"include",
       

    })
    if(!response.ok){
        throw new Error("Token invalid")
    }
    return response.json()
}
export const signOut = async ()=>{
    const response = await fetch (`/api/auth/logout`, {
        credentials:"include", 
        method: "POST",
    })
    if(!response.ok){
        throw new Error("Error during sign out")
    }
    // return response.json()
}
export const addMyHotel = async (hotelFormData)=>{
    const response  =await fetch(`/api/my-hotels`, {
        method :"POST", 
        credentials :"include",
        body:hotelFormData,
        
    })
    
    if(!response.ok)
    {
        throw new Error("Failed to add hotel")

    }
   
    return response.json();
}

export const fetchMyHotels = async ()=>{
    const response  = await fetch(`/api/my-hotels`, {
        credentials:"include",
    })

    if(!response)
    {
        throw new Error("Error fetching hotels")
    }

    return response.json()
}

export const fetchMyHotelById = async(hotelId) =>{
    const response = await fetch(`/api/my-hotels/${hotelId}`,{
        credentials:"include"
    })
    if(!response.ok)
    {
        throw new Error("Error fetching Hotels")
    }
    return response.json()
}

export const updateMyHotelById = async (hotelFormData)=>{
    console.log(hotelFormData.get("hotelId"))
    const response  = await fetch(`/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method:"PUT",
        body:hotelFormData,
        credentials:"include",
    })

    if(!response)
    {
        throw new Error("Failed to update Hotel")
    }
    
    return response.json()

}

export const searchHotels = async (searchParams) =>{
    const queryParams = new URLSearchParams()
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCount", searchParams.adultCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );

    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));


    const response = await fetch(`/api/hotels/search?${queryParams}`)

    if(!response.ok)
    throw new Error("Error fetching hotels")

    return response.json()
}

export const fetchHotels = async () => {
  const response = await fetch(`/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId) => {
    const response = await fetch(`/api/hotels/${hotelId}`);
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };


  export const createPaymentIntent = async (
    hotelId,
    numberOfNights
  ) => {
    const response = await fetch(
      `/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }

    console.log(response)
  
    return response.json();
  };

  export const createRoomBooking = async (formData) => {
    const response = await fetch(
      `/api/hotels/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };


  export const fetchMyBookings = async () => {
    const response = await fetch(`/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };
  


