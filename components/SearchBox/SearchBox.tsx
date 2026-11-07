import css from "./SearchBox.module.css";
import Container from "@/components/Container/Container";

interface SearchBoxProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const handleSubmit = (formData: FormData) => {
    const rawSearch = formData.get("search") as string;
    const search = rawSearch.trim();

    if (search === "") {
      alert("Please enter search topic!");
      return;
    }

    onSubmit(search);
  };

  return (
    <section className={css.section}>
      <Container className={css.search_container}>
        <h1 className={css.header}>Plan, Cook, and Share Your Flavors</h1>
        <form action={handleSubmit} className={css.form}>
          <input
            name="search"
            type="text"
            placeholder="Search recipes"
            className={css.input}
          ></input>
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </Container>
    </section>
  );
}
