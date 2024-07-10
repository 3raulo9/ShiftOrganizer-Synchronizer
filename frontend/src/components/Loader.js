import React, { useEffect, useState } from 'react';
import '../styles/Loader.css';

const baseFacts = [
  "Raul speaks five languages fluently—Russian, Hebrew, English, Ukrainian, and some French, and is currently learning Greek for an upcoming trip.",
  "Graduated from John Brice BootCamp, Raul is skilled in frontend design and backend technologies like Django and Flask.",
  "As a manager at Oomai, a sushi restaurant, Raul oversees the store and its workers, ensuring everything runs smoothly.",
  "Dedicating two hours daily to studying languages, Raul is passionate about linguistics and expanding his language skills.",
  "Raul is actively working on making a React application more responsive, showcasing his front-end development skills.",
  "Raul enjoys coding in Python and JavaScript, often experimenting with new techniques to enhance user experience on websites.",
  "Raul has a solid understanding of HTML and CSS, which he uses to create visually appealing and user-friendly web designs.",
  "Raul speaks conversational Ukrainian, a skill he developed over two years of dedicated study.",
  "In addition to his language studies, Raul spends most of his free time coding to keep his programming skills sharp.",
  "Raul is proficient in using React to build responsive web applications, a skill he's currently honing further.",
  "Combining his love for languages and technology, Raul often integrates multilingual support in his web projects.",
  "Fluent in Hebrew, Raul seamlessly navigates between multiple languages at work and in daily life.",
  "In preparation for his trip, Raul focuses on practical Greek phrases and vocabulary to enhance his travel experience.",
  "With his bootcamp training, Raul is adept at using Flask for backend development, creating efficient and robust web applications.",
  "Raul's passion for languages extends to helping others learn, often sharing tips and resources with friends and colleagues.",
  "Raul's multilingual abilities enhance his management skills, allowing him to communicate effectively with a diverse team.",
  "As part of his ongoing education, Raul frequently explores new programming frameworks and libraries to stay updated in the tech industry.",
  "Raul's curiosity about different cultures and languages is reflected in his diverse language portfolio and programming projects."
];

const addPrefix = (facts) => facts.map(fact => `About the creator of that website: ${fact}`);

const Loader = () => {
  const [randomFact, setRandomFact] = useState('');

  useEffect(() => {
    const facts = addPrefix(baseFacts);
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  return (
    <div className="loader-container">
      <svg viewBox="0 0 240 240" height="240" width="240" className="loader">
        <circle strokeLinecap="round" strokeDashoffset="-330" strokeDasharray="0 660" strokeWidth="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className="loader-ring loader-ring-a"></circle>
        <circle strokeLinecap="round" strokeDashoffset="-110" strokeDasharray="0 220" strokeWidth="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className="loader-ring loader-ring-b"></circle>
        <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className="loader-ring loader-ring-c"></circle>
        <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className="loader-ring loader-ring-d"></circle>
      </svg>
      <div className="fun-fact">{randomFact}</div>
    </div>
  );
};

export default Loader;
