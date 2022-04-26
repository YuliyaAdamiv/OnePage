import './App.scss';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import WaitingForGetRequest from './components/WaitingForGetRequest/WaitingForGetRequest';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Header />
      <MainSection name="Sign up" />
      <WaitingForGetRequest />
      <Form />
    </div>
  );
}

export default App;
