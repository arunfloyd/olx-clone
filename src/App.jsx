import Body from "./components/Body";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <Body />
      </UserContextProvider>
    </>
  );
}

export default App;
