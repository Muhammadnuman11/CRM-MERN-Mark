import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { MdDelete, MdEditSquare } from "react-icons/md";

const initialState = {
  name: "",
  address: "",
  expiry: "",
  renew: "",
}

export default function Home() {
  const [items, setItems] = useState([]);

  // Get items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items'); // Replace '/api/items' with your backend endpoint
        const itemsData = response.data.map(item => {
          const date1 = new Date();
          const date2 = new Date(item.expiry);

          // Calculate the difference in milliseconds
          const differenceMs = date2 - date1;
          // Convert milliseconds to days
          const remDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

          // Return the item object with remDays added
          return { ...item, remDays };
        });
        setItems(itemsData);
        // console.log(itemsData)
      } catch (error) {
        // console.error('Error fetching data:', error);
        window.notify("Error fetching items:", "error")
      }
    };

    fetchData();
  }, []);

  // Delete Items
  const handleDelete = async (item) => {
    const itemId = item._id;
    const confirmation = window.confirm("Are you sure you want to delete this item?");

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${itemId}`);
        // console.log('Item deleted successfully:', response.data);
        window.notify("Item deleted successfully", "success")
      } catch (error) {
        // console.error('Error deleting item:', error);
        window.notify("Error deleting item:", "error")
      }
    }

  }

  // Update Items
  const [state, setState] = useState(initialState);

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async (e) => {
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
    const itemId = state._id;

    try {
      await axios.put(`http://localhost:5000/api/items/${itemId}`, itemData);
      // console.log('Item updated successfully:', response.data);
      window.notify("Item updated successfully:", "success")
    } catch (error) {
      // console.error('Error updating item:', error);
      window.notify("Error updating item", "error")
    }

  }


  // Sort items
  const sortedItems = items.sort((a, b) => a.remDays - b.remDays);


  const data = {
    columns: [
      {
        label: 'S No.', field: 'serial', sort: 'asc', width: 100,
      },
      {
        label: 'Name', field: 'name', sort: 'asc', width: 100,
      },
      {
        label: 'Address', field: 'address', sort: 'asc', width: 100
      },
      {
        label: 'Expiry Date', field: 'expiry', sort: 'asc', width: 100
      },
      {
        label: 'Renew Date', field: 'renew', sort: 'asc', width: 100
      },
      {
        label: 'Rem Days', field: 'remDays', sort: 'asc', width: 100
      },
      { field: "action", label: 'Action', sort: true }
    ],

    rows: sortedItems.map((item, i) => ({
      serial: i + 1,
      name: item.name,
      address: item.address,
      expiry: item.expiry,
      renew: item.renew,
      remDays: item.remDays,

      action: (
        <>
          <button className='text-danger border-0 fs-4 mx-2 bg-transparent p-0 m-0' onClick={() => handleDelete(item)}>
            <MdDelete />
          </button>
          <button className='text-secondary border-0 fs-4 mx-2 bg-transparent p-0 m-0' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => setState(item)}>
            <MdEditSquare />
          </button>
        </>
      )
    }))
  };

  return (
    <>
      <div className="home">
        <h1>Data Table</h1>
        <MDBDataTable
          responsive
          striped
          bordered
          small
          data={data}
        />
      </div>

      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update Item</h1>
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
              <button type="button" onClick={handleUpdate} className="btn btn-primary" data-bs-dismiss="modal">Update Items</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

