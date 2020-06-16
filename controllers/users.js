const users = require('../data/index')
const { find } = require('../data/index')

// GET
const listUsers = (req, res) => res.json(users)

const showUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = users.find(person => { 
    if(person.id === id) 
    {return res.json(person)}})

  if(finder === false){
    res.status(!200).send('something is not quite right about this request')
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
  return res.status(404).json({ msg: 'something went wrong'})
}
//add the info the your doc
users.push(createEntry)

//the end of the whole object 
return res.json(users)

 }

 //PUT
const updateUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = users.find(person => { 
    if(person.id === id) 
    {return res.json(person)}})

  const update = req.body

//   if(finder) {
//   finder.id = update.id ? update.id : users.id,
//   finder.name = update.name ? update.name : users.name,
//   finder.username = update.username ? update.username : users.username,
//   finder.email = update.email ? update.email : users.email,
// //first nested
//  finder.address = {
//     street = update.address.street ? update.address.street : users.address.street,
//     suite = update.address.suite ? update.address.suite : users.address.suite,
//     city = update.address.city ? update.address.city : users.address.city,
//     zipcode = update.address.zipcode ? update.address.zipcode : users.address.zipcode,
// //address nested 
//    geo = {
//      lat =  update.address.geo.lat ? update.address.geo.lat : users.address.geo.lat,
//      lng = update.address.geo.lng ? update.address.geo.lng: users.address.geo.lng,
//    }
// // in end of the address nested object 
//  },
// //second next
// finder.phone = update.phone ? update.phone : users.phone,
// finder.website = update.website ? update.website : users.website
// //nested in the main
// find.company = {
//    name = update.name ? update.name : users.name,
//    catchPhrase = update.catchPhrase ? update.catchPhrase : users.catchPhrase,
//    bs = update.bs ? update.bs : users.bs,
//     //need to write some kind of logic to look through all the keys and write a function to have a ternary operator to replace the key 
//   }
//   //error handling 
//  }
}

//DELETE
const deleteUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let finder = users.find(person => { 
    if(person.id === id) 
    {return res.json(person)}})

  if (finder) {
    finder.isActive = false; 
    res.send('deleted')
  }

  //
}

module.exports = {
  listUsers,
  showUser,
  createUsers,
  updateUser,
  deleteUser
}