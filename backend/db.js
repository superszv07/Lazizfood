const mongoose = require('mongoose');
const mongoURL  = "mongodb+srv://shahbazahmad2001:Shah123@cluster0.u8i05.mongodb.net/lazizfood?retryWrites=true&w=majority&appName=Cluster0"
//const mongoURL = 'mongodb+srv://shahbazahmad2001:Shah123@cluster0.u8i05.mongodb.net/lazizfood?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async()=>{
    mongoose.connect(mongoURL)
  .then(async () => {
    console.log('MongoDB Connected...');
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray()
    global.food_items =fetched_data
    global.foodCategory = foodCategory
    
  })
  .catch(err => {
    console.error(err);
  });
}
module.exports = mongoDB;