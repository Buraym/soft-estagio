import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import '../styles/Cadastro.css'

function Cadastro() {

    const [isOpen, setIsOpen] = useState(false)
    const [pattern, setPattern] = useState("[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}")
    const [id, setId] = useState(0)
    const [tipo, setTipo] = useState("CPF")
    const [cpfCnpj, setCpfCnpj] = useState(0)
    const [nome, setNome] = useState("")
    const [nomeFantasia, setNomeFantasia] = useState("")
    const [cep, setCep] = useState(0)
    const [endereco, setEndereco] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [telefone, setTelefone] = useState(0)
    const [email, setEmail] = useState("")
    
    function HandleChangeCpfCnpj(e) {setCpfCnpj(e.target.value)}
    function HandleChangeNome(e) {setNome(e.target.value)}
    function HandleChangeNomeFantasia(e) {setNomeFantasia(e.target.value)}
    function HandleChangeCep(e) {setCep(e.target.value)}
    function HandleChangeEndereco(e) {setEndereco(e.target.value)}
    function HandleChangeBairro(e) {setBairro(e.target.value)}
    function HandleChangeCidade(e) {setCidade(e.target.value)}
    function HandleChangeTelefone(e) {setTelefone(e.target.value)}
    function HandleChangeEmail(e) {setEmail(e.target.value)}

    function HandleSubmit(e){
        e.preventDefault();
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
            <form className="formulario" onSubmit={HandleSubmit}>
                <div className="formulario-tela">
                    <div className="formulario-bloco">
                        <label>Tipo:</label>
                        <BsFillCaretDownFill onClick={()=>(setIsOpen(!isOpen))}/>
                        {
                            isOpen ?
                                <div> 
                                    <Button variant="dark" size="sm" onClick={()=>(setTipo("CPF"),setPattern("[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}"))} active> CPF </Button>
                                    <Button variant="dark" size="sm" onClick={()=>(setTipo("CNPJ"),setPattern("[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}"))} active> CNPJ </Button>
                                </div>
                            :
                                null
                        }
                    </div>
                    <div className="formulario-bloco">
                        <label>CPF/CNPJ:</label>
                        <input onChange={HandleChangeCpfCnpj} pattern={pattern} placeholder={ (tipo === "CPF") ? "XXX.XXX.XXX-XX" : "XX.XXX.XXX.XXXX.XX"}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>NOME:</label>
                        <input onChange={HandleChangeNome}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>NOME FANTASIA:</label>
                        <input onChange={HandleChangeNomeFantasia}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>CEP:</label>
                        <input onChange={HandleChangeCep}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>ENDEREÇO:</label>
                        <input onChange={HandleChangeEndereco}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>BAIRRO:</label>
                        <input onChange={HandleChangeBairro}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>CIDADE:</label>
                        <input onChange={HandleChangeCidade}/>
                    </div>
                    <div className="formulario-bloco">
                        <label>TELEFONE:</label>
                        <input type="tel" pattern="[0-9]{2}[0-9]{5}-[0-9]{4}" onChange={HandleChangeTelefone}></input>
                    </div>
                    <div className="formulario-bloco">
                        <label>EMAIL:</label>
                        <input onChange={HandleChangeEmail}/>
                    </div>
                </div>
                <div><button>Salvar</button></div>
            </form>
        </div>
    )
}

export default Cadastro;