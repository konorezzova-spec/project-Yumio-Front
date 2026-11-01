import { Recipe } from "@/types/recipe";
import css from "./RecipeItem.module.css";
import Image from "next/image";
import clock from "/public/clock.svg";
import favorites from "/public/favorites.svg";
import { useRouter } from "next/navigation";

interface RecipeItemProps {
  item: Recipe;
}

export default function RecipeItem({ item }: RecipeItemProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`recipes/${item._id}`);
  };
  return (
    <>
      <li className={css.recipe_container}>
        <div className={css.image_container}>
          <Image
            src={item.thumb}
            alt="Recipe image"
            className={css.image}
            // width={337}
            // height={230}
            fill
          ></Image>
        </div>
        <div className={css.title}>
          <h3>{item.title}</h3>
          <div className={css.time}>
            <Image
              src={clock}
              className={css.svg}
              alt="timer"
              width={24}
              height={24}
            ></Image>
            {item.time}
          </div>
        </div>

        <p className={css.description}>{item.description}</p>

        <div className={css.btn_group}>
          <button
            className={css.button_more}
            type="button"
            onClick={handleClick}
          >
            Learn more
          </button>
          <button className={css.button_fav} type="button">
            <Image
              src={favorites}
              className={css.svg}
              alt="favorites"
              width={24}
              height={24}
            ></Image>
          </button>
        </div>
      </li>
    </>
  );
}
