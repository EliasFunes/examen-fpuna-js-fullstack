import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import InputMask from 'react-input-mask';
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

export default class Empleados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres: '',
            apellidos: '',
            domicilio: '',
            telefono: '',
            ci: '',
            salarioBase: 0,
            cargo: '',
            tipo: 'M',
            fechaIngreso: '',
            _id: '',
            axios: this.props.axios,
            socket: this.props.socket,
            editing: false,
            empleados: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const empleado = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            domicilio: this.state.domicilio,
            telefono: this.state.telefono,
            ci: this.state.ci,
            salarioBase: this.state.salarioBase,
            cargo: this.state.cargo,
            tipo: this.state.tipo,
            fechaIngreso: this.state.fechaIngreso
        }

        try {

            if (this.state.editing) {

                const res = await this.state.axios.put('/api/empleados/' + this.state._id, empleado);
                if (res.data.success) {
                    NotificationManager.success(res.data.message, 'Empleado');
                    this.setState({
                        nombres: '',
                        apellidos: '',
                        domicilio: '',
                        telefono: '',
                        ci: '',
                        salarioBase: 0,
                        cargo: '',
                        tipo: 'M',
                        fechaIngreso: '',
                        editing: false
                    });
                    this.fetchEmpleados();
                    document.getElementById('form').reset();
                } else {
                    NotificationManager.error(res.data.message, 'Empleado')
                }

            } else {
                const res = await this.state.axios.post('/api/empleados', empleado);
                if (res.data.success) {
                    NotificationManager.success(res.data.message, 'Empleado')
                    this.setState({
                        nombres: '',
                        apellidos: '',
                        domicilio: '',
                        telefono: '',
                        ci: '',
                        salarioBase: 0,
                        cargo: '',
                        tipo: 'M',
                        fechaIngreso: '',
                    });
                    this.fetchEmpleados();
                    document.getElementById('form').reset();
                } else {
                    NotificationManager.error(res.data.message, 'Empleado');
                }
            }
        } catch (error) {
            NotificationManager.error('Ocurrió un error', 'Error');
        }
    }

    async updateEmpleado(id) {
        try {
            const res = await this.state.axios.get('/api/empleados/' + id)
            this.setState({
                nombres: res.data.nombres,
                apellidos: res.data.apellidos,
                domicilio: res.data.domicilio,
                telefono: res.data.telefono,
                ci: res.data.ci,
                salarioBase: res.data.salarioBase,
                cargo: res.data.cargo,
                tipo: res.data.tipo,
                fechaIngreso: res.data.fechaIngreso,
                _id: res.data._id,
                editing: true
            })
        } catch (error) {
            console.log('Error')
        }
    }

    async deleteEmpleado(id) {
        try {
            const res = await this.state.axios.delete('/api/empleados/' + id);
            if(res.data.success){
                NotificationManager.success(res.data.message, 'Empleado');
                this.fetchEmpleados();
            }
        } catch (error) {
            console.log('Error');
        }
    }

    componentDidMount() {
        this.fetchEmpleados();
    }

    async fetchEmpleados() {
        try {
            await this.state.socket.emit('fetchEmpleados');
            await this.state.socket.on('Empleados', (data) => {
                this.setState({
                    empleados: data
                });
            });
        } catch (error) {
            NotificationManager.error('No se pudo recuperar datos de los empleados', 'Error');
        }
    }

    render() {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-4">
                        <form id="form" onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Formulario de Empleados</h5>
                                </div>
                                <div className="card-body">

                                        <div className="row">
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="nombre">Nombres del empleado</label>
                                                <input type="text" name="nombres" id="nombres" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese los nombres del empleado" onChange={this.handleChange} value={this.state.nombres} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="nombre">Apellidos del empleado</label>
                                                <input type="text" name="apellidos" id="apellidos" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese los apellidos del empleado" onChange={this.handleChange} value={this.state.apellidos} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="domicilio">Domicilio</label>
                                                <input type="text" name="domicilio" id="domicilio" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el domicilio del empleado" onChange={this.handleChange} value={this.state.domicilio} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="telefono">Telefono</label>
                                                <input type="text" name="telefono" id="telefono" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el telefono del empleado" onChange={this.handleChange} value={this.state.telefono} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="ci">Nro. Documento</label>
                                                <input type="text" name="ci" id="ci" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el Nro. Doc. del empleado" onChange={this.handleChange} value={this.state.ci} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="salarioBase">Salario base</label>
                                                <input type="number" name="salarioBase" id="salarioBase" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el salario base del empleado" onChange={this.handleChange} value={this.state.salarioBase} required/>
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="cargo">Cargo</label>
                                                <input type="text" name="cargo" id="cargo" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el cargo del empleado" onChange={this.handleChange} value={this.state.cargo} />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="tipo">Tipo</label>
                                                <select name="tipo" id="tipo" className="form-control form-control-sm" required onChange={this.handleChange} value={this.state.tipo}>
                                                    <option value="M" checked>Mensualero</option>
                                                    <option value="J">Jornalero</option>
                                                    <option value="C">Changarin</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label htmlFor="fechaIngreso">Fecha Ingreso</label>
                                                <InputMask mask="99/99/9999" type="text" name="fechaIngreso" id="fechaIngreso" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese fecha de ingreso del empleado" onChange={this.handleChange} value={this.state.fechaIngreso} />
                                            </div>
                                        </div>

                                </div>
                                <div className="card-footer">
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-success btn-sm fa-pull-right">
                                            <FontAwesomeIcon icon={faSave} /> Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-8">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nombres y Apellidos</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Salario Base</th>
                                <th scope="col">Salario por dia</th>
                                <th scope="col">Salario por hora</th>
                                <th scope="col" colSpan={2}>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.empleados.map(empleado => {
                                        let nombreCompleto = empleado.nombres + ' '+ empleado.apellidos
                                        if(empleado.activo){
                                            return (
                                                <tr key={empleado._id}>
                                                    <td>{nombreCompleto}</td>
                                                    <td>{empleado.cargo}</td>
                                                    <td>
                                                        <NumberFormat displayType={"text"}
                                                                      thousandSeparator={"."}
                                                                      decimalSeparator={false}
                                                                      value={empleado.salarioBase}>
                                                        </NumberFormat>
                                                    </td>
                                                    <td>
                                                        <NumberFormat displayType={"text"}
                                                                      thousandSeparator={"."}
                                                                      decimalSeparator={false}
                                                                      value={empleado.salarioPorDia}>
                                                        </NumberFormat>
                                                    </td>
                                                    <td>
                                                        <NumberFormat displayType={"text"}
                                                                      thousandSeparator={"."}
                                                                      decimalSeparator={false}
                                                                      value={empleado.salarioPorHora}>
                                                        </NumberFormat>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary btn-sm" onClick={() => this.updateEmpleado(empleado._id)}>
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm" onClick={() => this.deleteEmpleado(empleado._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}