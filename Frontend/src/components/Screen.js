import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Screen = () => {
    const [item, setItem] = useState([])
    const API_URL = 'http://localhost:5000/api/'
    const [id, setId] = useState(-1)
    const [uname, setUname] = useState('')
    const [uskill, setUskill] = useState('')
    const [showname, setShowname] = useState('')
    const [showskill, setShowskill] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        axios.get(API_URL + 'get/' + id).then((res) => {
            setShowname(res.data[0].Name)
            setShowskill(res.data[0].Skills)
        }).catch((er) => {
            alert(er)
        })
    }
    useEffect(() => {
        axios.get(API_URL + 'get').then((res) => {
            setItem(res.data)
        }).catch((er) => {
            alert(er)
        })
    }, [])
    const handleedit = (id) => {
        setId(id)
        axios.get(API_URL + 'get/' + id).then((res) => {
            setUname(res.data[0].Name)
            setUskill(res.data[0].Skills)
        })
    }
    const handledelete = (id) => {
        axios.delete(API_URL + 'delete/' + id).then((res) => {
            window.location.reload()
        }).catch((er) => {
            alert(er)
        })
    }
    const handleupdate = (id) => {
        if (uname.length === 0 || uskill.length === 0) {
            alert('Input field is required')
            window.location.reload()
        } else {
            axios.patch(API_URL + 'update/' + id, { Name: uname, Skills: uskill }).then((res) => {
                window.location.reload()
            }).catch((er) => {
                alert(er)
            })
        }
    }
    return (
        <div className='table-responsive'>
            <table className='table table-bordered col-lg-12'>
                <thead>
                    <tr className='text-center'>
                        <th>s.no</th>
                        <th>Name</th>
                        <th>Skill</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((ite, index) => (
                        ite._id === id ?
                            <tr>
                                <td>{index + 1}</td>
                                <td><input className='form-control' style={{ border: "2px solid black" }} type="text" value={uname} onChange={(e) => setUname(e.target.value)} /></td>
                                <td><input className='form-control' style={{ border: "2px solid black" }} type="text" value={uskill} onChange={(e) => setUskill(e.target.value)} /></td>
                                <td><button className='btn btn-success mx-auto w-100' onClick={() => handleupdate(ite._id)}>Update</button>
                                </td>
                            </tr>
                            :
                            <tr>
                                <td>{index + 1}</td>
                                <td>{ite.Name}</td>
                                <td>{ite.Skills}</td>
                                <td className='text-center'><button className='btn btn-warning btn-sm mx-2' onClick={() => handleedit(ite._id)}>Edit</button>/
                                    <button className='btn btn-danger btn-sm mx-2' onClick={() => handledelete(ite._id)} >Delete</button>/
                                    <Button className='btn btn-info btn-sm mx-2' variant="primary" onClick={() => handleShow(ite._id)}>
                                        View
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>Name  <span className='text-primary ms-3'>{showname}</span> </p>
                                            <p>Skills <span className='text-primary ms-3'>{showskill}</span>  </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Screen