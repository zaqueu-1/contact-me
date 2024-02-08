import mongoose from 'mongoose'

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

export default connectToDb