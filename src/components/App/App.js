import Button from '../Button/Button';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import filterIcon from '../../images/icon-filter.png';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/imagesSlice';
import { useState, useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const { data, isLoading, favourites } = useSelector(({ images }) => images);

  const [showFavoirites, setShowFavoirites] = useState(false);
  const handleFilter = () => {
    setShowFavoirites(!showFavoirites);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <header className="App__header">
        <Button
          theme={showFavoirites ? 'filter active' : 'filter'}
          src={filterIcon}
          alt="filter icon"
          onClick={handleFilter}
        />
      </header>
      <main className="App__main">
        {showFavoirites
          ? favourites.map(({ id, src }) => (
              <Card key={id} id={id} src={src} alt="fav cat image" />
            ))
          : data.map(({ id, url }) => (
              <Card key={id} id={id} src={url} alt="cat image" />
            ))}
      </main>
    </div>
  );
}

export default App;
