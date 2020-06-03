import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import moment from 'moment'
import { Alert, Button, ButtonGroup} from 'reactstrap';
import './dashboard.css'

// Dashboard will show all the events
export default function Dahsboard({ history }){
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    const [rSelected, setRSelected] = useState(null);
    const [error, setError ] = useState(false)
    const [success, setSuccess ] = useState(false)


    useEffect((query) => {
        getEvents(query)
    },[])

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const myEventsHandler = async (myevents) => {
        try {
            setRSelected(myevents)
            const response = await api.get('/user/events', {headers: {user: user}})

            setEvents(response.data.events)
        } catch (error) {
            history.push('/login')
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, {headers: {user: user}})
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
                filterHandler(null)
                history.push('/')
            },3000)
        } catch (error) {
            setError(true)
            setTimeout(()=>{
                setError(false)
            },3000)
        }
        

    }
    const getEvents = async (filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : '/dashboard'
            const response = await api.get(url, {headers: {user: user}})

            setEvents(response.data.events)
        } catch (error) {
            history.push('/login')            
        }
    }

    return(
        <>
            <div className='filter-panel'>
                <ButtonGroup>
                    <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Sports</Button>
                    <Button color="primary" onClick={myEventsHandler} active={rSelected === 'myevents'}>My Events</Button>
                    <Button color="primary" onClick={() => filterHandler('running')} active={rSelected === 'running'}>Running</Button>
                    <Button color="primary" onClick={() => filterHandler('cycling')} active={rSelected === 'cycling'}>Cycling</Button>
                    <Button color="primary" onClick={() => filterHandler('swimming')} active={rSelected === 'swimming'}>Swimming</Button>
                </ButtonGroup>
                <Button color='secondary' onClick={() => history.push('events')}>Events</Button>
            </div>
            <br/>
            <ul className='events-list'>
                {events.map((event)=>(
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}>
                            {event.user === user_id 
                                ? <div><Button color='danger' size='sm' onClick={() => deleteEventHandler(event._id)}>Delete</Button></div>
                                : ''
                            }
                        </header>
                        <strong>{event.title}</strong>
                        <span>Event Date :{moment(event.date).format('l')}</span>
                        <span>Event Price : {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event Description :{event.description}</span>
                        <Button color='primary'>Subscribe</Button>
                    </li>
                ))}
            </ul>
            {error ? (
                <Alert className='event-validation' color='danger'>Error when deleting event</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'> Event is deleted successfully !</Alert>
            ): ''}
        </>
    )
}