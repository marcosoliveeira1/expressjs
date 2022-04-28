const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3333;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const orders = [];
orders.push({
  id: 979197,
  situacao: 30,
});

const instance = axios.create({
  baseURL: "https://hm-backendentregas.mottu.dev/api/",
  timeout: 1000,
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

    const exist = orders.find((order) => order.id == req.params.id);
    if (exist) {
      response.data.data.usuarioEntregador = {
        email: "joaobcrts@gmail.com",
        nome: "João Cortes ",
        ddd: "11",
        telefone: "11984112730",
        telefoneFormatado: "(1111) 98411-2730",
      };
      response.data.data.situacao = exist.situacao ?? 0;
    }

    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("*", async (req, res) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const authorization = req.headers.authorization;
    if (authorization) headers.Authorization = authorization;

    const response = await axios.get(
      `https://hm-backendentregas.mottu.dev/api/${req.path}`,
      {headers}
    );
    response.data.teste = "teste";
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("*", async (req, res) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const authorization = req.headers.authorization;
  if (authorization) headers.Authorization = authorization;

  try {
    const response = await axios.post(
      `https://hm-backendentregas.mottu.dev/api/${req.path}`,
      { ...req.body },
      { headers }
    );
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
