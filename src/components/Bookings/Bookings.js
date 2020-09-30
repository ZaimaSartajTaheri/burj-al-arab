import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings]=useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:3003/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[])
    return (
        <div>
            <h3>You have: {bookings.length} bookings</h3>
            {
                bookings.map(booking=><li>{booking.name} has made booking from {booking.checkIn} to {booking.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;