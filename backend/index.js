const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const Rootrouter = require('./routes/index');
app.use('/api/v1', Rootrouter);


app.listen(3000)



