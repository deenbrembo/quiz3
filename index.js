const express = require('express')
const app = express()
const port = 3000

let dbUsers = [
  {
      username : "deen",
      password : "12345678",
      name : "Hafizudin",
      email : "hafizudinmuhammad83@gmail.com"
  },
  
  {
      username : "mirul",
      password : "1234",
      name : "Amirul",
      email : "amirul@gmail.com"
  },
  
  {
      username : "imran",
      password : "5678",
      name : "Imran",
      email : "imran@gmail.com"
  },
]

app.use(express.json());

app.post('/' , (req, res) => {
  let data = req.body
  res.send(
    login(
      data.username,
      data.password
    )
  );
});

app.use(express.json());

app.post('/register' , (req, res) => {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );
});

app.get('/' , (req, res) => {
  res.send('Hello World!')
})

app.get('/bye' , (req, res) => {
    res.send('Bye bye World!')
 })

 app.post('/login', (req, res) => {
   const { username, password } = req.body;
   const user = dbUsers.find(user => user.username === username && user.password === password);
   
   if (user) {
    res.send(user);
   } else {
    res.send({error: "User not found"});
   }
 }) 

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(username, password){
  console.log("someone try to login with", username, password)
  let matched = dbUsers.find(element => 
      element.username == username
  )
  if(matched) {
      if(matched.password == password) {
          return matched
      } else {
          return "Password not matched"
      }
  } else {
      return "Username not found"
  } 
  
}

function register(newusername, newpassword, newname, newemail) {
  //TODO: Check if username exist
  
  let matched = dbUsers.find(element => 
  element.username == newusername)
  if(matched){
      console.log("Username already exist")
  }else { console.log("push successfully")

  dbUsers.push({
      username : newusername,
      password: newpassword,
      name: newname,
      email: newemail
      
  })    }
  
  return "Register Succesfully"
}