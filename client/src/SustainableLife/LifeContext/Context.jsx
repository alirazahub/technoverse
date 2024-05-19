import React, { createContext } from "react";

// Create a new context
const LifeContext = createContext();

// Define the LifeProvider component
const LifeProvider = ({ children }) => {
  const sections = [
    {
      id: 1,
      title: "Introduction to Sustainable Living",
      description: "Overview of sustainability and its importance.",
      image:
        "https://cdn.pixabay.com/photo/2024/04/20/11/47/ai-generated-8708404_1280.jpg",
      content: [
        {
          heading: "Understanding Sustainability",
          paragraphs: [
            "Sustainable living refers to making conscious choices that minimize our impact on the environment, conserve natural resources, and promote long-term ecological balance. By embracing sustainable practices, we can create a greener future for ourselves and future generations.",
            "Sustainability encompasses three main pillars: environmental, social, and economic. Environmental sustainability focuses on minimizing our ecological footprint by conserving resources, reducing waste, and protecting biodiversity. Social sustainability emphasizes promoting social equity, justice, and inclusivity. Economic sustainability involves supporting local economies, fair trade, and responsible consumption.",
          ],
        },
        {
          heading: "Reducing Energy Consumption",
          paragraphs: [
            "One of the fundamental steps towards sustainable living is reducing energy consumption. Start by making your home more energy-efficient through measures such as installing energy-efficient light bulbs, insulating windows, and using smart thermostats. Unplug electronic devices when not in use and opt for renewable energy sources like solar panels whenever possible.",
          ],
        },
        {
          heading: "Water Conservation",
          paragraphs: [
            "Conserving water is crucial for sustainable living, especially in regions experiencing water scarcity. Practice simple habits like turning off the faucet while brushing your teeth, taking shorter showers, and fixing leaks promptly. Additionally, consider installing water-saving fixtures such as low-flow showerheads and faucets, as well as collecting rainwater for irrigation purposes.",
          ],
        },
        {
          heading: "Waste Reduction and Recycling",
          paragraphs: [
            "Minimizing waste is a key aspect of sustainable living. Start by adopting the '3 R's' mantra: reduce, reuse, and recycle. Reduce waste by avoiding single-use items and opting for durable, reusable alternatives. Reuse items creatively by repurposing them or donating them to others in need. Recycle materials such as paper, plastics, and glass to divert them from landfills.",
          ],
        },
        {
          heading: "Sustainable Transportation",
          paragraphs: [
            "Transportation is a significant contributor to carbon emissions. Opt for sustainable transportation options whenever possible. Consider walking or cycling for short distances, carpooling with others, or using public transportation. If you own a car, choose fuel-efficient or electric vehicles and maintain them properly to maximize fuel efficiency.",
          ],
        },
        {
          heading: "Conscious Consumerism",
          paragraphs: [
            "Make informed choices as a consumer by supporting companies and brands that prioritize sustainability and ethical practices. Look for eco-friendly certifications, fair trade labels, and organic products. Prioritize quality over quantity, and consider buying second-hand or locally produced items to reduce the environmental impact of manufacturing and transportation.",
          ],
        },
        {
          heading: "Sustainable Food Choices",
          paragraphs: [
            "The food we consume has a considerable ecological footprint. Opt for locally sourced, organic, and seasonal produce. Reduce meat consumption and incorporate more plant-based meals into your diet. Support sustainable farming practices, such as regenerative agriculture and community-supported agriculture (CSA).",
          ],
        },
        {
          heading: "Cultivate Green Spaces",
          paragraphs: [
            "If possible, create green spaces in your home or community. Plant native species, grow your own herbs and vegetables, and encourage biodiversity by providing habitats for pollinators and wildlife. Consider composting to reduce food waste and create nutrient-rich soil for your plants.",
          ],
        },
        {
          heading: "Education and Awareness",
          paragraphs: [
            "Stay informed about environmental issues and share your knowledge with others. Engage in discussions, attend workshops, and participate in community initiatives that promote sustainable living. By raising awareness, you can inspire others to adopt eco-friendly practices as well.",
          ],
        },
        {
          heading: "Conclusion",
          paragraphs: [
            "Embracing sustainable living is not just a trend; it's a responsibility we all share. By making conscious choices in our daily lives, we can contribute to a healthier planet and a brighter future. Start small, gradually incorporate sustainable practices, and encourage others to join the movement. Together, we can create a more sustainable world for generations to come.",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Reducing Single-Use Plastics",
      description:
        "Tips for minimizing plastic waste and alternatives to common single-use plastics.",
      image:
        "https://media.istockphoto.com/id/1226281053/photo/disposable-single-use-plastic-objects-such-as-bottles-cups-forks-spoons-and-drinking-straws.jpg?s=1024x1024&w=is&k=20&c=pagjM-K5tPUdzJUBa-BsvMTv3_5dCpIKw5m4BQCUu8k=",
      content: [
        {
          heading: "Introduction",
          paragraphs: [
            "Single-use plastics are a major contributor to environmental pollution. They are used once and then discarded, leading to significant waste.",
            "To reduce single-use plastics, consider using reusable bags, bottles, and containers. Opt for products with minimal packaging and support companies that prioritize sustainability.",
          ],
        },
        {
          heading: "Alternatives",
          paragraphs: [
            "Instead of plastic bags, use reusable cloth bags.",
            "Replace plastic straws with metal or bamboo straws.",
            "Choose glass or stainless steel water bottles over plastic ones.",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Recycling and Waste Management",
      description:
        "Best practices for recycling, composting, and upcycling ideas.",
      image:
        "https://cdn.pixabay.com/photo/2024/04/21/04/19/ai-generated-8709818_1280.jpg",
      content: [
        {
          heading: "Recycling Basics",
          paragraphs: [
            "Recycling helps reduce the amount of waste that ends up in landfills. It involves converting waste materials into new products.",
            "Composting organic waste is another effective way to manage waste. It turns food scraps and yard waste into valuable fertilizer.",
          ],
        },
        {
          heading: "Upcycling Ideas",
          paragraphs: [
            "Transform old furniture into new pieces.",
            "Use glass jars as storage containers.",
            "Create planters from old tires.",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Conserving Energy",
      description:
        "Energy-saving tips and information on renewable energy sources.",
      image:
        "https://cdn.pixabay.com/photo/2022/08/12/18/34/save-energy-7382275_1280.png",
      content: [
        {
          heading: "Energy Conservation Tips",
          paragraphs: [
            "Energy conservation is crucial for reducing our carbon footprint. Simple actions like turning off lights when not in use and using energy-efficient appliances can make a big difference.",
            "Renewable energy sources such as solar and wind power are sustainable alternatives to fossil fuels. They produce energy without emitting greenhouse gases.",
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Carbon Emissions and Footprint",
      description:
        "Understanding carbon footprints and tips for reducing emissions.",
      image:
        "https://cdn.pixabay.com/photo/2021/12/08/14/05/carbon-footprint-6855793_1280.jpg",
      content: [
        {
          heading: "Understanding Carbon Footprints",
          paragraphs: [
            "A carbon footprint measures the total greenhouse gas emissions caused by an individual, organization, event, or product.",
            "Reducing your carbon footprint involves making sustainable choices such as using energy-efficient appliances, reducing car travel, and supporting renewable energy sources.",
          ],
        },
        {
          heading: "How to Reduce Your Carbon Footprint",
          paragraphs: [
            "Use public transportation, bike, or walk instead of driving.",
            "Invest in energy-efficient appliances and lighting.",
            "Reduce, reuse, and recycle to minimize waste.",
            "Support and use renewable energy sources.",
            "Practice energy-saving habits like turning off lights and unplugging devices when not in use.",
          ],
        },
        {
          heading: "Conclusion",
          paragraphs: [
            "By taking these steps, you can contribute to a more sustainable future and help combat climate change.",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Water Conservation",
      description:
        "Techniques for conserving water and benefits of rainwater harvesting.",
      image:
        "https://assets-news.housing.com/news/wp-content/uploads/2021/06/14175932/A-guide-to-water-conservation-methods-and-its-importance-FB-1200x700-compressed.jpg",
      content: [
        {
          heading: "Introduction",
          paragraphs: [
            "Water conservation is essential for sustaining our natural resources. Simple actions like fixing leaks and using water-efficient fixtures can significantly reduce water usage.",
            "Rainwater harvesting is a technique that involves collecting and storing rainwater for reuse. It helps reduce demand on conventional water supply systems.",
          ],
        },
        {
          heading: "Tips for Water Conservation",
          paragraphs: [
            "Fix leaks promptly to prevent water waste.",
            "Install water-efficient fixtures and appliances.",
            "Use a broom instead of a hose to clean driveways and sidewalks.",
            "Collect rainwater for gardening and outdoor use.",
            "Turn off the tap while brushing your teeth or washing dishes.",
            "Run washing machines and dishwashers only with full loads.",
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Embracing Plant-Based Diets",
      description: "Benefits and recipes for plant-based diets.",
      image:
        "https://cdn.pixabay.com/photo/2020/08/01/10/23/vegan-5455065_1280.png",
      content: [
        {
          heading: "Benefits",
          paragraphs: [
            "Plant-based diets are beneficial for both health and the environment. They involve consuming foods primarily from plants such as vegetables, fruits, nuts, seeds, and whole grains.",
            "Adopting a plant-based diet can reduce your carbon footprint and contribute to better health. There are numerous delicious recipes available to help you get started.",
          ],
        },
        {
          heading: "Recipes",
          paragraphs: [
            "Quinoa salad with roasted vegetables.",
            "Chickpea and spinach curry.",
            "Avocado and black bean tacos.",
          ],
        },
      ],
    },
    {
      id: 9,
      title: "Sustainable Transportation",
      description:
        "Benefits of biking, walking, public transit, and electric vehicles.",
      image: "https://blog.techstork.sg/imgDB/Sustainable%20Transportation.png",
      content: [
        {
          heading: "Introduction",
          paragraphs: [
            "Sustainable transportation options like biking, walking, and public transit help reduce carbon emissions and traffic congestion.",
            "Electric vehicles are another eco-friendly alternative to traditional gasoline-powered cars. They produce fewer emissions and are becoming more accessible.",
          ],
        },
      ],
    },
    {
      id: 10,
      title: "Green Building and Renovation",
      description: "Tips for eco-friendly home building and renovation.",
      image:
        "https://beep.ba/wp-content/uploads/2018/10/Top-pet-najzelenijih-zgrada-na-svijetu-photo-1200x800.jpg",
      content: [
        {
          heading: "Introduction",
          paragraphs: [
            "Green building involves designing and constructing buildings in an environmentally responsible and resource-efficient manner.",
            "Renovating existing buildings with eco-friendly materials and energy-efficient systems can significantly reduce their environmental impact.",
          ],
        },
        {
          heading: "Tips",
          paragraphs: [
            "Use sustainable building materials such as bamboo or recycled steel.",
            "Install energy-efficient windows and insulation.",
            "Incorporate renewable energy systems like solar panels.",
            "Design buildings to maximize natural light and ventilation.",
          ],
        },
      ],
    },
  ];

  return (
    <LifeContext.Provider value={sections}>{children}</LifeContext.Provider>
  );
};

export { LifeContext, LifeProvider };
