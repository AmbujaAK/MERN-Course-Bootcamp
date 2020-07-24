import React, { useState, useEffect } from 'react'
import moment from 'moment'
import api from '../../services/api'

export default function MyRegistration(){
    const [myEvents, setMyEvents] = useState([])
    const user = localStorage.getItem('user')

    useEffect(()=>{
        getMyEvents()
    },[])

    const getMyEvents = async () => {
        try {
            const response = await api.get('/registration', {headers: { user }})
            console.log(response.data)
            setMyEvents(response.data)
        } catch (error) {
            
        }
    }


    return (
        <ul className="events">
            {myEvents.map(event => (
                <li key={event._id}>
                    <div>{event.eventTitle}</div>
                    <div className="events-details">
                        <span>Event Date : {moment(eventDate).format('l')}</span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </li>
            ))}
        </ul>
    )
}