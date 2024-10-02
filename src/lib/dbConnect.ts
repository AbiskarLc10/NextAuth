import mongoose from "mongoose"
import { exit } from "process"

type ConnectionObject = {
    isConnected?: number
}

const connection :ConnectionObject = {}

export const connectDbs = async (): Promise<void> =>{


    if(connection.isConnected){
        console.log("Already Connected to database")
        return
    }

    try {

        const connect  = await mongoose.connect(process.env.DATABASE_URL || "")

        if(connect){

            connection.isConnected = connect.connections[0].readyState

            console.log("Connected to database Successfully");
        }
        
    } catch (error) {
        
         console.log("Database Connection error", error);
         process.exit(1)
    }


}