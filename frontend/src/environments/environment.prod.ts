// in production, this will make server calls based on the url of the angular project
// we are going to reverse proxy to make sure the requests are being made to
// the noder server application

// blank will make the api calls go to http://localhost:4200/api/v1/hobbies
// Therefore, I will set up a proxy in nginx
export const environment = {
  production: true,
  url: ''
};
