import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import server from '../../utils/server';
import { Card, Avatar } from 'antd';

const ArticleDetails = () => {
    const location = useLocation();
    const [article, setArticle] = useState({})
    console.log(location?.search)

    useEffect(() => {
        // fetch article details based on the article id
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${server}/api/news/title/${location?.search.split('?')[1]}`);
                console.log(res.data)
                setArticle(res?.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        }
        fetchArticle();

    }, [])
    const firstchar = (string) => {
        return string?.charAt(0)?.toUpperCase() || 'A';
      }
    return (
        <div className="container mx-auto py-14 px-10">
            <Card className="mb-4">
                <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
                <div className="flex items-center mb-4">
                    <Avatar>{firstchar(article.author)}</Avatar>
                    <span className="ml-2">{article.author}</span>
                </div>
                <img className="w-full h-64 object-cover mb-4" src={article.urlToImage} alt={article.title} />
                <p>{article.description}</p>
                <Link to={article?.url} target="_blank" className="text-blue-500">Read more</Link>
            </Card>
        </div>
    )
}

export default ArticleDetails
