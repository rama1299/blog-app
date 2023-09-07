const {User} = require('../models')
const XLSX = require('xlsx');
const fs = require('fs');

class UserController{
    static async findUsers(req, res, next) {
        try {
            const data = await User.findAll()
            if(data.length === 0) {
                throw {name: "ErrorNotFound"}
            }

            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

    static async findUserById(req, res, next) {
        try {
            const id = req.params.userId

            const data = await User.findOne({
                where: {
                    id
                }
            })

            if(!data) {
                throw {name: "ErrorNotFound"}
            }

            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next) {
        try {
            const {name, email, gender, birthday, address} = req.body
            if(!name||!email||!gender||!birthday||!address) {
                throw {name: "IncompleteData"}
            }

            const userCreate = await User.create({
                name,
                email,
                gender,
                birthday,
                address
            })

            if (!userCreate) {
                throw {name: "FailedCreate"}
            }

            res.status(200).json({message: "Create user successfully!"})
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = req.params.userId
            const {name, email, gender, birthday, address} = req.body
            if(!name||!email||!gender||!birthday||!address) {
                throw {name: "IncompleteData"}
            }

            const user = await User.findOne({
                where: {
                    id
                }
            })
            if (!user) {
                throw {name: "ErrorNotFound"}
            }

            const userUpdate = await User.update({
                name,
                email,
                gender,
                birthday,
                address
            },
            {
                where: {id}
            })
            if (userUpdate[0] === 0) {
                throw {name: "FaildeUpdate"}
            }

            res.status(200).json({message: "Update user successfully!"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const id = req.params.userId

            const userDelete = await User.destroy({
                where: {id}
            })
            if(userDelete[0] === 0) {
                throw {name: "FailedDelete"}
            }

            res.status(200).json({message: "Delete user successfully!"})
        } catch (error) {
            next(error)
        }
    }

    static async exportUserToExcel(req, res, next) {
        try{
            const users = await User.findAll();

            const dataForExcel = users.map(user => ({
                Name: user.name,
                Email: user.email,
                Gender: user.gender,
                Birthday: user.birthday.toISOString().split('T')[0], // Format tanggal ke 'YYYY-MM-DD'
                Address: user.address,
            }))

            const ws = XLSX.utils.json_to_sheet(dataForExcel)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Users')

            const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

            fs.writeFileSync('users.xlsx', buffer)

            res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx')
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.status(200).end(buffer)
        }catch (error){
            next(error)
        }
    }
}

module.exports = UserController