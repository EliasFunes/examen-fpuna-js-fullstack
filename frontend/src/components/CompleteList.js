import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import NumberFormat from "react-number-format";

export default class CompleteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            axios: this.props.axios,
            socket: this.props.socket,
            empleados: []
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
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nro. Doc</th>
                                <th scope="col">Nombres y Apellidos</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Activo</th>
                                <th scope="col">Salario Base</th>
                                <th scope="col">Salario por dia</th>
                                <th scope="col">Salario por hora</th>
                                <th scope="col">+50%</th>
                                <th scope="col">+100%</th>
                                <th scope="col">+30%</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.empleados.map(empleado => {
                                    let nombreCompleto = empleado.nombres + ' '+ empleado.apellidos
                                    let activo = "Si";
                                    if(!empleado.activo){
                                        activo = "No";
                                    }
                                    return (
                                        <tr key={empleado._id}>
                                            <td>
                                                <NumberFormat displayType={"text"}
                                                              thousandSeparator={"."}
                                                              decimalSeparator={false}
                                                              value={empleado.ci}>
                                                </NumberFormat>
                                            </td>
                                            <td>{nombreCompleto}</td>
                                            <td>{empleado.cargo}</td>
                                            <td>{empleado.tipo}</td>
                                            <td>{activo}</td>
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
                                                <NumberFormat displayType={"text"}
                                                              thousandSeparator={"."}
                                                              decimalSeparator={false}
                                                              value={empleado.al_50}>
                                                </NumberFormat>
                                            </td>
                                            <td>
                                                <NumberFormat displayType={"text"}
                                                              thousandSeparator={"."}
                                                              decimalSeparator={false}
                                                              value={empleado.al_100}>
                                                </NumberFormat>
                                            </td>
                                            <td>
                                                <NumberFormat displayType={"text"}
                                                              thousandSeparator={"."}
                                                              decimalSeparator={false}
                                                              value={empleado.al_30}>
                                                </NumberFormat>
                                            </td>
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