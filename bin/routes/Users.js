var express = require('express');
const router = express.Router();

// importar el modelo Users
var Users = require('../models/Users');

// POST Agregar un Usuario
router.post('/users', async(req, res) => {
    const body = req.body;
    try {
        const usersDB = await Users.create(body);
        console.log(req.body)
        res.status(200).json(usersDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Get Traer todos los usuarios
router.get('/users', async(req, res) => {
    try {
        const usersDb = await Users.find();
        res.json(usersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// GET Buscar un usuario por su id
router.get('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const usersDB = await Users.findOne({ _id });
        res.json(usersDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Delete Eliminar un usuario
router.delete('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const usersDb = await Users.findByIdAndDelete({ _id });
        if (!usersDb) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado',
                error
            })
        }
        res.json(usersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Delete eliminar un usuario
router.delete('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const usersDb = await Users.findByIdAndDelete({ _id });
        if (!usersDb) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado',
                error
            })
        }
        res.json(usersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Put actualizar una users
router.put('/users/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const usersDb = await Users.findByIdAndUpdate(
            _id,
            body, { new: true });
        res.json(usersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Exportamos la configuración de express app
module.exports = router;