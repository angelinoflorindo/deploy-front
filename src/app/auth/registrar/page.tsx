'use client'

import React from "react";
import styles from "../../../modules/Login.module.css"
import Image from "next/image";


import { useState } from "react";

const RegisterForm = () => {
    const [step, setStep] = useState(1); // Controla a etapa do formulário
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        profilePicture: null,
    });

    // Manipula mudanças nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manipula envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Registro concluído com sucesso!");
        console.log(formData);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">
                {step === 1 ? "Dados Pessoais" : "Informações Adicionais"}
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Etapa 1: Dados Pessoais */}
                {step === 1 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome Completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                )}

                {/* Etapa 2: Informações Adicionais */}
                {step === 2 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="address"
                            placeholder="Endereço"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData((prev:any) => ({
                                    ...prev,
                                    profilePicture: e.target.files?.[0] || null,
                                }))
                            }
                            className="w-full p-2 border rounded"
                        />
                    </div>
                )}

                {/* Botões de Navegação */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Voltar
                        </button>
                    )}

                    {step < 2 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Próximo
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Registrar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;





/*

        <div className={styles.container} >

            <form action="" method="post" className={styles.form}>
                <div className={styles.header} >
                    <Image src="/img/logo.png" alt="Onix Corporation" width={50} height={50} />
                    <h1 className={styles.h1} > Registrar </h1>

                </div>
                <input type="text" name="numero" placeholder="Primeiro nome" className={styles.input} />

                <input type="text" name="password" placeholder="Segundo nome" className={styles.input} />
                
                <input type="text" name="password" placeholder="Numero de telefone" className={styles.input} />

                <input type="text" name="password" placeholder="Genero" className={styles.input} />

                <input type="text" name="password" placeholder="Estado civil" className={styles.input} />
                
                <input type="text" name="password" placeholder="Numero bilhete" className={styles.input} />

                <input type="text" name="password" placeholder="Scanner bilhete" className={styles.input} />


                <button type="submit"  className={styles.button}>
                    Entrar
                </button>
            </form>
        </div>

*/