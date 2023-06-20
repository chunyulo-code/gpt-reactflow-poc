import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
// import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import { colors, device } from "./constant";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Reset /> */}
      <GlobalStyle />
      <ThemeProvider theme={{ colors, device }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  #root {
    padding-left: 300px;
      
    @media screen and (max-width: 414px) {
      padding-left:0px;
      padding-top: 68px;
    }
  }
`;
