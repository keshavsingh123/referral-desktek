import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import { connectMongoose } from "./config/db.config.js";
import { userRoute } from "./src/routes/user.route.js";
import { referalRoute } from "./src/routes/referal.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send("heloo desktek")
})


app.use("/user",userRoute)
app.use("/referral",referalRoute)


// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
  connectMongoose();
});
