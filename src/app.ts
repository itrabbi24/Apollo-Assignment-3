import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routers';


const app = express();
app.use(cors());


// Routes
app.use("api/", router);


app.get('/', (req: Request, res: Response)=>{
    res.send("Server is running.......");
});



export default app;