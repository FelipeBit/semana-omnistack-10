import React, { useEffect, useState } from "react";
import "./global.css";
import "./App.css";
import "./SideBar.css";
import "./Main.css";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

// Propriedade: parametros passados para os componentes
// Estado: informações mantidas pelo componente (imutabillidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);

    console.log(response.data);
  }

  //É aciona conforme valor passado no vetor

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((
            dev // parentes = retorno, chave = corpo
          ) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

/*
class App extends Component {
  render() {
    return (
      <Header title="Hello World" />
    );
  }
}
*/

export default App;
