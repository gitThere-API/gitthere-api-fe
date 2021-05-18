import request from 'superagent';

const URL = process.env.REACT_APP_URL;

export const getLimeScooters = async (lat, lng, token) => {
  return await request
            .get(`${URL}/api/lime?lat=${lat}&lon=${lng}`)
            .set('Authorization', token)
}
