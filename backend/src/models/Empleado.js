const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    nombres : {type:String, required:true},
    apellidos: {type:String, required:true},
    domicilio: {type:String},
    telefono: {type:String},
    ci: {type:String, required:true, unique:true},
    salarioBase: {type:Number, required:true, default: 2192839},
    cargo: {type:String, required:true},
    tipo: {type:String, enum: ['M', 'J', 'C'], required:true},
    fechaIngreso: {type: String, required:true},
    activo: {type:Boolean, default:true, required:true},
    salarioPorDia : {type:Number, required:true, default: 0},
    salarioPorHora: {type:Number, required:true, default: 0},
    al_50 : {type:Number, required:true, default: 0},
    al_100 : {type:Number, required:true, default: 0},
    al_30: {type:Number, required:true, default: 0}

}, {
    timestamp: false
});

EmpleadoSchema.pre('save', async function () {
    //Todo: realizar los calculos aquí
    this.salarioPorDia = Number(this.salarioBase / 30).toFixed(0);
    this.salarioPorHora = Number(this.salarioPorDia / 8).toFixed(0);
    this.al_50 = Number(this.salarioPorHora + (this.salarioPorHora*0.5)).toFixed(0);
    this.al_100 = Number(this.salarioPorHora * 2).toFixed(0);
    this.al_30 = Number(this.salarioPorHora + (this.salarioPorHora*0.3)).toFixed(0);
});

module.exports = model('Empleado', EmpleadoSchema);
