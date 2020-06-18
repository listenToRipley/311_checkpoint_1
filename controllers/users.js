const users  = require('../data/index')
const { find, concat } = require('../data/index')
const { response } = require('express')
const e = require('express')

// GET
const listUsers = (req, res) => {
  if(!users) {
    res.status(404).send({ msg: 'something went wrong, please try again'})
  } 
  res.json(users)
}

const showUser = (req, res) => {
  let id = parseInt(req.params.id)

  //find the entry associated with the id used 
  let user = users.find(person => person.id === id)
  console.log('we return : ',user)
  //error for 404, should we add code for each? 
  if(!user) {
    return res.status(404).json({ msg: 'something went wrong'})
  } else {
    res.json(user)
  }
}

//POST
const createUsers = (req, res) => {
  // console.log('you can see creation attempt')
  const count = users.length
  const input = req.body
  console.log('count', count, 'input', input)

  const createEntry = {
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
       //nested w/in address
        geo: {
          lat: input.address.geo.lat,
          lng: input.address.geo.lng,
        }
         // in end of the address nested object
      },
      //back in the main object
      phone: input.phone,
      website: input.website,
      //second nested item
      company: {
        name: input.company.name,
        catchPhrase: input.company.catchPhrase,
        bs: input.company.bs
      }
    }

//if you can't locate the users, then you wouldn't have anywhere to but this.
if (!users) {
  return res.status(404).json({ msg: 'something went wrong'})
  //require at least the name, username and email
} else if(!createEntry.name || !createEntry.username || !createEntry.email) {
  res.json({msg: 'you must include the name, username and email and minimum.'})
 } else {
  users.push(createEntry)
  res.json(users)
 }
}

 //PUT
const updateUser = (req, res) => {
  //rename this one so there would not be conflict with the whole object. 
  let userId = parseInt(req.params.id)
  console.log('id',userId)

  //find the entry associated with the id used 
  let user = users.find(person => person.id === userId)
  console.log('user',user)
  console.log(user.name)

  const update = req.body
  upUser = {
      "id": user.id,
    //we don't want the id to change, since the path would no longer be valid  
       "name": update.name || user.name,
       "username": update.username || user.username,
       "email": update.email || user.email,
       //first nested
       "address": {
         "street": update.address.street || user.address.street,
         "suite": update.address.suite || user.address.suite,
         "city": update.address.city || user.address.city,
         "zipcode": update.address.zipcode || user.address.zipcode,
        //nested w/in address
         "geo": {
           "lat": update.address.geo.lat || user.address.geo.lat,
           "lng": update.address.geo.lng || user.address.geo.lng,
         }
          // in end of the address nested object
       },
       //back in the main object
       "phone": update.phone || user.phone,
       "website": update.website || user.website,
       //second nested item
       "company": {
         "name": update.company.name || user.company.name,
         "catchPhrase": update.company.catchPhrase || user.company.catchPhrase,
         "bs":update.company.bs || user.company.bs,
       }
       //end of nested item, back in the main object
     }

  if(!user){
    res.status(404).json({msg: 'user is undefined, please try again'})
  } else if (update.id) {
    res.json({msg: 'I am sorry, you cannot change the id.'})
  } 
  
  //if the update user id equals an existing user id within users, replace that object with the updated user
  //if we return the index of the original item being updated, replace 
  let updatedUsersList = users.map(user => user.id === userId ? upUser : user)
  res.json(updatedUsersList)
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
  console.log(user)
  res.send('deleted')
  
}

module.exports = {
  listUsers,
  showUser,
  createUsers,
  updateUser,
  deleteUser
}