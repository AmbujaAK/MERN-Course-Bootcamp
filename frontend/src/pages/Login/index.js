import React, { useState } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Login({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log('result of submit : ', email, password)

        const response = await api.post('/login', { email, password })
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
            <h2>login:</h2>
            <p>Please <strong>Login</strong> into your account.</p>
            <Form onSubmit={ handleSubmit }>
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
                {' '}
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}