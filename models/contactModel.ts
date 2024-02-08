import mongoose from "mongoose"
const Schema = mongoose.Schema

const contactSchema = new Schema(
    {
        name: String,
        email: String,
        tel: String,
        createdBy: String,
    },{
        timestamps: true
    }
)

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default Contact