//////////////////////////////////////////
// Add all Javascript code to this file.
/////////////////////////////////////////

const url = `https://accesscontrolalloworiginall.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`;
const techCrunchApi = `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${APIKEY}`;
const dailyWtfUrl = 'https://accesscontrolalloworiginall.herokuapp.com/http://thedailywtf.com/api/articles/recent/15';

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // console.log(data.articles.length);
    // let title = data.articles[2].title;
    // console.log(title);
    // for (let i = 0; i < data.articles.length; i++) {
    //   let content = data.articles[i];
    //   console.log(content.description);
    // }
    // let elon = data.articles[6];
    // console.log(elon);
  })
  .catch((error) => {
    console.log(error);
  });

fetch(dailyWtfUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

fetch(techCrunchApi)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
