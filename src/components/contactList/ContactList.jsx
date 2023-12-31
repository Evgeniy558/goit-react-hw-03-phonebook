import { Component } from "react";
import Button from "../contactForm/button/Button";
import css from "./ContactList.module.css";
import PropTypes from "prop-types";

class ContactList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.displayedContacts !== this.props.displayedContacts) {
      return true;
    }
    return false;
  }

  render() {
    const { displayedContacts, onClick } = this.props;
    return (
      <ul>
        {displayedContacts.map((el) => {
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
    );
  }
}
ContactList.propTypes = {
  displayedContacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ContactList;
