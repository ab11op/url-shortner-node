
import mongoose from "mongoose";
const db_Connection = ()=> mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ur_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: "majority" } // Ensures strong consistency
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

export default db_Connection