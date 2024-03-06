const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    address: {
        type: String,
        required: [true, 'Please add a address value']
    },
    expiry: {
        type: String,
        required: [true, 'Please add a expiry date']
    },
    renew: {
        type: String,
        required: [true, 'Please add a renew date']
    },
    // remDays: {
    //     type: Number,
    //     required: [true, 'Please add a remaining days']
    // },
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)