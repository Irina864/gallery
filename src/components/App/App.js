import Button from '../Button/Button';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import filterIcon from '../../images/icon-filter.png';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/imagesSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const { data, isLoading } = useSelector(({ images }) => images);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <header className="App__header">
        <Button theme="filter" src={filterIcon} alt="filter icon" />
      </header>
      <main className="App__main">
        {data.map(({ id, url }) => (
          <Card key={id} id={id} src={url} alt="cat image" />
        ))}
      </main>
    </div>
  );
}

export default App;
