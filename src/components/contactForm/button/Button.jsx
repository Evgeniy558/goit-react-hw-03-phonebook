import css from "./button.module.css";
const Button = ({ children, typebutton, onClick }) => {
  const classButton =
    typebutton === "button_add"
      ? css["button_add"]
      : typebutton === "button_del"
      ? css["button_del"]
      : css["button"];
  return (
    <div className={css.wrapper}>
      <button className={`${css.button} ${classButton}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
export default Button;
