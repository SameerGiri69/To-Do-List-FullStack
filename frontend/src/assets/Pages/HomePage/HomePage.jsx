import React, { useState } from "react";
import "./HomePage.css";
import { getQuoteApi } from "../../tasksApi";
import { useEffect } from "react";
import axios from "axios";
const HomePage = () => {
  const [quote, setQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
        headers: {
          "X-Api-Key": "SHi96nWZCdB9MIe4dNs1tA==OiMgd8O3BGpwDcxG",
        },
      })
      .then((response) => {
        // response.data should be the resolved data object (like { q: "...", a: "..." })
        setQuote(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("quotestate", quote);
  return (
    <>
      {!isLoading ? (
        <div className="quotes-container">
          {quote.map((item, index) => (
            <div key={index} className="quote-card">
              <p className="quote-title">Quote of the day:</p>
              <p className="quote-text">“{item.quote}”</p>
              <p className="quote-author">— {item.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1>...Loading quote</h1>
      )}
    </>
  );
};

export default HomePage;
