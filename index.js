import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//http://localhost:5000/tweets

/*POST login, fazer login ("/sign-up")
POST enviar novos tweets ("/tweets/:username")
GET listar os tweets que já foram publicados (/"tweets")*/

const usuario = []; //Array de usuários do servidor
const tweets = []; //Array de tweets do servidor

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    return;
  }

  usuario.push({ username, avatar });
  res.status(201).send("Ok");
});

//===========INSERIR NOVO TWEET DENTRO DO ARRAY DE TWEETS==========
app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    return;
  }
  tweets.push({ username, tweet });
  res.status(201).send("Ok");
});

function pegarAvatar(tweet) {
  const avatar = usuario.find(
    (element) => element.username === tweet.username
  )?.avatar;

  return {
    ...tweet,
    avatar,
  };
}

//Retornar tweets que já foram publicados
app.get("/tweets", (req, res) => {  const ultimosTweets = tweets.slice(-10);
  res.send(ultimosTweets.map(pegarAvatar));
});

app.get("/tweets/:username", (req, res)=>{
  const { username } = req.params;
  const tweetsDoUsuario = tweets.filter(tweet => tweet.username===username)

  res.status(200).send(tweetsDoUsuario);
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000..."));
