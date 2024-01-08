import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "pradipta";
const yourPassword = "pradipta";
const yourAPIKey = "ed5d3d73-bda4-4dd3-b550-c2c69d92b048";
const yourBearerToken = "1ca02938-912a-4ec9-b3f5-4d4c6f817407";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all", {
      params: {
        page: 1
      }
    }, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    const result = response.data;
    res.render("index.ejs", { data: result });
    } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/filter",{
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    });
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  try{
    const config = {
      headers: { Authorization: `Bearer ${yourBearerToken}` }
    };
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", config);
    const result = response.data;
    res.render("index.ejs", { data: result });

  } catch (error){
    console.error("Failed to make request", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
