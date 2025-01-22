import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routers';


const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api", router);


app.get('/', (req: Request, res: Response)=>{
    res.send("Server is running.......");
});



export default app;