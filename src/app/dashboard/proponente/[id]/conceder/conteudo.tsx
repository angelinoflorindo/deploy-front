"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import {  useEffect, useState } from "react";
import { buscarEmprestimoById, buscarUser, calcularPrestacaoSimples, concederEmprestimo } from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const Conteudo = () => {

  const params = useParams()
  const  id  = params.id

  const [saldo, setSaldo] = useState('')
  const {data:session, status} = useSession() 
  const [userData, setUserData] = useState<UserInfo>({
    id: "",
    bilhete: "",
    email: "",
    genero: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    Carteira: {
      id: "",
      codigo: "",
      createdAt: "",
      numero: "",
      saldo: "",
      updatedAt: "",
      user_id: "",
    },
    Depositos: {
      id: "",
      user_id: "",
      estado: true,
      pendencia: true,
      createdAt: "",
      updatedAt: "",
      valor: "",
    },
    Devedor: {
      id: "",
      estado: true,
      inadimplencia: "",
      adimplencia: "",
      solicitacao: "",
      updatedAt: "",
      createdAt: "",
      user_id: "",
    },
    Investidor: {
      id: undefined,
      maior_risco: false,
      maior_seguranca: false,
      saque_antecipado: false,
      fundo_protegido: false,
      partilhar_emprestimo: false,
      estado: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Diversificacaos: [],
    },
    Documentos: {
      id: undefined,
      tipo: undefined,
      titulo: undefined,
      nome_salvado: undefined,
      nome_original: undefined,
      extensao: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
    },
    Papel: {
      id: undefined,
      perfil: undefined,
    },
    Pessoa: {
      id: undefined,
      estado_civil: undefined,
      provincia: undefined,
      municipio: undefined,
      profissao: undefined,
      user_id: undefined,
      emprego_id: undefined,
      residencia_id: undefined,
      nivel_instrucao: undefined,
      data_nascimento: undefined,
      Conjugue: {
        id: undefined,
        nome_completo: undefined,
        nivel_instrucao: undefined,
        dependentes: undefined,
        data_nascimento: undefined,
      },
      Emprego: {
        id: undefined,
        data_inicio: undefined,
        sector: undefined,
        cargo: undefined,
        area: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Residencium: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Contum: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      User: {
        id: undefined,
        email: undefined,
      },
    },
    Proponente: {
      id: undefined,
      solicitacao: undefined,
      reembolsar: undefined,
      satisfeitos: undefined,
      insatisfeitos: undefined,
      estado: false,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Emprestimos: [],
    },
    Reclamacaos: {
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Saque: {
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  })
  const [formData, setFormData] = useState<EmprestimoDef>({
    id:undefined,
    pendencia:undefined,
    juro:undefined,
    estado:true,
    Diversificacaos:[],
    EmprestimoSolidarios:[],
    prazo:undefined,
    prestacao:undefined,
    progresso:undefined,
    Proponente:{
        id: undefined,
        User: {
            id: undefined,
            primeiro_nome: undefined,
            segundo_nome: undefined,
            password: undefined,
            email: undefined,
            bilhete: undefined,
            telemovel: undefined,
            genero: undefined
        },
        ContaVinculadas: []
    },
    proponente_id:undefined,
    totalTaxa:'',
    totalGuardiaos:undefined,
    user_id:undefined,
    valor:undefined,
    taxaDiversificada:undefined,
    createdAt:undefined,
    updatedAt:undefined

})




  const fetchData =  async ()=>{
    
  const result:EmprestimoDef = await buscarEmprestimoById(id);
  const res:UserInfo = await buscarUser(session?.user.email)
  const diversificado:any = {}
  result.Diversificacaos.forEach((data)=>{
    if(res.Investidor.id === data.investidor_id){}
    let income = data.valor * (data.taxa/ 100);
    let inteiro = Math.round(income);
    diversificado.saldo = inteiro; 
  })

  const parcela = await calcularPrestacaoSimples(diversificado.saldo, ((result.juro-2)/100), result.prestacao) 
  setSaldo(`${parcela}`) 
  
  setFormData(result)
  setUserData(res)

  }

  useEffect(()=>{
    fetchData()
  }, [])




  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaldo(e.target.value);
  };

  useEffect(() => {
    if (
      formData.taxaDiversificada > 100 ||
      formData.taxaDiversificada === 100
    ) {
      setSaldo(formData.valor);
    }

  }, []);

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Beneficiário:</b> {formData.Proponente.User.primeiro_nome}{" "}
            {formData.Proponente.User.segundo_nome}
          </h1>
          <h3>
            <b>Telemovel: </b>
            {formData.Proponente.User.telemovel}
          </h3>
        </div>
        <div className={global.cartao_direita_depositar}>
          <Image
            src="/img/logo.png"
            alt="Onix Corporation"
            width={30}
            height={30}
          />
        </div>
      </header>
      <form action={concederEmprestimo}
        className="flex flex-col justify-center items-center"
      >
          <input
          type="text"
          name="emprestimoId"
          readOnly={true}
          hidden={true}
          value={formData.id}
        />
        <input
          type="text"
          name="userId"
          readOnly={true}
          hidden={true}
          value={userData.id}
        />

        <input
          type="text"
          name="propUserId"
          readOnly={true}
          hidden={true}
          value={formData.Proponente.User.id}
        />

        <input
          type="number"
          name="valor"
          placeholder="Especificar o valor"
          required
          value={saldo}
          onChange={handleValor}
          className={styles.input}
        />

        <SubmitButton />
      </form>
    </div>
  );
};

export default Conteudo;
