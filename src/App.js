import React, {useState} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

const App = () => {
  //set state using hooks
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_id=${APP_KEY}`;

  const getData = async () => {
    if(query !== "") {
      const result = await axios.get(url);
      if(!resulta.data.more){
        return setAlert("No food whit such name");
      }
      const recipes = result.data.hits;
      setRecipes(recipes);
  
      //console.log(result);
      setAlert("");
      setQuery("");
    }else {
      setAlert("Please fill the form!");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  const onChange = (e) => {
    //console.log(e.target.value);
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query} />
        <input type="submit" value="search"/>
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4} recipe={recipe} />)}
      </div>
    </div>
  )
}

export default App;