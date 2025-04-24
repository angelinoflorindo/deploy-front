
export const dynamic = 'force-dynamic';


export async function gerarNumeroCartao() {
    return Math.floor(1000000 + Math.random() * 9000000); // 7 dígitos
  }

export async function gerarCodigoCartao() {
  return Math.floor(1000 + Math.random() * 9000); // 4 dígitos
}