const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Volunteer=require('./models/Volunteer');
const Item=require('./models/Inventory');
const Activity=require('./models/Activity');
const Donar = require('./models/Donar');
const Rankings=require('./models/Rankings')


const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://varma:12345@cluster0.eu34b.mongodb.net/NGOApp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('connected to MongoDB'))
.catch(err=>console.log('mongoDB connection error',err));

app.post('/vdata',async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    const newVolunteer=new Volunteer({name,email,password});
    const savedVolunteer=await newVolunteer.save();

    res.status(201).json(savedVolunteer);
  }
  catch(error){
    res.status(400).json('error',error);
  }
})

app.post('/idata',async(req,res)=>{
  try{
    const {name,quantity}=req.body;
    const id= Date.now().toString();
  const newItem=new Item({id,name,quantity});
  const savedItem=await newItem.save();

  res.status(201).json(savedItem);
  }
  catch(error){
    res.status(400).json('error',error);
}
})

app.post('/adata', async (req, res) => {
    try {
        const data = req.body;
        const id = Date.now();
        const newActivity = new Activity({
            id: id,
            Activity: data.Activity,
            Status: 'pending'
        });
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(400).json({ error: error.message });
    }
});


app.post('/saveDonar', async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, phoneNumber, email, donationItem, donationQuantity } = req.body;

    const newDonar = new Donar({
      name,
      age,
      phoneNumber,
      email,
      donationItem,
      donationQuantity
    });

    const item=await Item.findOne({name:donationItem});

    if(item){
      const quan=item.quantity-Number(donationQuantity);
      if(quan<=0){
        await item.deleteOne();
      }else{
        item.quantity=quan;
        await item.save();
      }
    }

    const savedDonar = await newDonar.save();
    res.status(201).json(savedDonar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/complete/:id/:volunteerName', async (req, res) => {
  const id = req.params.id;
  const volunteerName = req.params.volunteerName;

  try {
    const result = await Activity.findByIdAndUpdate(id, { Status: 'completed' });

    if (!result) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    let volunteer = await Rankings.findOne({ name: volunteerName });

    if (volunteer) {
      volunteer.tasksCompleted = volunteer.tasksCompleted + 1;
      await volunteer.save(); // <-- IMPORTANT: save after updating
    } else {
      const newRanking = new Rankings({
        name: volunteerName,
        tasksCompleted: 1
      });
      await newRanking.save();
    }

    res.json({ message: 'Task updated successfully', result });
  }
  catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/volunteers',async(req,res)=>{
  try{
    const data=await Volunteer.find();
    res.status(200).json(data);
  }
  catch(error){
    console.log('error occurred fetching posts',error);
    res.status(500).json({error:'Failed to fetch volunteers'});
  }
})

app.get('/inventory',async(req,res)=>{
  try{
    const data=await Item.find();
    res.status(200).json(data);
  }
  catch(error){
    console.log('error occurred fetching Items',error);
    res.status(500).json({error:'Failed to fetch Items'});
  }
})

app.get('/activities',async(req,res)=>{
  try{
    const data=await Activity.find();
    res.status(200).json(data)
  }
  catch(error){
    console.log("error occurred while fethcing activities");
    res.status(500).json({error:'failed fetching activities'});
  }
})

app.get('/donations',async(req,res)=>{
  try{
    const data=await Donar.find();
    res.status(200).json(data);
  }
  catch(error){
    console.log('error occured fetching donations');
    res.status(500).json({error:'failed fetching donations'});
  }
})

app.get('/rankings',async(req,res)=>{
  try{
    const data=await Rankings.find().sort({ tasksCompleted: -1 });
    res.status(200).json(data);
  }
  catch(error){
    console.log('error occured fetching rankings');
    res.status(500).json({error:'failed fetching rankings'});
  }
})

app.delete('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(5000,()=>{
  console.log("App is listening on http://localhost:5000");
})