import React from 'react';

function Favorites({
  favorites,
  handleUseFavorite,
  handleDeleteClick
}) {
  return (
    <section className="fave-locations">
      <div className="faves-list">
        {favorites.map(favorite =>
            <div 
              className='location-list' 
              key={`${favorite.lat}${favorite.lng}`}>
                <p
                  className="pointer"
                  onClick={() => handleUseFavorite(favorite.lat,
                    favorite.lng,
                    favorite.address)}>{favorite.name}</p>
                <button 
                  onClick={() => handleDeleteClick(favorite.id)}>Delete
                </button>
            </div>
        )}
      </div>
  </section>
  );
}

export default Favorites;
