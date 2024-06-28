import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import Header1 from '../Component/Header1'
import Footer from '../Component/Footer'


function Review_form() {

    const redirect = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('userid')) {
            redirect('/review_form');
        }
    }, []);

    const [formvalue, setFormvalue] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
    });

    const changeHandel = (e) => {
        setFormvalue({ ...formvalue, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
        console.log(formvalue);
    }

    const validation = () => {
        var result = true;
        if (formvalue.name == "") {
            toast.error('Name field is required !');
            result = false;
            return false;
        }
        if (formvalue.email == "") {
            toast.error('email field is required !');
            result = false;
            return false
        }
        if (formvalue.mobile == "") {
            toast.error('mobile field is required !');
            result = false;
            return false
        }
        if (formvalue.message == "") {
            toast.error('Message field is required !');
            result = false;
            return false
        }
        return result;
    }
    const submitHandel = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.post(`http://localhost:3000/review`, formvalue);
            setFormvalue({ ...formvalue, name: "", email: "", password: "", mobile: "", img: "" });
            toast.success('Thanks For Review us');
            return false;
        }
    }

    return (
        <div>
            <Header1 />
            <section className="contact_section layout_padding">
                <div className="container ">
                    <div className="heading_container">
                        <h2>
                            REVIEW FORM
                        </h2>
                        <img src="images/plug.png" alt />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <form action="" method='post' onSubmit={submitHandel}>
                                <div>
                                    <input type="text" name='name' className='form-control' value={formvalue.name} onChange={changeHandel} placeholder="Name" />
                                </div>
                                <div>
                                    <input type="email" name='email' className='form-control' value={formvalue.email} onChange={changeHandel} placeholder="email" />
                                </div>
                                <div>
                                    <input type="number" name='mobile' className='form-control' value={formvalue.mobile} onChange={changeHandel} placeholder="mobile" />
                                </div>
                                <div>
                                    <input type="textarea" name='message' className='form-control' value={formvalue.message} onChange={changeHandel} placeholder="Message" />
                                </div>
                                <div className="d-flex ">
                                    <button type='submit' name='submit'>
                                        SEND
                                    </button>

                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Review_form