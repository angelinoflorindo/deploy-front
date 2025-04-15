import { buscarPessoa } from "@/app/actions/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/modules/Login.module.css";
import { PessoaDef } from "@/services/user.service";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const PageInfo = async (context: { params: { id: string } }) => {
  const { id } = await context.params;
  const session = await getServerSession();

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

    formData.append("tipo", "DECLARACAO_TRABALHO");
    formData.append("titulo", "Documentos financeiros");
    formData.append("user_id", `${pessoaData.User.id}`);
    const files = formData.getAll("scanner") as File[];

    if (files[0].size === 0 || files.length === 0) {
       return redirect("/ferramenta/detalhes");
    }
    const result = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      console.log("Erro ao anexar documentos", result.statusText);
      return redirect("/ferramenta/detalhes");
    }

    if (pessoaData.Contum) {
      await fetch(
        `${process.env.CLIENT_URL}/api/pessoa/conta/${pessoaData.Contum.id}`,
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
    <div className={styles.Contuminer}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <form action={submitForm}>
            <h2>
              <b>Informações financeiras</b>
            </h2>

            {pessoaData.Contum === null ? (
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
                  placeholder={pessoaData.Contum.nome}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder={pessoaData.Contum.iban}
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder={pessoaData.Contum.salario}
                  required
                  className={styles.input}
                />
              </div>
            )}

            <input
              type="file"
              name="scanner"
              multiple={true}
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
