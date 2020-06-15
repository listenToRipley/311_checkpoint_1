const express = require('express')
const router = express.Router()

const users = require('../data/index')

//GETS

router.get('/users', (req, res) => res.json(users))

router.get('/users/:id', (req, res) => {
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
})


//POST
router.post('/user', (req, res) => {
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
  street: input.street,
   suite: input.suite,
   city: input.city,
   zipcode: input.zipcode,
//address nested 
   geo: {
     lat: input.geo,
     lng: input.geo
   }
// in end of the address nested object 
 },
//second next
 phone: input.phone,
 website: input.website,
//nested in the main
 company: {
   name: input.name,
   catchPhrase: input.catchPhrase,
   bs: input.bs
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

 })

 //PUT


module.exports = router