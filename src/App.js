import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import WaitingForGetRequest from './components/WaitingForGetRequest/WaitingForGetRequest';
import Form from './components/Form/Form';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  console.log(post);
  const addPost = () => {
    dispatch({type: 'ADD_CARD', payload: true});
    console.log(post);
  };
  return (
    <div className="App">
      <Header />
      <MainSection name="Sign up" />
      <WaitingForGetRequest post={post} />
      <Form />
      <button onClick={() => addPost()}>Send</button>
    </div>
  );
}

export default App;
