import axios from "axios";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const initialState = {
    name: "",
    address: "",
    expiry: "",
    renew: "",
}

export default function Header() {

    const [state, setState] = useState(initialState);

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleAdd = async (e) => {
        e.preventDefault()

        let { name, address, expiry, renew } = state

        name = name.trim()
        address = address.trim()

        if (name.length < 3) {
            return window.notify("Please enter name", "error")
        }
        if (address.length < 3) {
            return window.notify("Please enter address", "error")
        }
        if (!expiry) {
            return window.notify("Please enter expiry date", "error")
        }
        if (!renew) {
            return window.notify("Please enter renew date", "error")
        }
        let itemData = { name, address, expiry, renew };
        // console.log(itemData)
        try {
            await axios.post('http://localhost:5000/api/items', itemData);
            // console.log('Data sent successfully:', response.data);
            window.notify("Item add successfully", "success")
            setState(initialState);
        } catch (error) {
            // console.error('Error sending data:', error);
            window.notify("Error adding item:", "error")
        }

    }

    return (
        <>
            <header>
                <nav className="navbar fixed-top navbar-expand-lg custom_nav-container  navbar-info p-0" style={{ background: '#155263' }}>
                    <div className="container">
                        <Link to="/" className="navbar-brand fs-2 fw-bold text-white">
                            <img src="images/Logo.png" alt="" />
                            Markoverment
                        </Link>
                        <button className="navbar-toggler shadow-none border-0 navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                                <lord-icon
                                    src="https://cdn.lordicon.com/ipnwkgdy.json"
                                    trigger="loop"
                                    delay="500"
                                    state="in-view-5"
                                    colors="primary:#ffffff"
                                    style={{ width: "40px", height: "40px" }}>
                                </lord-icon>
                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex w-100">
                                <ul className="navbar-nav d-flex justify-content-end me-auto w-100 mb-2 mb-lg-0">
                                    <li className="nav-item mx-2">
                                        <NavLink to="/" className="nav-link text-white ">Home</NavLink>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <NavLink to="/" className="nav-link text-white" data-bs-toggle="modal" data-bs-target="#dataModal">Add Data</NavLink>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="dataModalLabel">Add Items</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="my-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder='Enter Item Name' className='form-control shadow-none p-2 my-1' name='name' value={state.name} onChange={handleChange} />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" placeholder='Enter Address' className='form-control shadow-none p-2 my-1' name='address' value={state.address} onChange={handleChange} />
                                </div>

                                <div className="my-2">
                                    <label htmlFor="expiry">Expiry Date</label>
                                    <input type="date" id="expiry" placeholder='Expiry Date' className='form-control shadow-none p-2 my-1' name='expiry' value={state.expiry} onChange={handleChange} />
                                </div>

                                <div className="my-2">
                                    <label htmlFor="renew">Renew Date</label>
                                    <input type="date" id="renew" placeholder='Renew Date' className='form-control shadow-none p-2 my-1' name='renew' value={state.renew} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleAdd} className="btn btn-primary" data-bs-dismiss="modal">Add Item</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}