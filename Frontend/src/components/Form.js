import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Form = () => {
    const [name, setName] = useState('')
    const [skill, setSkill] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [error, seterror] = useState(false)
    const API_URL = 'http://localhost:5000/api/'
    const handlesubmit = (e) => {
        e.preventDefault()
        if (name.length === 0 || skill.length === 0) {
            seterror(true)
        }
        else {
            if (confirm === true) {
                axios.post(API_URL + 'create', { Name: name, Skills: skill }).then((res) => {
                    window.location.reload()
                }).catch((er) => {
                    alert(er)
                })
            } else {
                setName('')
                setSkill('')
                alert('Confirm Button " + " Not Clicked')
            }
        }
    }
    const handleconfirm = (e) => {
        e.preventDefault()
        setConfirm(true)
    }
    const handleclear = (e) => {
        e.preventDefault()
        setName('')
        setSkill('')
        setConfirm(false)
    }
    return (
        <form>
            <div className='d-flex'>
                <div className='offset-sm-3 col-sm-6'>
                    <label htmlFor="Name" className='form-label'>Name</label>
                    <input className='form-control' type="text" id='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    {error && name.length <= 0 ?
                        <label style={{ color: "red" }}>Input field is required</label> : ""}<br />
                    <label htmlFor="skill" className='form-label'>Skills</label>
                    <input className='form-control' required type="text" id='skill' value={skill} onChange={(e) => setSkill(e.target.value)} />
                    {error && skill.length <= 0 ?
                        <label style={{ color: "red" }}>Input field is required</label> : ""}
                </div>
                <button className='btn btn-warning ms-4' style={{ height: "50px", marginTop: "60px" }} onClick={handleconfirm}>+</button>
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success m-3' onClick={handlesubmit}>Save</button>
                <button className='btn btn-danger m-3' onClick={handleclear}>Clear</button>
            </div>
        </form>
    )
}

export default Form