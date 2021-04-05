module.exports=(app)=>{
    var user=require('../controllers/user.controller')
    app.get('/',user.check)//just for checking if server is live

    app.post('/addUser',user.create)//for register users

    app.get('/getUser',user.findAll)//for getting user's list

    app.post('/getUserByStatus',user.findByStatus)//for getting user's life by status

    app.post('/updateUserStatus',user.updateStatus)//for update the status of user

    app.post('/findByDistrict',user.findByDistrict)
}