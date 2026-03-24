const userModel = require('../models/user.model');

exports.getAllUsers = async (req, res)=>{
    await userModel.find()
    .then((users)=>{
        res.json(users);
    })
    .catch((err)=>{
        res.json(err);
    })
}

exports.getUserById = async (req, res)=>{
    const { id } = req.params;
    await userModel.findById({_id:id})
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.json(err);
    })
}

exports.createUser = async (req, res)=>{
    await userModel.create(req.body)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.json(err);
    })
}

exports.updateUser = async (req, res)=>{
    const { id } = req.params;
    await userModel.findByIdAndUpdate({_id:id}, req.body)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.json(err);
    })
}

exports.deleteUser = async (req, res)=>{
    const { id } = req.params;
    await userModel.findByIdAndDelete(id)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.json(err);
    })
}

