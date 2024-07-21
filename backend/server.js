import express from 'express';


import { ENV_VARS } from './config/envVars.js';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';


const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use('/api/v1/auth',authRoutes);



app.listen(PORT,() => {
    console.log("Server is started at PORT:" + PORT);
    connectDB();
});