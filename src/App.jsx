import { Component } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import Form from "./components/contactForm/ContactsForm";
import ContactList from "./components/contactList/ContactList";
import Filter from "./components/filter/Filter";
import { saveToLocalStorage } from "./components/serveces/saveToLocalStorage";
import { getFromLocalStorage } from "./components/serveces/getFromLocalStorage";
import { filterContacts } from "./components/serveces/filterContacts";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    //get contacts from localStorage for rendering
    const contacts = getFromLocalStorage();
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      saveToLocalStorage(this.state.contacts);
    }
  }
  //add contact to localstorage
  addNewContact = (formData) => {
    const { name, number } = formData;

    if (
      this.state.contacts.find((el) => {
        return el.name.toLocaleLowerCase() === name.toLowerCase();
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: name, number: number },
        ],
      }));
    }
  };

  handleSearch = (SearchValue) => {
    this.setState({ filter: SearchValue });
  };

  deleteContact = (id) => {
    const contacts = getFromLocalStorage().filter((el) => {
      return el.id !== id;
    });
    this.setState({ contacts });
  };

  render() {
    const { contacts, filter } = this.state;
    const displayedContacts = filter
      ? filterContacts(contacts, filter)
      : contacts;

    return (
      <div className="App">
        <header className={css.appheader}>
          <section className={css.section}>
            <h1>Phonebook</h1>
            <Form onSubmit={this.addNewContact} />
          </section>
          <section className={css.section}>
            <h2>Contacts</h2>
            <Filter onChange={this.handleSearch} />
            <>
              {" "}
              {displayedContacts.length > 0 ? (
                <ContactList
                  displayedContacts={displayedContacts}
                  onClick={this.deleteContact}
                />
              ) : (
                <p> No contacts </p>
              )}
            </>
          </section>
        </header>
      </div>
    );
  }
}
export default App;
