import React, { useState } from 'react'
import api from '../../services/api'
import { Alert, Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Login({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessgae] = useState('false')
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await api.post('/login', { email, password })
        const user_id = response.data.user_id || false
        const user = response.data.user || false
        try {
            if(user_id){
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)
                history.push('/')
            }else{
                const { message } = response.data
                setError(true)
                setErrorMessgae(message)

                setTimeout(()=>{
                    setError(false)
                    setErrorMessgae('')
                },3000)
            }            
        } catch (error) {
            
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
                <FormGroup>
                    <Button className='submit-btn'>Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button 
                        className='secondary-btn' 
                        onClick={() => history.push('/register')}>
                        New Account
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className='event-validation' color='danger'>{errorMessage}</Alert>
            ): ''}
        </Container>
    );
}