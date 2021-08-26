import '../styles/Consulta.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function Consulta() {

    const listaString = JSON.parse(window.localStorage.getItem("usuarios"))
    

    return(
        <div className="tela">
            <Row><Link to="/cadastro"><Button variant="dark">NOVO</Button></Link></Row>
            <Container>
                <Col>
                    <Row>
                        <Col xs={1,2} class="row">Código</Col>
                        <Col xs={3} class="row">Nome</Col>
                        <Col xs={3} sclass="row">Endereço</Col>
                        <Col xs={3} sclass="row">Email</Col>
                    </Row>
                    <Row>
                        {listaString.forEach((el) => {return(<Col key={el}>{el.id}</Col>)})}
                        {listaString.forEach((el) => {return(<Col key={el}>{el.nome}</Col>)})}
                        {listaString.forEach((el) => {return(<Col key={el}>{el.endereco}</Col>)})}
                        {listaString.forEach((el) => {return(<Col key={el}>{el.email}</Col>)})}
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default Consulta;