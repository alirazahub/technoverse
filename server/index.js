import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer';
import fs from 'fs'
import user from './routes/user.js'
import NewsAPI from 'newsapi'
import axios from 'axios'

const newsapi = new NewsAPI('6d959f6b74fc4f8bb520e05579db0fd2');

dotenv.config()
const app = express();
app.use(cors())
connectDB();

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(200).json('File is Uploaded')
  } else {
    res.status(500).json('File is not Uploaded')
  }
});

app.use('/images', express.static("images"))


//delete Image
app.delete('/api/delete/:id', (req, res) => {
  try {
    const path = `images/${req.params.id}`
    fs.unlinkSync(path)
    res.status(200).json('File is Deleted')
  }
  catch (err) {
    res.status(500).json('File is not Deleted')
  }
}
)

app.get('/', (req, res) => {
  res.send("Hello welcome to the backend of TechnoVerse's App")
})


app.use('/api/user', user)


app.get('/api/news/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const response = await newsapi.v2.topHeadlines({
      q:category,
      language: 'en',
      country: 'us'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get news by keyword
app.get('/api/news/keyword/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    const response = await newsapi.v2.everything({
      q: keyword,
      language: 'en',
      sortBy: 'relevancy'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get news by topic (using sources and domains)
app.get('/api/news/topic/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const response = await newsapi.v2.everything({
      q: topic,
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk,techcrunch.com',
      language: 'en',
      sortBy: 'relevancy'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get news sources
app.get('/api/news/sources', async (req, res) => {
  try {
    const response = await newsapi.v2.sources({
      language: 'en',
      country: 'us'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to get top 10 content for home page
app.get('/api/home/top-content', async (req, res) => {
  try {
    const response = await newsapi.v2.everything({
      q: 'environment OR climate change OR pollution OR biodiversity OR resource depletion OR sustainability OR conservation',
      language: 'en',
      sortBy: 'relevancy',
      pageSize: 20 // Fetch more articles to filter out those without images
    });

    // Filter out articles without images
    const articlesWithImages = response.articles.filter(article => article.urlToImage);


    res.json(articlesWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const response = await newsapi.v2.everything({
      q: `"${title}"`,
      language: 'en',
      sortBy: 'relevancy',
      pageSize: 10
    });
    const article = response?.articles?.find(article => article?.title?.toLowerCase() === title?.toLowerCase());
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);






// OpenAQ API - Get air quality data
app.get('/api/openaq', async (req, res) => {
  try {
    const { lat, lon, radius = 10000 } = req.query; // Default radius set to 10,000 meters
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    console.log(`Fetching air quality data for coordinates: ${lat}, ${lon} with radius: ${radius}`);
    const response = await axios.get(`https://api.openaq.org/v3/locations`, {
      params: {
        coordinates: `${lat},${lon}`,
        radius,
        limit: 1,
      },
    });
    console.log('Response from OpenAQ API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching air quality data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching air quality data' });
  }
});

// Weatherbit API - Get current weather data
app.get('/api/weatherbit', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OpenWeatherMap API - Get current weather data
app.get('/api/openweathermap', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NOAA API - Get historical climate data
app.get('/api/noaa', async (req, res) => {
  try {
    const { locationid, startdate, enddate } = req.query;
    const response = await axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data`, {
      params: {
        datasetid: 'GHCND',
        locationid,
        startdate,
        enddate,
        units: 'standard',
        limit: 10,
      },
      headers: {
        token:process.env.NOAA_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))