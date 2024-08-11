const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const Register = async (req, res) => {
  let result = await User.findOne({ email: req.body.email });
  console.log(result);
  if (result == null) {
    let user = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    await user.save();
    res.status(200).send({ status: 200, message: "User registered successfully" });
  } else {
    res.status(209).send({
      status: 209,
      message: "User with specified email already exists",
    });
  }
};

// const GenerateToken = (user) => {
//   let token = jwt.sign(user,'SecretKey', {
//     expiresIn: '60000'
//   });
//   console.log(user);
//   return token;
// };

const GenerateToken = (user) => {
  let token = jwt.sign({_id: user._id,email: user.email},'SecretKey', {
    expiresIn: '60000'
  });
  console.log(user);
  return token;
};


const Login = async (req, res) => {
  let result = await User.findOne({ email: req.body.email });
  if (result == null) {
    res.status(401).send({
      status: 401,
      isAuthenticated: false,
      message: "Incorrect email Id",
    });
  } else if (bcrypt.compareSync(req.body.password, result.password)) {
    // res.status(200).send({ status: 200, isAuthenticated: true, token: GenerateToken(req.body)  });
    res.status(200).send({ status: 200, isAuthenticated: true, token: GenerateToken(result)  });
  } else {
    res.status(401).send({
      status: 401,
      isAuthenticated: false,
      message: "Incorrect password",
    });
  }
};

const UserDetails= async(req,res)=>{
    try {
      const email=req.query.email;
      const user=await User.findOne({email});
      if(!user) {
        res.status(404).send({message: 'User not found'});
      }
      else {
        res.status(200).send(user);
      }
    }
    catch(error) {
      res.status(500).send({message: 'Error fetching user details'});
    }
}

module.exports = { Register, Login, UserDetails };
