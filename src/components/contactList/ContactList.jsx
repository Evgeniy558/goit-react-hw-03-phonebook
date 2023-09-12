import { Component } from "react";
import Button from "../contactForm/button/Button";
import css from "./ContactList.module.css";
import PropTypes from "prop-types";

class List extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.displayedContacts !== this.props.displayedContacts) {
      return true;
    }
    return false;
  }

  render() {
    const { displayedContacts, onClick } = this.props;
    return (
      <div>
        {" "}
        <ul>
          {displayedContacts.length > 0 &&
            displayedContacts.map((el) => {
              return (
                <li key={el.id} className={css.list_item}>
                  <div className={css.container_info}>
                    {el.name}: {el.number}{" "}
                  </div>

                  <Button
                    className={css.align_btn}
                    type="button"
                    onClick={() => onClick(el.id)}
                    typebutton={"button_del"}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
List.propTypes = {
  displayedContacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default List;
