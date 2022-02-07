const { validationResult } = require('express-validator')
const User = require('../modelSchema/User')

const signUp = (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})

    //new instance of user
   const user = new User({ 
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password })

    //save the user 
  user.save()
  .then(data => {
      res.json(data)
      res.send('User added successfully!')
      console.log(data)
  })
  .catch(err => {
      res.status(400).json(err)
  })

}

const login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email: email, password: password})
    if(!user) return res.status(400).json({error: 'User not found'})
    res.json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  };

  const updateUser = async (req, res) => {

      try {

        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id)
        Object.assign(user, req.body);
        user.save()
        res.send({ data: user})
          
      } catch (error) {
        res.status(404).send({error: 'User Not Found'})
      }
  }

  const getExistingUser = async (req, res) => {
      const { id } = req.params
      const user = await User.findById(id).populate('name', 'username', ({ name: req.body.name, email: req.body.email, password: req.body.password}))
      if(!user) return res.status(404).send({ error: 'User Not Found!' })
      res.json(user)
  }

module.exports = { signUp, deleteUser, updateUser, getExistingUser, login }