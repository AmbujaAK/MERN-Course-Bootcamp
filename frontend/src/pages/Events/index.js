import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import './events.css'


export default function Events({ history }){
    const [title, setTitle ] = useState('')
    const [description, setDescription ] = useState('')
    const [price, setPrice ] = useState('')
    const [thumbnail, setThumbnail ] = useState(null)
    const [sport, setSport ] = useState('')
    const [date, setDate ] = useState('')
    const [errorMessage, setErrorMessage ] = useState(false)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null
    }, [thumbnail])

    const submitHandler = async (event) => {
        event.preventDefault()
        const user_id = localStorage.getItem('user')

        const eventData = new FormData()

        eventData.append('thumbnail', thumbnail)
        eventData.append('title', title)
        eventData.append('sport',sport)
        eventData.append('price', price)
        eventData.append('description', description)
        eventData.append('date', date)
        
            try {
                if(title !== '' && 
                    description !== '' && 
                    sport !== '' && 
                    price !== '' &&
                    date !== '' &&
                    thumbnail !== null
                ){
                    await api.post('/event', eventData, { headers: {user_id}})
                    console.log(eventData)
                } else {
                    setErrorMessage(true)
                    setTimeout(()=>{
                        setErrorMessage(false)
                    },5000)

                    console.log('Missing required data')
                }
            } catch (error) {
                Promise.reject(error)
                console.log(error)
            }
 
        return ''
    }

    return(
        <Container>
            <h1>Create your events</h1>
            <Form onSubmit={ submitHandler }>
                <FormGroup>
                    <Label>Upload Image :</Label>
                    <Label id='thumbnail' style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>                
                    <Input type='file' onChange={(event) => setThumbnail(event.target.files[0])}></Input>
                    <img src={cameraIcon} style={{ maxWidth: '50px'}} alt='upload icon image'/>
                    </Label>
               </FormGroup>

               <FormGroup>
                    <Label>Sport :</Label>
                    <Input id='sport' type='text' value={sport} placeholder={'Sprots name'} onChange={(event) => setSport(event.target.value)}></Input>
               </FormGroup>

               <FormGroup>
                    <Label>Title :</Label>
                    <Input id='title' type='text' value={title} placeholder={'Event Title'} onChange={(event) => setTitle(event.target.value)}></Input>
               </FormGroup>

               <FormGroup>
                    <Label>Event description :</Label>
                    <Input id='description' type='text' value={description} placeholder={'Event Description'} onChange={(event) => setDescription(event.target.value)}></Input>
               </FormGroup>

               <FormGroup>
                    <Label>Event Price :</Label>
                    <Input id='price' type='text' value={price} placeholder={'Event price'} onChange={(event) => setPrice(event.target.value)}></Input>
               </FormGroup>

               <FormGroup>
                    <Label>Event Date :</Label>
                    <Input id='date' type='date' value={date} placeholder={'Event date'} onChange={(event) => setDate(event.target.value)}></Input>
               </FormGroup>

                <Button type='submit'>Create event</Button>
            </Form>
            {errorMessage ? (
                <Alert className='event-validation' color='danger'>Missing required information</Alert>
            ): ''}

        </Container>
    )
}