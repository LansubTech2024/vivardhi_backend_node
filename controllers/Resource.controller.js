const Resource = require('../models/Resource.model'); // Adjust the path as necessary

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.findAll(); // Fetch all resources from the database
        res.json(resources); // Send the resources as a JSON response
    } catch (error) {
        console.error("Error retrieving resources:", error);
        res.status(500).json({ message: "Error retrieving resources", error });
    }
};