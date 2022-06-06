const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs-extra");
const fileUpload = require("express-fileupload");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// ***Database URI***

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uv9mv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("apartments"));
app.use(fileUpload());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Working");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookings = client.db("creativeAgency").collection("bookings");
  const apartments = client.db("creativeAgency").collection("apartments");
  app.post("/addBooking", (req, res) => {
    const bookings = req.body;
    bookings.insertOne(booking).then((result) => {});
  });
  app.get("/allBookingsList", (req, res) => {
    //console.log(req.query.email);
    bookings.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.get("/booking", (req, res) => {
    //console.log(req.query.email);
    bookings.find({ email: req.query.email }).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.post("/addApartment", (req, res) => {
    const file = req.files.file;

    const name = req.body.name;
    const price = req.body.price;

    const newImg = req.files.file.data;
    const encImg = newImg.toString("base64");

    var image = {
      contentType: req.files.file.mimetype,
      size: req.files.file.size,
      img: Buffer.from(encImg, "base64"),
    };

    apartments.insertOne({ name, price, image }).then((result) => {
      res.send(result.insertedCount > 0);
    });
    // return res.send({ name: file.name, path: `${file.name}` });
    //});
  });
  app.get("/apartments", (req, res) => {
    services
      .find({})
      .sort({ _id: -1 })
      .limit(6)
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
  app.patch("/updateBooking", (req, res) => {
    orders
      .updateOne(
        { _id: ObjectId(req.body.id) },
        {
          $set: { status: req.body.status },
        }
      )
      .then((result) => {
        res.send(result);
      });
  });
});

app.listen(process.env.PORT || port);
