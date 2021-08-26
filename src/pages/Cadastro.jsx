import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCaretDownFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Cadastro.css'
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Cadastro() {

    const [isOpen, setIsOpen] = useState(false)
    const [pattern, setPattern] = useState("[0-9]{2}?[0-9]{3}?[0-9]{3}?[0-9]{4}[-]?[0-9]{2}")
    var id = uuidv4()
    const [tipo, setTipo] = useState("Fisica")
    const [cpfCnpj, setCpfCnpj] = useState(0)
    const [nome, setNome] = useState("")
    const [nomeFantasia, setNomeFantasia] = useState("")
    const [cep, setCep] = useState(0)
    const [endereco, setEndereco] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [telefone, setTelefone] = useState(0)
    const [email, setEmail] = useState("")

    let history = useHistory();
    
    function HandleChangeCpfCnpj(e) {setCpfCnpj(e.target.value)}
    function HandleChangeNome(e) {setNome(e.target.value)}
    function HandleChangeNomeFantasia(e) {setNomeFantasia(e.target.value)}
    function HandleChangeCep(e) {setCep(e.target.value)}
    function HandleChangeEndereco(e) {setEndereco(e.target.value)}
    function HandleChangeBairro(e) {setBairro(e.target.value)}
    function HandleChangeCidade(e) {setCidade(e.target.value)}
    function HandleChangeTelefone(e) {setTelefone(e.target.value)}
    function HandleChangeEmail(e) {setEmail(e.target.value)}

    function HandleSubmit(){
        
        const listaUsuarios = window.localStorage.getItem("usuarios")

        if (listaUsuarios === null ){
            var usuarioCadastro = JSON.stringify(usuario)
            var listaCadastrada = [usuario]
            window.localStorage.setItem("usuarios", JSON.stringify(listaCadastrada))
        } else {
            console.log("Caso da lista que não está cheia")
            var listaString = (window.localStorage.getItem("usuarios"))
            var listaCadastros = (JSON.parse(listaString))
            listaCadastros.push(usuario)
            window.localStorage.removeItem("usuarios")
            window.localStorage.setItem("usuarios", JSON.stringify(listaCadastros))
        }
        history.push('/consulta')
    }

    const usuario = {
        "id":id,
        "tipo":tipo,
        "cpfCnpj":cpfCnpj,
        "nome":nome,
        "nomeFantasia":nomeFantasia,
        "cep":cep,
        "endereco":endereco,
        "bairro":bairro,
        "cidade":cidade,
        "telefone":telefone,
        "email":email
    }

    return(
        <div className="tela">
            <label><strong>Tela de Cadastro</strong></label>
            <Form>
                <Container fluid="sm">
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <div className="formulario-bloco">
                                <label>Tipo:</label>
                                <BsFillCaretDownFill onClick={()=>(setIsOpen(!isOpen))}/>
                                {
                                    isOpen ?
                                        <Row md={{ span: 1, offset: 1 }}>
                                            <Col md={{ span: 4, offset: 4 }} style={{"borderColor":"crimson","border":"3px"}}>
                                                <Button variant="dark" size="sm" onClick={()=>(setTipo("Fisica"),setPattern("[0-9]{3}?[0-9]{3}?[0-9]{3}[-]?[0-9]{2}"))} active> CPF </Button>
                                            </Col>
                                            <Col md={{ span: 4, offset: 4 }}>
                                                <Button variant="dark" size="sm" onClick={()=>(setTipo("Juridica"),setPattern("[0-9]{2}?[0-9]{3}?[0-9]{3}?[0-9]{4}[-]?[0-9]{2}"))} active> CNPJ </Button>
                                            </Col>
                                            
                                        </Row>
                                    :
                                        null
                                }
                            </div>
                            <Form.Label>{ (tipo === "Fisica") ? "CPF: " : "CNPJ: "}</Form.Label>
                            <Form.Control onChange={HandleChangeCpfCnpj}  pattern={pattern} placeholder={ (tipo === "Fisica") ? "XXXXXXXXXXX" : "XXXXXXXXXXXXXX"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>NOME: </Form.Label>
                            <Form.Control onChange={HandleChangeNome} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>NOME FANTASIA: </Form.Label>
                            <Form.Control onChange={HandleChangeNomeFantasia} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>CEP: </Form.Label>
                            <Form.Control onChange={HandleChangeCep} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>ENDEREÇO: </Form.Label>
                            <Form.Control onChange={HandleChangeEndereco} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>BAIRRO: </Form.Label>
                            <Form.Control onChange={HandleChangeBairro} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>CIDADE: </Form.Label>
                            <Form.Control onChange={HandleChangeCidade} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>TELEFONE: </Form.Label>
                            <Form.Control onChange={HandleChangeTelefone} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>EMAIL: </Form.Label>
                            <Form.Control onChange={HandleChangeEmail} required/>
                        </Col>
                    </Row>
                    <Container md={{ span: 4, offset: 4 }}>
                        <Col>
                            <Button variant="dark" onClick={HandleSubmit}> SALVAR </Button>
                        </Col>
                    </Container>
                </Container>
            </Form>
                
        </div>
    )
}

export default Cadastro;