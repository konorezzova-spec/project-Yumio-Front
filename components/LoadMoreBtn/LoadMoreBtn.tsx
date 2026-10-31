import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn() {
  function handleSubmit() {}
  return (
    <button type="button" onClick={handleSubmit} className={css.button}>
      Load More
    </button>
  );
}
