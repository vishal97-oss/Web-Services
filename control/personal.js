const mongodb = require('../DB/connect');
const ObjectId = require('mongodb').ObjectId;

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("CarDealership")
      .collection('Cars')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createcarInfo = async(req,res) =>{ 
    const contact = {
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year,
        Miles: req.body.Miles,
        Drive: req.body.Drive,
        Engine: req.body.Engine,
        horsePower: req.body.horsePower
    };

    const response = await mongodb.getDb().db('CarDealership').collection('Cars').insertOne(contact);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}


const updatecarinfo = async (req, res) => {
  const userId = ObjectId(req.params.id);
  const contact = {
    Make: req.body.Make,
    Model: req.body.Model,
    Year: req.body.Year,
    Miles: req.body.Miles,
    Drive: req.body.Drive,
    Engine: req.body.Engine,
    horsePower: req.body.horsePower
  };
  const response = await mongodb
    .getDb()
    .db('CarDealership')
    .collection('Cars')
    .updateOne({ _id: userId }, {$set: req.body});  //.replaceOne replace entire thing or contact alone without $set: replace entire thing///// Now req.body is an object created and when we pass it it only take mentioned feilds to update. 
  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error to update.');
  }
};


module.exports = {createcarInfo, updatecarinfo, getSingle};