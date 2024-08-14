import AuthProvider from "./context/authContex";
import Root from "./router/Root";

function App() {
  return (
    <>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}

export default App;
