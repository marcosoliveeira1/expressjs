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
  console.log("getting order" + req.params.id);
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
    

    const exist = orders.find(order => order.id == req.params.id);
    console.log({ exist });
    if(!exist) {
        setTimeout(() => {
            orders.push({id: req.params.id, status: 10});
            console.log("added:"+req.params.id, orders);
        }, 30000);
    }

    if(exist){
      response.data.data.usuarioEntregador = {
        email: "joaobcrts@gmail.com",
        nome: "Joao Cortes ",
        ddd: "11",
        telefone: "11984112730",
        telefoneFormatado: "(1111) 98411-2730",
      };
      response.data.data.situacao = exist.situacao;
      if(exist.situacao != 30) {
          setTimeout(() => {
            exist.situacao = exist.situacao + 10;
            console.log("updating status:"+req.params.id, exist);
          }, 30000);
        }
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
