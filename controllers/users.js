const { users } = require('../data/index')
const { find } = require('../data/index')
const { response } = require('express')

// GET
const listUsers = (req, res) => res.json(users)

const showUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let user = users.find(person => person.id === id)

  //error for 404, should we add code for each? 
  if(!user) {
    return res.status(404).json({ msg: 'something went wrong'})
  }
  //need to write some error handling for id's not included in the list
}

//POST
const createUsers = (req, res) => {
  // console.log('you can see creation attempt')
  const count = users.length
  const input = req.body
  console.log('count', count, 'input', input)

  const createEntry = {
  //main body
 id: count+1,
 name: input.name,
 username: input.name,
 email: input.email,
//first nested
 address: {
  street: input.address.street,
   suite: input.address.suite,
   city: input.address.city,
   zipcode: input.address.zipcode,
//address nested 
   geo: {
     lat: input.address.geo.lat,
     lng: input.address.geo.lng
   }
// in end of the address nested object 
 },
//second next
 phone: input.phone,
 website: input.website,
//nested in the main
 company: {
   name: input.company.name,
   catchPhrase: input.company.catchPhrase,
   bs: input.company.bs
 }
//the end of the company nested object
}

if(!createEntry.name || !createEntry.username || !createEntry.email) {
  res.json({msg: 'you must include the name, username and email and minimum.'})
users.push(createEntry)

//the end of the whole object 
res.json(users)
 }
}

 //PUT
const updateUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let user = users.find(person => person.id === id)

  if(!user){
    res.status(404).json({msg: 'user is undefined, please try again'})
  }

if (user) {

  const update = req.body

  const {id, name, username, email, address, phone, website, company} = user
  const {street, suite, city, zipcode, geo} = address
  const {lat, lng} = geo
  //give the company name an alias so it doesn't get confused with the name in the first part of the body.
  const {name: cName, catchPhrase, bs} = company

  id = update.id || id,
  name = update.name || name,
  username = update.username || username,
  email = update.email || email,
//first nested
 address = {
    street = update.street || street,
    suite = update.suite || suite,
    city = update.city || city,
    zipcode = update.zipcode || zipcode,
//address nested 
   geo = {
     lat =  update.lat || lat,
     lng = update.lng || lng,
   }
// in end of the address nested object 
 },
//second next
phone = update.phone || phone,
website = update.website || website
//nested in the main
company = {
   name = update.cName || cName,
   catchPhrase = update.catchPhrase || catchPhrase,
   bs = update.bs || bs,
    //need to write some kind of logic to look through all the keys and write a function to have a ternary operator to replace the key 
  }
}

//out the whole document  
res.json(users)
//   //error handling 
}

//DELETE
const deleteUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let user = users.find(person => person.id === id)

  if(!user){
    res.status(404).json({msg: 'user is undefined, please try again'})
  }
  isActive = false; 
  res.send('deleted')
}

module.exports = {
  listUsers,
  showUser,
  createUsers,
  updateUser,
  deleteUser
}