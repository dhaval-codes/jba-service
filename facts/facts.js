import { Facts } from "../models/facts.js";

export const getRandomFact = async (req, res) => {
    try {
      const factNumber = req.query.for;
      const randomFactNumber = parseInt(factNumber);
  
      // Retrieve a random fact based on the 'factNumber'
      const randomFact = await Facts.findOne({}).skip(randomFactNumber - 1);
  
      if (!randomFact) {
        return res.status(404).json({ message: 'Fact not found' });
      }
  
      res.send(randomFact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};