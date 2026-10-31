import Image from "next/image";
import Container from "../Container/Container";
import css from "./Filter.module.css";
import filter from "/public/filter.svg";

interface FilterProps {
  total: number;
}

export default function Filters({ total }: FilterProps) {
  return (
    <Container className={css.filter_container}>
      <h2>Recipes</h2>
      <div className={css.filter_box}>
        <p className={css.filter_recipes}>{total} recipes</p>
        <p className={css.filter}>
          Filter{" "}
          <Image
            className={css.filter_icon}
            src={filter}
            width={24}
            height={24}
            alt="filter"
          ></Image>
        </p>
      </div>
    </Container>
  );
}
