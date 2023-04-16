const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const ObjectId = require("mongoose");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  if (!contacts) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
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

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  if (!ObjectId.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  if (!ObjectId.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No Contacts Found");
  }
  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error("User dont have permission to update");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  if (!ObjectId.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No Contacts Found");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error("User dont have permission to delete");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
