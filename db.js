const mongoose =require('mongoose');
const mongoURI=process.env.MONGODB;

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
          console.log('Connected to MongoDB');
        });