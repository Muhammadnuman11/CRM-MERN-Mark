const asyncHandler = require('express-async-handler')

const Item = require('../models/itemModel')

// Get Items
// Get /api/items
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find()
    res.status(200).json(items)

})

// Set Item
// Post /api/item
const setItem = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if (!req.body) {
        res.status(400)
        throw new Error('Please Add fields')
    }
    // Create a new item directly from req.body
    const item = await Item.create(req.body);
    res.status(200).json(item)
})

// Update Item
// Put /api/item:id
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(400)
        throw new Error('Item not found')
    }

    const { name, address, expiry, renew } = req.body;

    // const date1 = new Date();
    // const date2 = new Date(req.body.expiry);

    // // Calculate the difference in milliseconds
    // const differenceMs = date2 - date1;
    // // Convert milliseconds to days
    // const remDays = differenceMs / (1000 * 60 * 60 * 24);
    // const days = Math.ceil(remDays)
    // console.log(days)


    const updateObject = {};
    if (name) updateObject.name = name;
    if (address) updateObject.address = address;
    if (expiry) updateObject.expiry = expiry;
    if (renew) updateObject.renew = renew;
    // if (days) updateObject.remDays = days;

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateObject, { new: true });

    res.status(200).json(updatedItem);
})

// Delete Item
// Delete /api/item:id
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(400)
        throw new Error('Item not found')
    }

    // await item.findByIdAndDelete()
    const deletedItem = await Item.findByIdAndDelete(req.params.id, req.body)

    res.status(200).json(deletedItem)
})

module.exports = {
    getItems,
    setItem,
    updateItem,
    deleteItem,
}