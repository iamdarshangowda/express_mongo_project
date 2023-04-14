
const getContacts = (req, res) => {
    res.json({contact: "Get all Contact"})
}

const createContact = (req, res) => {
    const {name, email, phone} = req.body

    if(!name || !email || !phone) {
        res.status(400)
        throw new Error("All feilds are madatory")
    }
    res.json({contact: "Create Contact"})
}

const getContact = (req, res) => {
    res.json({contact: `Get Single Contact for ${req.params.id}`})
}

const updateContact = (req, res) => {
    res.json({contact: `Update Contact for ${req.params.id}`})
}

const deleteContact = (req, res) => {
    res.json({contact: `Delete Contact for ${req.params.id}`})
}

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }