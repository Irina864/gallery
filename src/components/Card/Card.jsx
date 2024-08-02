import Button from '../Button/Button';
import likeIcon from '../../images/icon-like.png';
import deleteIcon from '../../images/icon-delete.png';
import './Card.css';

function Card({ id, src, alt }) {
  return (
    <div className="card">
      <div className="card__imageWrap">
        <img className="card__image" src={src} alt={alt} />
        <div className="card__buttons">
          <Button theme="delete" src={deleteIcon} alt="delete icon" />
          <Button theme="like" src={likeIcon} alt="like icon" />
        </div>
      </div>
      <div className="card__text">
        <a
          className="card__link"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Image link
        </a>
      </div>
    </div>
  );
}

export default Card;
