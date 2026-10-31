import css from "./RecipesList.module.css";

import Container from "../Container/Container";
import { Recipe } from "@/types/recipe";
import RecipeItem from "../RecipeItem/RecipeItem";

type ResipesListProps = {
  recipes: Recipe[];
};

export default function RecipesList({ recipes }: ResipesListProps) {
  return (
    <Container className={css.recipes_container}>
      <ul className={css.list}>
        {recipes.map(recipe => (
          <RecipeItem key={recipe._id} item={recipe} />
        ))}
      </ul>
    </Container>
  );
}
