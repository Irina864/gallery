import Button from '../Button/Button';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import filterIcon from '../../images/icon-filter.png';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavourites,
  getData,
  getFavourites,
} from '../../store/imagesSlice';
import { useState, useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getFavourites());
  }, [dispatch]);

  const { data, isLoading, favourites } = useSelector(({ images }) => images);

  const [showFavoirites, setShowFavoirites] = useState(false);
  const handleFilter = () => {
    setShowFavoirites(!showFavoirites);
  };

  const handleDeleteFavourite = (favouriteId) => {
    dispatch(deleteFavourites(favouriteId))
      .unwrap()
      .then(() => {
        dispatch(getFavourites());
      })
      .catch((error) => {
        console.log(error);
      });
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
          ? favourites.map((favourite) => (
              <Card
                key={favourite.id}
                id={favourite.id}
                src={favourite.image.url}
                alt="fav cat image"
                onDelete={() => handleDeleteFavourite(favourite.id)}
              />
            ))
          : data.map(({ id, url }) => (
              <Card key={id} id={id} src={url} alt="cat image" />
            ))}
      </main>
    </div>
  );
}

export default App;
