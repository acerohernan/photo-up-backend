import {connect} from "mongoose";

const uri = "mongodb+srv://db_photo_up:db_photo_up_password@cluster0.jbe9p.mongodb.net/photo_up_db?retryWrites=true&w=majority";

export async function startConnection() {
    await connect(uri);
    console.log("MongoDB database is connected");
};