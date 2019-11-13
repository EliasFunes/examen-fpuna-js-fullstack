import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
            // editing: false,
            axios: this.props.axios,
            socket: this.props.socket,
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

        } catch (error) {
            NotificationManager.error('Ocurrió un error', 'Error');
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Formulario de Empleados</h5>
                                <form id="form" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="nombre">Nombres del empleado</label>
                                            <input type="text" name="nombres" id="nombres" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese los nombres del empleado" onChange={this.handleChange} value={this.state.nombres} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="nombre">Apellidos del empleado</label>
                                            <input type="text" name="apellidos" id="apellidos" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese los apellidos del empleado" onChange={this.handleChange} value={this.state.apellidos} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="domicilio">Domicilio</label>
                                            <input type="text" name="domicilio" id="domicilio" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el domicilio del empleado" onChange={this.handleChange} value={this.state.domicilio} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="telefono">Telefono</label>
                                            <input type="text" name="telefono" id="telefono" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el telefono del empleado" onChange={this.handleChange} value={this.state.telefono} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="ci">Nro. Documento</label>
                                            <input type="text" name="ci" id="ci" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el Nro. Doc. del empleado" onChange={this.handleChange} value={this.state.ci} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="salarioBase">Salario base</label>
                                            <input type="number" name="salarioBase" id="salarioBase" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el salario base del empleado" onChange={this.handleChange} value={this.state.salarioBase} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="cargo">Cargo</label>
                                            <input type="text" name="cargo" id="cargo" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese el cargo del empleado" onChange={this.handleChange} value={this.state.cargo} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="tipo">Tipo</label>
                                            <select name="tipo" id="tipo" className="form-control form-control-sm" required onChange={this.handleChange} value={this.state.tipo}>
                                                <option value="M" checked>Mensualero</option>
                                                <option value="J">Jornalero</option>
                                                <option value="C">Changarin</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="fechaIngreso">Fecha Ingreso</label>
                                            <input type="text" name="fechaIngreso" id="fechaIngreso" className="form-control form-control-sm" autoComplete="off" required placeholder="Ingrese fecha de ingreso del empleado" onChange={this.handleChange} value={this.state.fechaIngreso} />
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nombres y Apellidos</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Salario Base</th>
                                <th scope="col">Salario por dia</th>
                                <th scope="col">Salario por hora</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.empleados.map(empleado => {
                                        let nombreCompleto = empleado.nombres + ' '+ empleado.apellidos
                                        return (
                                            <tr key={empleado._id}>
                                                <td>{nombreCompleto}</td>
                                                <td>{empleado.cargo}</td>
                                                <td>{empleado.salarioBase}</td>
                                                <td>{empleado.salarioPorDia}</td>
                                                <td>{empleado.salarioPorHora}</td>
                                            </tr>
                                        )
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