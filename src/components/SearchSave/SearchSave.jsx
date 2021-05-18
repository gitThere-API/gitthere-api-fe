import React from 'react';

function SearchSave({
  handleSubmit,
  location,
  updateLocation,
  enteredLocation,
  handleFavoriteClick
}) {
  return (
    <section className="submit-location">
      <form onSubmit={handleSubmit}>
          <label>Search Location<br />
              <input className="location-search"
                  required
                  value={location}
                  onChange={updateLocation}
              />
          </label>
          <button>Submit location</button>
      </form>
      <div className="current-location">Current location: <br></br> <span>{enteredLocation}</span>
          <br></br>
          <button onClick={handleFavoriteClick}>Save current location</button>
      </div>
    </section>
  );
}

export default SearchSave;
