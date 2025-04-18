



import React from "react";


const Pagamento = () => {
    return (

        <div className="flex flex-col justify-center items-center " >
            <h1 className="font-bold text-center"> Conceder créditos </h1>

            <section className="shadow-md p-5 w-[100%]" >

                <div className="flex flex-col justify-center items-center" >
                    <div className="bg-gray-100 w-30 h-15 flex justify-center  items-center " >
                        <b>XX,00KZ</b>
                    </div>
                    <div className="flex flex-col w-[100%] p-2 justify-start  items-start " >
                        <span><b>Destinatário:</b> Onix Corporation</span>
                        <span><b>IBAN:</b> 000.000.000.0000.000 </span>
                    </div>
                </div>
                <h2>Anexar comprovativo</h2>
                <input
                    type="file"
                    name="scanner"
                    accept="image/*"
                    className="w-full  p-2 border rounded"
                />

            </section>
            <button type="submit" className="px-4 w-[50%] py-2 bg-violet-500  text-white rounded" >
                Investir
            </button>
        </div>
    );
};

export default Pagamento;
