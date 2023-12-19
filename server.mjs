
import express from 'express'; // Use import instead of require
import axios from 'axios';

const app = express();
const PORT = 3000;

// Use app.use(express.urlencoded({ extended: true })) for parsing form data if needed
app.use(express.json()); // Parse JSON body

app.post('/validatePhoneNumber', async (req, res) => {
  const { phoneNumber } = req.body; // Destructure directly from body

  try {
    // Use async/await with .get for cleaner syntax
    const response = await axios.get(
      `https://lookups.twilio.com/v1/PhoneNumbers/${phoneNumber}`,
      {
        // Use named properties for readability
        auth: {
          username: process.env.TWILIO_ACCOUNT_SID, // Store credentials in environment variables for security
          password: process.env.TWILIO_AUTH_TOKEN,
        },
      }
    );

    const isValid = response.data.valid;

    // Send response with status code 200
    res.status(200).json({ isValid });
  } catch (error) {
    console.error('Error validating phone number:', error.message);
    // Use a more specific error message for client
    res.status(400).json({ error: 'Invalid phone number' });
  }
});

// Use process.env.PORT for dynamic port assignment
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
____________________________________________
