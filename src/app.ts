import express, { Request, Response } from 'express';
import cors from 'cors';


const app = express();
app.use(cors());



app.get('/', (req: Request, res: Response)=>{
    res.send("Server is running.......");
});



export default app;