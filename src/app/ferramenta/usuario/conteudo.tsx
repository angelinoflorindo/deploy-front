
'use client';
import styles from "@/modules/Login.module.css"
import { UserProps, userResponse } from "@/services/user.service";
import { useEffect, useState } from "react";

export default  function Conteudo() {
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const users: UserProps[] = []
    let email:any[] = []


    useEffect( () => {

        fetch(`/api/cookies?nome=user_email`)
            .then(async (data) => {

                const res = await data.json()
                const session = res.session.sessionId
                email.push(session)
               // setToken(session)
                await new Promise(resolve => setTimeout(resolve, 3000))
            })
            .catch((err) => { console.log(err) })
            
            console.log("user email",email[0])

            fetch(`/api/usuario?email=${email[0]}`)
                .then(async (usuario) => {
                    const req = await usuario.json()
                    //console.log("user", req)
                    //setUser(req)

                    users.push(req)
                })
                .catch((err) => { console.log(err) })

    }, []);



    return (

        <div >
            <h1 className="font-bold text-center">Minha conta </h1>



            {users.map((event) => (
                <section key={event.id} className="shadow-md p-5" >
                    <h2> <span> {event.primeiro_nome } </span><span>{event.segundo_nome}</span>  </h2>
                    <div className="flex flex-row justify-between  py-2" >
                        <div className="flex flex-col  ">
                            <span className="py-1"> Gênero:  <b>{event.genero}</b> </span>
                            <span className="py-1">Telemovel: <b>{event.telemovel}</b> </span>
                            <span className="py-1"> Bilhete:  <b>{event.bilhete}</b> </span>
                            <span className="py-1">Email: <b>{event.email} </b> </span>
                        </div>
                    </div>
                    <hr className={styles.divider} />
                    <div className="flex flex-col" >
                        <span className="py-1"> Estado civil :  <b>nenhum</b> </span>
                        <span className="py-1">Data nascimento : <b>1994</b> </span>
                        <span className="py-1"> Morada atual :  <b>Luanda</b> </span>
                        <span className="py-1">Município: <b>Cacuaco</b> </span>
                    </div>
                </section>
            ))}


        </div>
    );
};
