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

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))