export function getFromLocalStorage() {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  console.log(contacts);
  return contacts;
}
