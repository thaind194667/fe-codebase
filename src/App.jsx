import Router from "@/routes";

function App() {

  localStorage.setItem("role", "user");
  return (
    <Router />
  );
}

export default App;
