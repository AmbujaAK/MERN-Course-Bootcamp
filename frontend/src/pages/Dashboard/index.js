import React from 'react'

// Dashboard will show all the events
export default function Dahsboard({ history }){
    const user_id = localStorage.getItem('user')

    console.log(user_id)
    return(
        <div>
            Hello from Dahsboard
        </div>
    )
}