import React, { useState } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Register({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log('result of submit : ', email, password, firstName, lastName)

        const response = await api.post('/user/createUser', { email, password ,firstName, lastName})
        const userId = response.data._id || false

        if(userId){
            localStorage.setItem('user', userId)
            history.push('/dashboard')
        }else{
            const { message } = response.data
            console.log(message)
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
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}