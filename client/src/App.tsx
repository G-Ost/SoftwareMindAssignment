import MainContentContainer from "./components/TabsContainer";
import worldMapImage from "./assets/worldMapImage.jpg";

function App() {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${worldMapImage})` }}
    >
      <MainContentContainer />
    </div>
  );
}

export default App;
