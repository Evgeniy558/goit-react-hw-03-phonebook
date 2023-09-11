import { Component } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import Form from "./components/contactForm/ContactsForm";
import List from "./components/contactList/ContactList";
import Filter from "./components/filter/Filter";
import { saveToLocalStorage } from "./components/serveces/saveToLocalStorage";
import { getFromLocalStorage } from "./components/serveces/getFromLocalStorage";
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

  getData = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const number = event.target.elements.number.value;
    if (
      this.state.contacts.find((el) => {
        return el.name.toLocaleLowerCase() === name.toLowerCase();
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(
        (prevState) => ({
          contacts: [
            ...prevState.contacts,
            { id: nanoid(), name: name, number: number },
          ],
        }),
        () => {
          saveToLocalStorage(this.state.contacts);
        }
      );
    }

    event.currentTarget.reset();
  };

  handleSearch = (event) => {
    const { value } = event.target;
    this.setState(
      (prevState) => ({ filter: (prevState.filter = value) }),
      () => {
        this.filter();
      }
    );
  };

  filter = () => {
    const results = this.state.contacts.filter((el) => {
      return el.name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
    return results;
  };

  deleteContact = (id) => {
    return this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => {
        return el.id !== id;
      }),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const displayedContacts = filter ? this.filter() : contacts;

    return (
      <div className="App">
        <header className={css.appheader}>
          <section className={css.section}>
            <h1>Phonebook</h1>
            <Form onSubmit={this.getData} />
          </section>
          <section className={css.section}>
            <h2>Contacts</h2>
            <Filter onChange={this.handleSearch} />
            <List
              displayedContacts={displayedContacts}
              onClick={this.deleteContact}
            />
          </section>
        </header>
      </div>
    );
  }
}
export default App;
