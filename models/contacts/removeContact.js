const fs = require("fs").promises;
const contactsPath = require("./contactsPath");
const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
};

module.exports = removeContact;
