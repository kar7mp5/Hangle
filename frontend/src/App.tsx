import './styles/App.scss'

function App() {

  return (
    <>
      <div className="title">
        2024 DACON LLM MODEL
      </div>
      <div className="nav_container">
        <form action="">
          <input className="summit_input" type="text" placeholder="Enter the prompt"/>
          <button className="summit_btn">Summit</button>
        </form>
      </div>
    </>
  )
}

export default App
