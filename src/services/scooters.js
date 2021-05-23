import request from 'superagent';

const URL = process.env.REACT_APP_URL;

export const getScooters = async (lat, lng, token, brand) => {
  switch(brand){
    default: 
      return console.log('no brand');
    case 'lime':
      return await request
        .get(`${URL}/api/lime?lat=${lat}&lon=${lng}`)
        .set('Authorization', token);
    case 'nike':
      return await request
        .get(`${URL}/api/nike?lat=${lat}&lon=${lng}`)
        .set('Authorization', token);   
    case 'spin':
      return await request
        .get(`${URL}/api/spin?lat=${lat}&lon=${lng}`)
        .set('Authorization', token);
    case 'trimet':  
      return await request
        .get(`${URL}/api/trimet?lat=${lat}&lng=${lng}`)
        .set('Authorization', token)
    case 'bird':
      return await request
        .get(`${URL}/api/bird?lat=${lat}&lon=${lng}`)
        .set('Authorization', token)
    case 'bolt':
      return await request
        .get(`${URL}/api/bolt?lat=${lat}&lon=${lng}`)
        .set('Authorization', token)
  }
}

export const getFavorites = async (token) => {
  return await request.get(`${URL}/api/favorites`)
  .set('Authorization', token);
}

export const deleteFavorite = async (someId, token) => {
  await request.delete(`${URL}/api/favorites/${someId}`)
    .set('Authorization', token);
}

export const getLocation = async (location, token) => {
  return await request.get(`${URL}/api/location?search=${location}`)
            .set('Authorization', token);
}

export const addFavorite = async(faveName, lat, lng, location, token) => {
  await request.post(`${URL}/api/favorites`)
            .send({
                name: faveName,
                lat,
                lng,
                address: location,
            })
            .set('Authorization', token)
}
