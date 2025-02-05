require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Para processar JSON no corpo da requisição

app.post("/enviar-email", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Preencha os campos obrigatórios!" });
  }

  // Configuração do serviço de e-mail (exemplo: Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASS, // Sua senha ou App Password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Nova mensagem do formulário de contato",
    text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone || "Não informado"}\nMensagem:\n${mensagem}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: "E-mail enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar o e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
