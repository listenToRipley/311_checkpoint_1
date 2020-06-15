const users = require('../data/index')

// GET
const listUsers = (req, res) => res.json(users)

const showUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = (doc, num) => {
    let entry = doc.find(person => {
      return person.id === num
    })
    return res.json(entry)
  }
  if(finder(users, id) === false){
    res.status(!200).send('something is not quite right about this request')
  }
  //need to write some error handling for id's not included in the list
}


//POST
const createUsers = (req, res) => {
  console.log('you can see creation attempt')
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
//the end of the whole object 

if(!createEntry.name || !createEntry.username || !createEntry.email) {
  return res.status(404).json({ msg: 'something went wrong'})
}
//add the info the your doc
users.push(createEntry)

return res.json(users)

 }


 //PUT
const updateUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = (doc, num) => {
    let entry = doc.find(person => {
      return person.id === num
    })
    return res.json(entry)
  }

  const update = req.body

  if(finder(users, id) === true) {
    console.log(finder)
    //need to write some kind of logic to look through all the keys and write a function to have a ternary operator to replace the key 
  }

  //error handling 
 }


//DELETE
const deleteUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = (doc, num) => {
    let entry = doc.find(person => {
      return person.id === num
    })
    return res.json(entry)
  }

  if (finder(users, id) === true) {
    res.send('deleted')
  }

  //need to have error 
 }

module.exports = {
  listUsers,
  showUser,
  createUsers,
  updateUser,
  deleteUser
}