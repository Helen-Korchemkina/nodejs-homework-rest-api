const fs = require("fs").promises;
const contactsPath = require("./contactsPath");
const listContacts = require("./listContacts");

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id: contactId,
    ...data,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = updateContact;
