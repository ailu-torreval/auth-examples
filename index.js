const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

//encrypting
const bcrypt = require("bcrypt");
const saltRounds = 10;

//REMEMBER TO ALWAYS INITIALIZE THE DB, WITH NODE INDEX.JS ON THE TERMINALLLL

const TravelDestination = require("./schemas/traveldestination");
const User = require("./schemas/UserSchema");
const UserSchema = require("./schemas/UserSchema");

let uri = "mongodb://localhost:27017/destinations";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const db = client.db("travel-destinations");
// const tdCollection = db.collection("destinations");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.myName = "my name";
  next();
});

mongoose.connect(uri).catch((error) => console.log(error));

app.get("/destinations", async (req, res) => {
  try {
    const travelDestinations = await TravelDestination.find();
    res.status(200).json(travelDestinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // TravelDestination.find().then({}, (err, travelDestinations) => {
  //   if (err) console.log(err);
  //   res.status(200).json(travelDestinations);
  // })
  // .catch((err) => console.log(err))

  //express class - 18-9
  // const result = await tdCollection.find().toArray();

  // res.status(200).json(result);

  // hard coded
  //   res.send(destinations);
});

app.get("/destinations/:id", async (req, res) => {
  //express class - 18-9

  // const filter = { _id: new ObjectId(req.params.id) };
  // const result = await tdCollection.findOne(filter);
  // const result = await tdCollection.find().toArray();

  res.status(200).json(result);

  // hard coded
  //   res.send(destinations);
});

app.post("/destinations", async (req, res) => {
  const travelDestination = new TravelDestination({
    link: req.body.link,
    country: req.body.country,
    title: req.body.title,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    image: req.body.image,
    description: req.body.description,
  });

  console.log("1");
  console.log("2");
  travelDestination
    .save()
    .then(function (err) {
      if (err) {
        // console.log(err);
        res.status(500).json(err);
      } else {
        console.log("3");
        res.status(201).json(travelDestination);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });

  //express class - 18-9

  // const result = await tdCollection.insertOne(req.body);
  // console.log(result);
  //HARD CODED
  //   let maxId = 0; // Start with a very small value
  //   for (const obj of destinations) {
  //     if (obj.id > maxId) {
  //       maxId = obj.id;
  //     }
  //   }
  //   const newDest = {
  //     id: maxId + 1,
  //     ...req.body,
  //   };
  //   destinations.push(newDest);
  //   console.log(destinations);
  // const filter = { _id: result.insertedId };
  // console.log(filter);
  // const newDestinationObj = await tdCollection.findOne({
  //   _id: result.insertedId,
  // });
  // res.status(201).json(newDestinationObj);
});

app.put("/destinations/:id", async (req, res) => {
  const destination = await TravelDestination.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json({ message: "success" });
  // const updatedDestination = {
  //   $set: {
  //     country: req.body.country,
  //   },
  // };
  // const filter = { _id: new ObjectId(req.params.id) };
  // //you can use update if you want to change only one property of an object
  // //   const result = await tdCollection.updateOne(filter, updatedDestination);
  // const result = await tdCollection.findOneAndReplace(filter, req.body);

  // const updatedDestinationObj = await tdCollection.findOne(filter);

  // console.log(result);
  // res.status(200).send(updatedDestinationObj);
  //HARD CODED
  //   const index = destinations.findIndex((dest) => dest.id == id);
  //   destinations[index].country = req.body.country;
  //   console.log(destinations);
  //  res.status(200).json(result);
});

app.delete("/destinations/:id", async (req, res) => {
  // const id = req.params.id;
  // const filter = { _id: new ObjectId(id) };
  // // const deleteResult = await myColl.deleteOne(doc);
  // const deletedResult = await tdCollection.deleteOne(filter);
  await TravelDestination.deleteOne(req.param.id).then((result) => {
    res.status(200).send({ message: "success" });
  });

  // HARD CODED
  //   const index = destinations.findIndex((dest) => dest.id == id);
  //   destinations.splice(index, 1);
  //   console.log(destinations);
});

// USER

app.post("/auth/signup", (req, res) => {
  //   bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  //     // Store hash in your password DB.
  // });

  const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
  const user = new User({
    // when you say new, mongoose will create new instance, new id etc....(new is calling the constructor)
    email: req.body.email,
    password: hashedPass,
  });

  user
    .save()
    .then(function (err) {
      if (err) {
        // console.log(err);
        res.status(500).json(err);
      } else {
        console.log("3");
        res.status(201).json(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.post("/auth/login", async (req, res)=> {
  const userToLogin = await User.findOne().where({email: req.body.email})
  const isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password)
  res.status(200).json(isPasswordValid);
})

app.listen(port, () => console.log("server started, listening on port", port));
