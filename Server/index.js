const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile')
const paymentRoutes = require('./routes/payment')
const courseRoutes = require('./routes/course')
const contactRoutes = require('./routes/contact')

const database = require('./config/database')
const {cloudinaryConnect} = require('./config/cloudinary')

const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

dotenv.config();
const PORT = process.env.PORT || 5000;

database.connectDB();
//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/temp'
    })
)

//connectng to cloudinary
cloudinaryConnect();

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/contact', contactRoutes)


//default route
app.get('/', (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})