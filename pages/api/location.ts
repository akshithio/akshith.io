// pages/api/location.js
let latestLocation = null; // Store only the latest location

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    const { city, timezone } = req.body;

    // Validate the input
    if (!city || !timezone) {
      return res.status(400).json({ message: 'City and timezone are required' });
    }

    // Store the latest location
    latestLocation = { city, timezone };
    return res.status(201).json({ message: 'Location saved successfully', city, timezone });
  } else if (req.method === 'GET') {
    // Handle GET request
    if (latestLocation) {
      return res.status(200).json(latestLocation);
    } else {
      return res.status(404).json({ message: 'No location found' });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
