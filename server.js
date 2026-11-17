import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

function saudacaoAssincrona(nome) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Olá, ${nome}! Bem-vindo ao Mensageiro Local.`);
    }, 2000); 
  });
}

function obterMensagemPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
    
        return reject(new Error("ID inválido: deve ser maior que zero"));
      } else {
    
        resolve({ id: id, texto: "Mensagem do laboratório" });
      }
    }, 1000); 
  });
}

app.get("/", (req, res) => {
  res.send("Servidor da Sprint 03 rodando com sucesso!");
});

app.get("/saudacao-then", (req, res) => {
  saudacaoAssincrona("Seu Nome")
    .then((mensagem) => {
      res.send(mensagem);
    });
});


app.get("/mensagem-invalida-then", (req, res) => {
  obterMensagemPorId(-5) 
    .then((msg) => {
      res.json(msg);
    })
    .catch((erro) => {
      console.error("Erro capturado no catch:", erro.message);
      res.status(500).json({ erro: erro.message });
    });
});

app.get("/saudacao-async", async (req, res) => {
  try {
    const mensagem = await saudacaoAssincrona("Aluno do Futuro");
    res.send(mensagem);
  } catch (erro) {
    res.status(500).json({ erro: "Falha na saudação" });
  }
});
app.get("/mensagem-erro-async", async (req, res) => {
  try {
    const msg = await obterMensagemPorId(-10); // Forçando erro
    res.json(msg);
  } catch (erro) {
    console.error("Erro capturado no bloco catch:", erro.message);
    res.status(500).json({ erro: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});