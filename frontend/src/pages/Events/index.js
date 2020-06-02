import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert, DropdownToggle, DropdownMenu, DropdownItem,ButtonDropdown } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import './events.css'


export default function Events({ history }){
    const [title, setTitle ] = useState('')
    const [description, setDescription ] = useState('')
    const [price, setPrice ] = useState('')
    const [thumbnail, setThumbnail ] = useState(null)
    const [sport, setSport ] = useState('Sport')
    const [date, setDate ] = useState('')
    const [error, setError ] = useState(false)
    const [success, setSuccess ] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null
    }, [thumbnail])

    const submitHandler = async (event) => {
        event.preventDefault()
        const user = localStorage.getItem('user')

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
                sport !== 'Sport' && 
                price !== '' &&
                date !== '' &&
                thumbnail !== null
            ){
                await api.post('/event', eventData, { headers: {user}})
                setSuccess(true)
                setTimeout(()=>{
                    setSuccess(false)
                },3000)

            } else {
                setError(true)
                setTimeout(()=>{
                    setError(false)
                },3000)
            }
        } catch (error) {
            Promise.reject(error)
            console.log(error)
        }
    }

    const sportEventHandler = (sport) => setSport(sport)
    
    return(
        <Container>
            <h1>Create your events</h1>
            <Form onSubmit={ submitHandler }>
                <FormGroup>
                    <Label>Upload Image :</Label>
                    <Label id='thumbnail' style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>                
                    <Input type='file' onChange={(event) => setThumbnail(event.target.files[0])}></Input>
                    <img src={cameraIcon} style={{ maxWidth: '50px'}} alt='upload icon'/>
                    </Label>
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

               <FormGroup>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <Button id= 'caret' value={sport} disabled>{sport}</Button>
                        <DropdownToggle caret />
                        <DropdownMenu>
                            <DropdownItem onClick={() => sportEventHandler('running')}>running</DropdownItem>
                            <DropdownItem onClick={() => sportEventHandler('cycling')}>cycling</DropdownItem>
                            <DropdownItem onClick={() => sportEventHandler('swimming')}>swimming</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </FormGroup>

                <FormGroup>
                    <Button type='submit' className='submit-btn'>Create event</Button>
                </FormGroup>

                <FormGroup>
                    <Button 
                        className='secondary-btn' 
                        onClick={() => history.push('/')}>
                        Go To Dashboard
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>Missing required information</Alert>
            ): ''}
            {success ? (
                <Alert className='event-validation' color='success'> Event created successfully !</Alert>
            ): ''}

        </Container>
    )
}