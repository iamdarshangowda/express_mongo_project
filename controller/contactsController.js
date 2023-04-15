const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  if (!contacts) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All feilds are madatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    return next(new Error("No Contacts Found"));
  }

  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("User dont have permission to update");
  }

  const updatedContact = Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("User dont have permission to delete");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
