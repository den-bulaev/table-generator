import MainTable from "./features/MainTable/MainTable";

import logo from "./assets/memCrabLogo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="https://memcrab.com" target="_blank">
          <img src={logo} alt="logo" />
        </a>
      </header>
      <main className="App-main-content">
        <MainTable />
      </main>
    </div>
  );
}

export default App;
