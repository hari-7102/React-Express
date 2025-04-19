// const express = require('express')
// const mongoose = require('mongoose');
// const app = express()
// const port = 3000


// // middleware
// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// app.post("/postdata",(req,res) =>{
//     const {userName,userPhone} = req.body
    
//     const {id } = req.query
//     console.log("userName" , userName)
//     res.send({ 

//         Message : 'Sucessfully' ,
//         name : userName ,
//         userid : id

//         })
// })

// app.post("/Data" , (req,res)  =>{
//     const Employeename = req.body

//     const {id , cateid} = req.query
//     console.log("Data Of Students :", Employeename )
//     res.send({
//         Employeename,
//         id : id,
//         category : cateid
//     })
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })





const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



// MongoDB URI (use your own for MongoDB Atlas or local)
const mongoURI = 'mongodb+srv://hariharanbvn28:8pKz2xMuh2dBmuhN@cluster0.tscfgvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test'; // replace "yourdbname" with your DB name



// 🔌 Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🧱 Define Schema & Model
const EmployeeSchema = new mongoose.Schema({
  userName: String,
  userPhone: String ,
  userEmail : String
});

const Employee = mongoose.model('Employee', EmployeeSchema);


const UserSchema = new mongoose.Schema({
  userId : Number,
  userAddress: String,
  userState: String ,
  userCountry : String
});

const User = mongoose.model('User', UserSchema);

// middleware
app.use(express.json());

// Default route
app.get('/getdata', async (req, res) => {

    try{
        // const employees = await Employee.find();
        const users = await Employee.findOne({
            _id : '6800da2be3bcdbbcf5674da7'
        });
        console.log("response", users)

        res.json(users)
    }catch(e){
        console.log("error",e)
        res.send('Hello World!');
    }
});




// 📥 POST route with MongoDB save
app.post("/postdata", async (req, res) => {
  const { userName, userPhone , userEmail } = req.body;
  const { id } = req.query;

  try {
    const newEmployee = new Employee({ userName, userPhone ,userEmail});
    await newEmployee.save();

    res.send({
      message: 'Successfully saved to DB',
      name: userName,
      phone: userPhone,
      email : userEmail,
      userId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📥 POST route with MongoDB save
app.post("/userdata", async (req, res) => {
  const {userId ,  userAddress, userState , userCountry } = req.body;
  // const { id } = req.query;

  try {
    const newUser = new User({userId , userAddress, userState ,userCountry});
    await newUser.save();

    res.send({
      message: 'Successfully saved to DB',
      id : userId,
      address: userAddress,
      state: userState,
      country : userCountry,
      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }



});






app.put("/userdata", async (req, res) => {
  const { userAddress, userState, userCountry } = req.body;
  const { id } = "680220b781bf567c2868f83e"

  // Basic validation
  if (!id) {
    return res.status(400).json({ message: "Missing user ID in query" });
  }

  if (!userAddress && !userState && !userCountry) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userAddress, userState, userCountry },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found with the given ID" });
    }

    res.send({
      message: "Successfully updated in DB",
      address: updatedUser.userAddress,
      state: updatedUser.userState,
      country: updatedUser.userCountry,
      userId: updatedUser._id,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ error: error.message });
  }
});



  
  
app.delete("/userdata/:id", async (req, res) => {
     const { id } = req.params;
  
    // Basic validation
    if (!id) {
      return res.status(400).json({ message: "Missing user ID in query" });
    }
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);

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
  
// Another route (optional MongoDB usage)
// app.post("/Data", (req, res) => {
//   const Employeename = req.body;
//   const { id, cateid } = req.query;

//   console.log("Data Of Students :", Employeename);

//   res.send({
//     Employeename,
//     id: id,
//     category: cateid
//   });
// });



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});





