'use client'

import React from "react";
import styles from "@/modules/Login.module.css"
import Header from "@/components/header";


import { useState } from "react";

const RegisterForm = () => {
    const [step, setStep] = useState(1); // Controla a etapa do formulário
    const [formData, setFormData] = useState({
        nome_completo: "",
        telemovel:"",
        email: "",
        password: "",
        genero: "",
        estado_civil: "",
        bilhete: "",
        scanner: null,
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

        <div className={styles.container}>
            <div className="flex flex-col h-screen w-[400px] bg-white mx-auto shadow-lg" >
                <Header />
                <div className=" p-[20px]">

                    <h2 className="text-xl font-bold text-start mb-4">
                        {step === 1 ? "Criar uma conta" : "Criar uma conta"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Etapa 1: Dados Pessoais */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="nome_completo"
                                    placeholder="Nome completo"
                                    value={formData.nome_completo}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email (Opcional)"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />

                                <input
                                    type="tel"
                                    name="telemovel"
                                    placeholder="Telemovel"
                                    value={formData.telemovel}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Palavra passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        )}

                        {/* Etapa 2: Informações Adicionais */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="genero"
                                    placeholder="Gênero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    name="estado_civil"
                                    placeholder="Estado civil"
                                    value={formData.estado_civil}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                                
                                <input
                                    type="text"
                                    name="bilhete"
                                    placeholder="Numero do bilhete"
                                    value={formData.bilhete}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="file"
                                    name="scanner"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            profilePicture: e.target.files?.[0] || null,
                                        }))
                                    }
                                    className="w-full  p-2 border rounded"
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
            </div>
        </div>

    );
};

export default RegisterForm;