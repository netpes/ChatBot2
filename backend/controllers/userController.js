const userSchema = require('../schema/signupSchema')
// const bcrypt = require('bcrypt')


module.exports = {
    getAllUser: (req,res) => {
        userSchema.find().then((users) => {
                res.status(200).json({
                    users
                })
            }).catch(
                (error) => {
                    res.status(500).json({
                        message: error
                    })
                }
            )

        },
    createUser: (req,res) => {
        const {name, password,email} = req.body;
        // const salt = bcrypt.genSalt(10);
        // const hashed = bcrypt.hash(password, salt)
        const user = new userSchema({
            name,
            password,
            email,
        })
        user.save().then(
            () => {
                res.status(200).json({
                    message:"Post saved successfully!",
                    data:req.body
                })

            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: error
                })
            }
        )
    },
    login: (req,res) => {
        const {email, password} = req.body;
        userSchema.findOne({email, password}).then((users) => {
            res.status(200).json({
                "true": "true",
                users: users,
                this: req.body
            })
            if (users) {
            console.log('oh fuck yeah')
            } else {
                console.log('null')
            }
            }).catch(
            (error) => {
                res.status(500).json({
                    message: error,
                    "sorry": "error"
                })
            }
        )
    }
}