// Importing the user model
const userModel = require ('../Models/user.model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(6);
const jwt = require ('jsonwebtoken');

// register: Whenever a new user signs up or creates a new account
const signup = async (request, response) => {
    // To create an account the user must need username, a unique email Id not previously existing into the DB, and password 
    let {
        username,
        email,
        password
    } = request.body;
    try {
        // if the fields are left void the user is requested to enter all the fields
        if (username == '' || email == '' || password == ''){
            return response.status(400).json({
                success: false,
                message: `Please enter all the required fields`
            })
        }

        // Now check if there is an user existing with the entered email id
        const isNewUser = await userModel.find({email});

        // if the user exists then abandon his registration..... ask for a new email id
        if (isNewUser.length > 0){
            return response.status(400).json({
                success: false,
                message: "User already exists with the entered email ID"
            })
        }

        // if all the above conditions fail then register a new user
        const registerNewUser = await userModel.create({
            username,
            email,
            password: await bcrypt.hash(password, salt),
        })

        // Generate a new token
        // jwt.sign(payload, secret_key, Expires_in)
        const token = jwt.sign(
            {
                id: registerNewUser._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '12H'
            },
        );

        return response.status(200).json({ 
            success: true, 
            message: "User registered successfully.", 
            registerNewUser,
            token
        })
    } catch (error) {
        return response.status(401).json({
            message: `Server not working properly.....Something went wrong ${error.message}`
        })
    }
};

// login: Whenever an existing user logs(signs) in
const signin = async (request, response) => {
    // to login the user only need to enter their email id and password
    let {
        email,
        password
    } = request.body;
    try {
        // if the fields are kept empty while login the user is asked to enter the credentials first
        if (email == '' || password == ''){
            return response.status(400).json({
                success: false,
                message: `All Fields are Empty.....Please enter the required details to Signin`,
            })
        }

        // check whether the entered email id exists(user exists or not)
        const isAlreadyUser = await userModel.find({email});

        // if no such email exists return false(no user exists)
        if (isAlreadyUser.length == 0) {
            return response.status(400).json({
                success: false,
                message: `Invalid Credentials....User does not exist....Sign Up first to login`
            })
        }

        // if the email exists then match the password with the password stored into the database
        if (isAlreadyUser.length > 0 && isAlreadyUser[0].password){
            // generate a token for users trying to login 
            const token = jwt.sign(
                {
                    id: isAlreadyUser[0]._id,

                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '12H'
                }
            );
            if (await bcrypt.compare(password, isAlreadyUser[0].password)){
                return response.status(200).json({
                    success: true,
                    message: `User Loggedin successfully`,
                    token,
                    isAlreadyUser
                })
            }
        }
    } catch (error) {
        return response.status(401).json({
            message: `Server Problem.....Please Check ${error.message}`
        })
    }
};

// Profile View   - Endpoint: `GET /users/profile` 
const getAllUsers = async (request, response) => {
    // console.log();
    try {
        // To find the list of all users
        const getListOfAllUsers = await userModel.find({});
        console.log(getListOfAllUsers);
        // if the let of users > 0 then there are users
        // return the users
        if (getListOfAllUsers.length > 0){
            return response.status(200).json({
                success: true,
                message: `List of All Users are returned successfully`,
                getListOfAllUsers
            });
        }

        // If the db is empty return no users left
        return response.status(400).json({
            message: `No users found in the database`,
        });
    } catch (error) {
        return response.status(401).json({
            message: `Something Went Wrong..... Server not responding ${error.message}`,
        })
        
    }
};
// Profile Update   - Endpoint: `PUT /users/profile`
const updateUser = async (request, response) => {
    let {id} = request.params;
    // Only Username and Password can be updated
    const {
        username,
        password
    } = request.body;
    // console.log(id, username, password, "from requests...");
    try {
        const updateProfile = await userModel.findByIdAndUpdate(
            {
                _id:id,
            },
            {
                username: username,
                password: password
            },
            {
                new: true,
            }
        );
        // if the profile is not needed to be updated return not updated
        if (!updateProfile){ 
            return response.status(400).json({
                success: false,
                message: `No need to update`
            })
        }

        // else return the updated profile
        return response.status(200).json({
            success: true,
            message: `Profile updated successfully`,
            user: { 
                email: updateProfile.email, 
                name: updateProfile.username
            }             
        })
    } catch (error) {
        return response.status(400).json({
            message: `Server not working.....${error.message}`
        })
    }
};

// Exporting all the newly created controllers
module.exports = {
    signup,
    signin,
    getAllUsers,
    updateUser
};