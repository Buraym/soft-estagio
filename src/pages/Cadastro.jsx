import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Cadastro.css'
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function Cadastro() {

    const [isOpen, setIsOpen] = useState(false)
    const [pattern, setPattern] = useState("[0-9]{2}?[0-9]{3}?[0-9]{3}?[0-9]{4}[-]?[0-9]{2}")
    var id = uuidv4()
    const [tipo, setTipo] = useState("Fisica")
    const [cpfCnpj, setCpfCnpj] = useState(0)
    const [nome, setNome] = useState("")
    const [nomeFantasia, setNomeFantasia] = useState("")
    const [cep, setCep] = useState(0)
    const [cepApi, setCepApi] = useState(null)
    const [endereco, setEndereco] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [telefone, setTelefone] = useState(0)
    const [email, setEmail] = useState("")

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const config = {header:{"Access-Control-Allow-Origin":"*","Cross-Origin-Opener-Policy":"same-origin","Cross-Origin-Embedder-Policy":"require-corp"}, CancelToken:source.token}

    let history = useHistory();
    
    function UsarAxiosParaCep(){
        if (cep.length > 7){
            const response = axios.get(('https://viacep.com.br/ws/' + cep + '/json/'), config)
            .then(
                (response)=>(
                    setCepApi(response.data),
                    setEndereco(response.data.logradouro),
                    setCidade(response.data.localidade),
                    setBairro(response.data.bairro),
                    console.log(response.data)
                )
            )
            .catch(function (error) {
                source.cancel('Operation canceled by the user.')
            })
        }
        
    }
    
    function HandleChangeCpfCnpj(e) {setCpfCnpj(e.target.value)}
    function HandleChangeNome(e) {setNome(e.target.value)}
    function HandleChangeNomeFantasia(e) {setNomeFantasia(e.target.value)}
    function HandleChangeCep(e) {
        setCep(e.target.value)
    }
    function HandleChangeEndereco(e) {setEndereco(e.target.value)}
    function HandleChangeBairro(e) {setBairro(e.target.value)}
    function HandleChangeCidade(e) {setCidade(e.target.value)}
    function HandleChangeTelefone(e) {setTelefone(e.target.value)}
    function HandleChangeEmail(e) {setEmail(e.target.value)}

    function HandleSubmit(event){
        
        const listaUsuarios = window.localStorage.getItem("usuarios")

        if (listaUsuarios === null ){
            /*var usuarioCadastro = JSON.stringify(usuario)*/
            var listaCadastrada = [usuario]
            window.localStorage.setItem("usuarios", JSON.stringify(listaCadastrada))
        } else {
            var listaString = (window.localStorage.getItem("usuarios"))
            var listaCadastros = (JSON.parse(listaString))
            listaCadastros.push(usuario)
            window.localStorage.removeItem("usuarios")
            window.localStorage.setItem("usuarios", JSON.stringify(listaCadastros))
        }
        history.push('/consulta')
        event.preventDefault()
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
            <Form onSubmit={HandleSubmit}>
                <Container fluid="sm">
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <div className="formulario-bloco">
                                <label>Tipo:</label>
                                {
                                    isOpen ?
                                        <>
                                            <BsFillCaretUpFill onClick={()=>(setIsOpen(!isOpen))}/>
                                            <Row md={{ span: 1, offset: 1 }}>
                                                <Col md={{ span: 4, offset: 4 }} style={{"borderColor":"crimson","border":"3px"}}>
                                                    <Button variant="dark" size="sm" onClick={()=>(setTipo("Fisica"),setPattern("[0-9]{3}?[0-9]{3}?[0-9]{3}[-]?[0-9]{2}"))} active> CPF </Button>
                                                </Col>
                                                <Col md={{ span: 4, offset: 4 }}>
                                                    <Button variant="dark" size="sm" onClick={()=>(setTipo("Juridica"),setPattern("[0-9]{2}?[0-9]{3}?[0-9]{3}?[0-9]{4}[-]?[0-9]{2}"))} active> CNPJ </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    :
                                        <BsFillCaretDownFill onClick={()=>(setIsOpen(!isOpen))}/>
                                }
                            </div>
                            <Form.Label>{ (tipo === "Fisica") ? "CPF: " : "CNPJ: "}</Form.Label>
                            <Form.Control onChange={HandleChangeCpfCnpj}  minLength={ (tipo === "Fisico") ? "11" : "14"} pattern={pattern} placeholder={ (tipo === "Fisica") ? "XXXXXXXXXXX" : "XXXXXXXXXXXXXX"} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>NOME/RAZÃO SOCIAL: </Form.Label>
                            <Form.Control onChange={HandleChangeNome} required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>NOME FANTASIA: </Form.Label>
                            <Form.Control onChange={HandleChangeNomeFantasia} required disabled={ tipo === "Fisica" ? true : false}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>CEP: </Form.Label>
                            <Form.Control id="inputcep" onChange={HandleChangeCep} pattern="[0-9]{8}" maxLength="8" onBlur={()=>{UsarAxiosParaCep()}} placeholder="XXXXXXXX" required/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>ENDEREÇO: </Form.Label>
                            <Form.Control onChange={HandleChangeEndereco} value={ (cepApi === null) ? "..." : cepApi.logradouro} disabled/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>BAIRRO: </Form.Label>
                            <Form.Control onChange={HandleChangeBairro} value={ (cepApi === null) ? "..." : cepApi.bairro} disabled/>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>CIDADE: </Form.Label>
                            <Form.Control onChange={HandleChangeCidade} value={ (cepApi === null) ? "..." : cepApi.localidade} disabled/>
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
                            <Button variant="dark" type="submit"> SALVAR </Button>
                        </Col>
                        <Col>
                            <Link to="/consulta"><Button variant="dark" type="submit"> VOLTAR </Button></Link>
                        </Col>
                    </Container>
                </Container>
            </Form>
                
        </div>
    )
}

export default Cadastro;