import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: []
  });
  const [popupActive, setPopupActive] = useState(false);

  const recipesCollectionRef = collection(db, "recipes");

  const viewHandler = (id) => {
    const recipesClone = [...recipes];
    recipesClone.forEach(recipe => {
      if(recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false
      }
    })

    setRecipes(recipesClone);
  }

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id))
  }

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }));
    })
  }, []);

  return (
    <div className="App">
      <h1>My Recipe</h1>
      <button onClick={() => setPopupActive(true) }>Add recipe</button>
      <div className="recipes">
        {recipes.map((recipe, i) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>

            {recipe.viewing &&
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Steps</h4>
                <ol>
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            }
            <div className="buttons">
              <button onClick={() => viewHandler(recipe.id)}>View { recipe.viewing ? 'less' : 'more' }</button>
              <button className="remove" onClick={() => removeRecipe(recipe.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {popupActive && <div className="popup">
          <div className="popup-inner">
            <h2>Add a New Recipe</h2>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  type="text"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                <input 
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Steps</label>
                <input 
                  type="text"
                />
              </div>
              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button" className="remove">Close</button>
              </div>
            </form>
          </div>
        
      </div>}
      
    </div>
  );
}

export default App;
