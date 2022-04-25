const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3333;


app.use(express.json());

app.use(cors({
    origin: '*'
}));
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

const orders = [];

const instance = axios.create({
  baseURL: "https://hm-backendentregas.mottu.dev/api/",
  timeout: 1000,
});

app.post("//Integracoes/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://hm-backendentregas.mottu.dev/api/Integracoes/login",
      {
        ...req.body,
      }
    );
    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
      console.log(error);
      res.json(error);
  }
});
app.post("/Integracoes/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://hm-backendentregas.mottu.dev/api/Integracoes/login",
      {
        ...req.body,
      }
    );
    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
      console.log(error);
      res.json(error);
  }
});

app.get("/Integracoes/usuario/filial", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hm-backendentregas.mottu.dev/api/Integracoes/usuario/filial",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      }
    );
    response.data.teste = "teste";

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/pedido", async (req, res) => {
  try {
    const response = await axios.post(
      `https://hm-backendentregas.mottu.dev/api/pedido/`,
      { ...req.body },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      }
    );

    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("/pedido/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://hm-backendentregas.mottu.dev/api/pedido/${req.params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      }
    );
    

    const exist = orders.find(order => order == req.params.id);

    if(!exist) {
        setTimeout(() => {
            orders.push(req.params.id);
            console.log("added:"+req.params.id, orders);
        }, 30000);
    }

    if(exist){
        response.data.data.usuarioEntregador = {
            id: 196392,
            perfilId: 1,
            email: "joaobcrts@gmail.com",
            nome: "Joao Bicudo Cortes ",
            cpf: "40685597830",
            ddd: "11",
            telefone: "11984112730",
            telefoneFormatado: "(1111) 98411-2730",
            latitude: -23.550373,
            longitude: -46.696232,
          };
    }

    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
