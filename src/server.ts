import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
    
    try {
        
        if (!config.MONGO_URI) {
            throw new Error("Mongo URI is not defined");
        }

        // connect to mongo db
        await mongoose.connect(config.MONGO_URI as string)
    
        // start the server
        app.listen(config.PORT, () => {
            console.log(`Server is running on ${config.PORT}`);
        });

    } catch (err) {
        console.log(err);
        
    }

}

main();