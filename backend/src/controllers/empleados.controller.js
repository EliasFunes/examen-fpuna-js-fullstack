const EmpleadoModel = require('../models/Empleado');

module.exports = {

    /*GET All*/
    async getAllEmpleados(req, res){
        try {
            const empleados = await EmpleadoModel.find();
            res.json(empleados);
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo obtener a los empleados'
            });
        }
    },

    /*GET BY ID*/
    async getEmpleado(req, res){
        try {
            const empleado = await EmpleadoModel.findById(req.params.id);
            res.json(empleado);
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo obtener al empleado'
            });
        }
    },

    /*CREATE*/
    async createEmpleado(req, res){
        const {
            nombres,
            apellidos,
            ci,
            salarioBase,
            cargo,
            tipo,
            fechaIngreso,
            domicilio,
            telefono
        } = req.body;

        if(!nombres){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacío'
            });
        }

        if(!apellidos){
            return res.json({
                success: false,
                message: 'El apellido no puede estar vacío'
            });
        }

        if(!ci){
            return res.json({
                success: false,
                message: 'El número de documento no puede estar vacío'
            });
        }

        if(!salarioBase || salarioBase == 0){
            return res.json({
                success: false,
                message: 'El salario no puede estar vacío o ser igual a 0'
            });
        }

        if(!cargo){
            return res.json({
                success: false,
                message: 'El cargo no puede estar vacío'
            });
        }

        if(!tipo){
            return res.json({
                success: false,
                message: 'El tipo no puede estar vacío'
            });
        }

        if(!fechaIngreso){
            return res.json({
                success: false,
                message: 'La fecha de ingreso no puede estar vacío'
            });
        }

        try {
            const newEmpleado = new EmpleadoModel({
                nombres,
                apellidos,
                ci,
                salarioBase,
                cargo,
                tipo,
                fechaIngreso,
                domicilio,
                telefono
            });

            await newEmpleado.save();
            res.json({
                success: true,
                message: 'Empleado dado de alta'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo dar de alta al empleado'
            });
        }
    },

    /*UPDATE*/
    async updateEmpleado(req, res){
        try {
            await EmpleadoModel.findByIdAndUpdate({_id: req.params.id}, req.body);
            res.json({
                success: true,
                message: 'Empleado actualizado'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudieron actualizar los datos del Empleado'
            });
        }
    },

    /*DELETE*/
    async deleteEmpleado(req, res){
        try {
            const empleado = await EmpleadoModel.findById(req.params.id);
            empleado.activo = false;
            await EmpleadoModel.findByIdAndUpdate({_id: empleado.id}, empleado);
            res.json({
                success: true,
                message: 'Empleado dado de baja'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo dar de baja al empleado'
            });
        }
    }
}