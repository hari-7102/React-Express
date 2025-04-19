
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
//Handling the localhost port
app.use(cors())

//Convert the JSON data into JS object 
app.use(express.json())



// MongoDB URI (use your own for MongoDB Atlas or local)
const mongoURI = 'mongodb+srv://hariharanbvn28:8pKz2xMuh2dBmuhN@cluster0.tscfgvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test'; // replace "yourdbname" with your DB name
//mongodb+srv://hariharanbvn28:<db_password>@cluster0.tscfgvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//MONGO_URI=mongodb+srv://hasansheriff:harsath@hasan.9wdvo.mongodb.net/?retryWrites=true&w=majority&appName=company


//  Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));


//Create an Schema Strcture for DB 
const WorkerSchema = new mongoose.Schema({
    userId : Number , 
    userName : String , 
    userPhone : Number ,
    userEmail : String,
    userGender : String

});

//Create an Model in DB 
const Worker = mongoose.model('Worker' , WorkerSchema);


app.post('/postdetails', async (req, res) => {
    const workerData = req.body;
  
    try {
      const newWorker = new Worker({
        userId: workerData.userId,
        userName: workerData.userName,
        userPhone: workerData.userPhone,
        userEmail: workerData.userEmail,
        userGender: workerData.userGender
      });
  
      await newWorker.save();
  
      res.send({
        message: "Successfully saved to DB",
        id: workerData.userId,
        name: workerData.userName,
        phone: workerData.userPhone,
        email: workerData.userEmail,
        gender: workerData.userGender
      });
    } catch (error) {
      console.error("Error saving worker:", error.message);
      res.status(500).json({ error: error.message });
    }
  });


app.get('/getdetails' ,async (req, res) =>{
    try{
        const user = await Worker.find()
        res.send(user)
    } catch (error){
        console.log("Error Message" , error.message)
    }
})


//Data Taken as Individually from DB to Get an Value in Updating form 
app.get('/getdetails/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Worker.findById(userId); // Assuming you're using Mongoose
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.put('/postdetails', async (req, res) => {
//     const { userId, userName, userPhone, userEmail, userGender } = req.body;
//     const  id  = "68022d75333a93bdc390abb9"
  
//     // Validate
//     if (!id) {
//       return res.status(400).json({ message: "Missing worker ID in query" });
//     }
  
//     try {
//       const updatedWorker = await Worker.findByIdAndUpdate(
//         id,
//         { userId, userName, userPhone, userEmail, userGender },
//         { new: true, runValidators: true }
//       );
  
//       if (!updatedWorker) {
//         return res.status(404).json({ message: "Worker not found with the given ID" });
//       }
  
//       res.send({
//         message: "Successfully updated in DB",
//         id: updatedWorker.userId,
//         name: updatedWorker.userName,
//         phone: updatedWorker.userPhone,
//         email: updatedWorker.userEmail,
//         gender: updatedWorker.userGender
//       });
//     } catch (error) {
//       console.error("Error updating worker:", error.message);
//       res.status(500).json({ error: error.message });
//     }
//   });





// Assuming you're using Mongoose and the model is named 'User'
app.put('/postdetails/:id', async (req, res) => {
  try {
    const updatedUser = await Worker.findByIdAndUpdate(
      req.params.id,
      {
        userId: req.body.userId,
        userName: req.body.userName,
        userPhone: req.body.userPhone,
        userEmail: req.body.userEmail,
        userGender: req.body.userGender
      },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





app.delete("/postdetails/:id", async (req, res) => {
    const userId = req.params.id;
    // const  id  = "68022d75333a93bdc390abb9"
    
   // Basic validation
   if (!userId) {
     return res.status(400).json({ message: "Missing user ID in query" });
   }
 
   try {
     const deletedUser = await Worker.findByIdAndDelete(userId);

     res.send({
       message: "User successfully deleted from DB",
       userId: deletedUser._id,
       deletedUser,
     });
   } catch (error) {
     console.error("Delete error:", error.message);
     res.status(500).json({ error: error.message });
   }
}); 




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
  