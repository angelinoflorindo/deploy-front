import { buscarPessoa } from "@/app/actions/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/modules/Login.module.css";
import { PessoaDef } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";

const PageInfo = async (context: { params: { id: string } }) => {
  const { id } = await context.params;

  //console.log("client uuid", id)
  const pessoaData: PessoaDef = await buscarPessoa(id);
  async function submitForm(formData: FormData) {
    "use server";

    const dataSend = {
      nome: formData.get("nome"),
      iban: formData.get("iban"),
      salario: formData.get("salario"),
      emprego_id: pessoaData.emprego_id,
      pessoa_id: pessoaData.id,
    };
    if (pessoaData.conta) {
      console.log("conta existe", pessoaData.conta);
      await fetch(
        `${process.env.CLIENT_URL}/api/pessoa/conta/${pessoaData.conta.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(dataSend),
        }
      );

      return redirect("/ferramenta/detalhes");
    } else {
      console.log("Conta inexistente!");
      await fetch(`${process.env.CLIENT_URL}/api/pessoa/conta`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });

      return redirect("/ferramenta/detalhes");
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <form action={submitForm}>
            <h2>
              <b>Informações financeiras</b>
            </h2>

            {pessoaData.conta === null ? (
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do Banco"
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder="IBAN"
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder="Renda actual"
                  required
                  className={styles.input}
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder={pessoaData.conta.nome}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder={pessoaData.conta.iban}
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder={pessoaData.conta.salario}
                  required
                  className={styles.input}
                />
              </div>
            )}
            <input
              type="file"
              name="scanner"
              accept="image/*"
              className={styles.input}
            />

            <div className="w-[100%] flex flex-row justify-around">
              <Link
                href="/ferramenta/detalhes"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Voltar
              </Link>

              <button
                type="submit"
                className="px-4 py-2 bg-violet-500 text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </form>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default PageInfo;
