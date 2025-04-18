



export default async function Teste(context:{params:{id:string}}){
    const {id} = context.params

    return(
        <div>Imprimindo id {id} do emprestimo</div>
    )
}