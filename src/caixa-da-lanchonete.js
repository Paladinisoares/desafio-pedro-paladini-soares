const cardapio = {
  cafe: 3,
  chantily: 1.5,
  suco: 6.2,
  sanduiche: 6.5,
  queijo: 2,
  salgado: 7.25,
  combo1: 9.5,
  combo2: 7.5,
};

const formasPagamento = ["dinheiro", "debito", "credito"];

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (!formasPagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const produtos = [];
    const quantidadeProdutos = [];

    itens.forEach((item) => {
      const [produto, quantidade] = item.split(",");
      produtos.push(produto);
      quantidadeProdutos.push(quantidade);
    });

    const itensInvalidos = produtos.filter((produto) => !cardapio[produto]);

    if (itensInvalidos.length > 0) {
      return "Item inválido!";
    }

    if (quantidadeProdutos.includes("0")) {
      return "Quantidade inválida!";
    }

    if (
      (produtos.includes("chantily") && !produtos.includes("cafe")) ||
      (produtos.includes("queijo") && !produtos.includes("sanduiche"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    const valores = itens.map((item) => {
      const [produto, quantidade] = item.split(",");
      return cardapio[produto] * quantidade;
    });

    const valorSemTaxa = valores.reduce((acc, valor) => acc + valor);

    let valorFinal = valorSemTaxa;
    if (metodoDePagamento === "dinheiro") {
      valorFinal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      valorFinal *= 1.03;
    }

    return `R$ ${valorFinal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
