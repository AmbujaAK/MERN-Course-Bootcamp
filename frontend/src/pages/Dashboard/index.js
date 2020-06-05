import React, { useEffect, useState, useMemo } from 'react'
import api from '../../services/api'
import moment from 'moment'
import { Alert, Button, ButtonGroup} from 'reactstrap';
import './dashboard.css'
import socketio from 'socket.io-client'

// Dashboard will show all the events
export default function Dahsboard({ history }){
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    const [rSelected, setRSelected] = useState(null);
    const [error, setError ] = useState(false)
    const [success, setSuccess ] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [eventsRequest, setEventsRequest] = useState([])


    useEffect(() => {
        getEvents()
    },[])

    const socket = useMemo(() => 
        socketio('http://localhost:8081', { query: { user: user_id }}),
        [user_id]
    )

    useEffect(() => {
        socket.on('registration_request', data => setEventsRequest([...eventsRequest, data]))
    },[eventsRequest, socket])


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
            setMessageHandler('Event is deleted successfully !')
            setTimeout(()=>{
                setSuccess(false)
                filterHandler(null)
                setMessageHandler('')
            },3000)
        } catch (error) {
            setError(true)
            setMessageHandler('Error when deleting event')
            setTimeout(()=>{
                setError(false)
                setMessageHandler('')
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

    const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        history.push('/login')
    }

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user }})

            setSuccess(true)
            setMessageHandler(`The request for the event ${event.title} was successful!`)
            setTimeout(()=>{
                setSuccess(false)
                filterHandler(null)
                setMessageHandler('')
            },3000)
        } catch (error) {
            setError(true)
            setMessageHandler(`The request for the event ${event.title} failed`)
            setTimeout(()=>{
                setError(false)
                setMessageHandler('')
            },3000)
        }
    }

    return(
        <>
            <ul className='notifications'>
            {eventsRequest.map((request) => {
                console.log(request)
                return(
                    <li key={request.event._id}>
                        <div>
                            <strong>{request.user.email}</strong> is requesting to register your Event.
                            <strong>{request.event.title}</strong>
                            <ButtonGroup>
                                <Button color='success' onClick={() => {}}>Accept</Button>
                                <Button color='danger' onClick={() => {}}>Cancel</Button>
                            </ButtonGroup>
                        </div>
                    </li>
                )
            })}
            </ul>
            <div className='filter-panel'>
                <ButtonGroup>
                    <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Sports</Button>
                    <Button color="primary" onClick={myEventsHandler} active={rSelected === 'myevents'}>My Events</Button>
                    <Button color="primary" onClick={() => filterHandler('running')} active={rSelected === 'running'}>Running</Button>
                    <Button color="primary" onClick={() => filterHandler('cycling')} active={rSelected === 'cycling'}>Cycling</Button>
                    <Button color="primary" onClick={() => filterHandler('swimming')} active={rSelected === 'swimming'}>Swimming</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color='secondary' onClick={() => history.push('events')}>Events</Button>
                    <Button color='danger' onClick={logoutHandler}>Logout</Button>
                </ButtonGroup>
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
                        <Button color='primary' onClick={() => registrationRequestHandler(event)}>Registration request</Button>
                    </li>
                ))}
            </ul>
            {error ? (
                <Alert className='event-validation' color='danger'>{messageHandler}</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'>{messageHandler}</Alert>
            ): ''}
        </>
    )
}