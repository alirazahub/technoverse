import React, { useState, useEffect, useRef } from 'react';
import { List, Card, Avatar, Tag } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { categories } from '../../utils/data';
import server from '../../utils/server';
import { Link } from 'react-router-dom';

const initialArticles = [
  {
    title: 'How to reduce single-use plastics',
    description: 'A guide on how to minimize the use of single-use plastics in your daily life.',
    author: 'John Doe',
    image: 'https://via.placeholder.com/150',
    keywords: ['Sustainability'],
  },
  {
    title: 'Conserving energy in your home',
    description: 'Practical tips for reducing energy consumption at home.',
    author: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
    keywords: ['Energy Conservation'],
  },
  // Add more articles as needed
];

const keywords = [
  'All',
  'Sustainability',
  'Energy Conservation',
  'Recycling',
  'Climate Change',
  'Pollution',
  'Biodiversity',
  'Resource Depletion',
  'Conservation',
  'Renewable Energy',
  'Green Living',
  'Zero Waste',
  'Eco-Friendly Products',
];



const HomePage = () => {
  const [allArticles, setAllArticles] = useState(initialArticles);
  const [articles, setArticles] = useState(initialArticles);

  const [selectedKeyword, setSelectedKeyword] = useState('All');
  const scrollRef = useRef(null);

  const fetchArticles = async (keyword) => {
    try {
      // Make an API call to fetch articles based on the keyword
      const response = await axios.get(`${server}/api/news/keyword/${keyword}`);
      console.log("here", response?.data?.articles)
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };


  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === 'left' ? -150 : 150;
    }
  };

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        // Make an API call to fetch all articles
        const response = await axios.get(`${server}/api/home/top-content`);
        console.log(response)
        setArticles(response?.data);
        setAllArticles(response?.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    getAllArticles();

    if (selectedKeyword != 'All') {
      fetchArticles(selectedKeyword);
    }
  }, [selectedKeyword]);

  const searchbyKeyword = (keyword) => {
    setSelectedKeyword(keyword)
  }
  const firstchar = (string) => {
    return string?.charAt(0)?.toUpperCase() || 'A';
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Articles</h2>
          <div className="sticky top-12 bg-[#F1F5F9] z-10">
            <div className="relative mb-4">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full z-10"
              >
                &lt;
              </button>
              <div
                className="overflow-x-hidden whitespace-nowrap scroll-smooth hide-scrollbar px-6"
                ref={scrollRef}
              >
                {keywords.map((keyword) => (
                  <Tag
                    key={keyword}
                    className="cursor-pointer mr-2 mb-2 inline-block"
                    color={selectedKeyword === keyword ? 'blue' : 'default'}
                    onClick={() => searchbyKeyword(keyword)}
                  >
                    {keyword}
                  </Tag>
                ))}
              </div>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full z-10"
              >
                &gt;
              </button>
            </div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={articles}
            pagination={{
              pageSize: 5,
            }}

            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{firstchar(item?.author)}</Avatar>}
                  title={
                    <Link to={{
                      pathname: `/article-details/${item?.title}`,
                      search: `${item?.title}`
                    }}>
                      {item?.title}
                    </Link>
                  }
                  description={item?.description}
                />
                <img className="w-16 h-16 object-cover ml-4" src={item?.urlToImage} alt={item?.title} />
              </List.Item>
            )}
          />
        </div>
        <div>
          <Card title="Top Articles">
            <List
              dataSource={allArticles?.slice(0, 3)}
              renderItem={(item) => (
                <List.Item>
                  <Link to={{
                    pathname: `/article-details/${item?.title}`,
                    search: `${item?.title}`
                  }}>
                    {item?.title}
                  </Link>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
