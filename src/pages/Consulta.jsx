import '../styles/Consulta.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Consulta() {

    const listaString = (window.localStorage.getItem("usuarios"))
    const lista = JSON.parse(listaString)
    console.log(lista)

    return(
        <div className="tela">
            <label><strong>Tela de Consulta</strong></label>
            <Container fluid="sm">
                <Col>
                    <Row  lg="4">
                        <Col>Código</Col>
                        <Col>Nome</Col>
                        <Col>Endereço</Col>
                        <Col>Email</Col>
                    </Row>
                    {
                        (lista === null) ?
                            <Row xs="4">
                                <Col className="box">Nenhum Cadastro</Col>
                                <Col className="box">Nenhum Cadastros</Col>
                                <Col className="box">Nenhum Cadastro</Col>
                                <Col className="box">Nenhum Cadastro</Col>
                            </Row>
                        :
                            <Row xs="4">
                                <Col className="box-outside">
                                    {lista.map((el) => {return(<Col key={el} className="box">{el.id}</Col>)})}
                                </Col>
                                <Col className="box-outside">
                                    {lista.map((el) => {return(<Col key={el} className="box">{el.nome}</Col>)})}
                                </Col>
                                <Col className="box-outside">
                                    {lista.map((el) => {return(<Col key={el} className="box">{el.endereco}</Col>)})}
                                </Col>
                                <Col className="box-outside">
                                    {lista.map((el) => {return(<Col key={el} className="box">{el.email}</Col>)})}
                                </Col>
                            </Row>
                    }
                </Col>
                <Row><Link to="/cadastro"><Button variant="dark">NOVO</Button></Link></Row>
            </Container>
        </div>
    )
}

export default Consulta;