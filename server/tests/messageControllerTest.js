const chai = require ('chai');
const expect = chai.expect;
const userController = require('../controllers/userController');


describe('User Controller Tests:', function(){

    describe('Post' ,function(){

        it('should not allow an empty username' ,function(){
            const User = function(user){this.create =()=>{}};

            const req = {
                body: {
                    email: ''
                }
            }

        })

    })
})


 
