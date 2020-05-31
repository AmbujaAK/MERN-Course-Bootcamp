import React, { useState } from 'react'
import api from '../../services/api'
import { Alert, Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Register({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessgae] = useState('false')
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        if(email !== '' && password !== '' && firstName !== '' && lastName !== ''){
            const response = await api.post('/user/createUser', { email, password ,firstName, lastName})
            const userId = response.data._id || false

            if(userId){
                localStorage.setItem('user', userId)
                history.push('/dashboard')
            }else{
                const { message } = response.data
                setError(true)
                setErrorMessgae(message)

                setTimeout(() => {
                    setError(false)
                    setErrorMessgae('')
                }, 3000);
            }
        } else {
            setError(true)
            setErrorMessgae('you need to fill all the inputs')

            setTimeout(() => {
                setError(false)
                setErrorMessgae('')
            }, 3000);
        }
    }
    return (
        <Container>
            <h2>Register: </h2>
            <p>Please <strong>Register</strong> for a new account.</p>
            <Form onSubmit={ handleSubmit }>
                <FormGroup>
                <Label for="firstName" hidden>First Name</Label>
                <Input type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="enter your first name" 
                        onChange={event => setFirstName(event.target.value)}/>
                </FormGroup>

                <FormGroup>
                <Label for="lastName" hidden>Last Name</Label>
                <Input type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="enter your last name" 
                        onChange={event => setLastName(event.target.value)}/>
                </FormGroup>

                <FormGroup>
                <Label for="exampleEmail" hidden>Email</Label>
                <Input type="email" 
                        name="email" 
                        id="exampleEmail" 
                        placeholder="enter your email" 
                        onChange={event => setEmail(event.target.value)}/>
                </FormGroup>

                <FormGroup>
                <Label for="examplePassword" hidden>Password</Label>
                <Input type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="enter your password" 
                        onChange={event => setPassword(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Button className='submit-btn'>Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button 
                        className='secondary-btn' 
                        onClick={() => history.push('/login')}>
                        Login Instead ?
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>{errorMessage}</Alert>
            ): ''}
        </Container>
    );
}