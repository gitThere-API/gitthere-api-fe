import request from 'superagent';

const URL = process.env.REACT_APP_URL;

export const getScooters = async (lat, lng, token, brand) => {
  switch(brand){
    default: 
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
  }
}
