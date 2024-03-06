require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Enable CORS to get hit or request from other servers
app.use(cors());
// required to parse the html body in response
app.use(bodyParser.json());

app.use('/api/items', require('./routes/itemsRoutes'));

app.use(errorHandler)

connectDB().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`))
})