import mongoose, {InferSchemaType} from "npm:mongoose";


if (mongoose.connection.readyState === 0) {
    await mongoose.connect(Deno.env.get("MONGO_URL")!);
}

const Schema = mongoose.Schema;

const EmailSchema = new Schema ({
    mail: {type: String, required: true, unique: true} 
})

export type EmailModelType = mongoose.Document & InferSchemaType<typeof EmailSchema>;

export const EmailModel = mongoose.model<EmailModelType>('Email', EmailSchema);

