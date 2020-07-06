//////////////////////////////////////////
// Add all Javascript code to this file.
/////////////////////////////////////////

//API variables
const headLineurl = `https://accesscontrolalloworiginall.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`;
const techKotakuApi = `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/everything?domains=kotaku.com,thenextweb.com&apiKey=${APIKEY}`;
const dailyWtfUrl =
  'https://accesscontrolalloworiginall.herokuapp.com/http://thedailywtf.com/api/articles/recent/15';

// Select DOM elements variables
const article = document.querySelectorAll('article');
const imageThumb = document.querySelector('.featuredImage img');
const title = document.querySelector('.articleContent a h3');
const impressions = document.querySelector('.impressions');
const subTitle = document.querySelector('.articleContent h6');

//console.log(article);
// console.log(imageThumb);
// console.log(title);
// console.log(impressions);
// console.log(subTitle);

const $sourceOne = $('li:eq( 1 )');
//console.log($sourceOne);
$sourceOne.attr(techKotakuApi);

const $sourceTwo = $('li:eq( 2 )');
//$sourceTwo.text('Tech')
//console.log($sourceTwo);
const $sourceThree = $('li:eq( 3 )');
const currentSource = document.querySelector('#currentSource');

const header1 = document.querySelector('header .container h1');

// Search bar variables
const searchIcon = document.querySelector('#search a');
const searchBox = document.querySelector('#search input');

// //Show loader on launch
$(window).on('load', function () {
  $('#popUp').removeClass('hidden');
  $('#popUp a').hide();
});

// // fetch headline data api Source One

fetch(headLineurl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    //console.log(data);
    headlineDom(data);
    return data;
  })
  .then(function (data) {
    // console.log(data);
    hideLoader(data);
    return data;
  })
  .catch((error) => {
    console.log(error);
  });

function headlineDom(data) {
  let articles = data.articles;

  for (let i = 0; i < articles.length; i++) {
    let content = data.articles[i].content;
    // console.log(content);
    let image = articles[i].urlToImage;
    let preview = articles[i].description;
    let title = articles[i].title;
    let count = Math.floor(Math.random() * 100);
    let link = articles[i].url;
    $(article).attr('id', `template`);
    $('#template *').addClass('hidden');

    //    // console.log(content);
    let articleLayOut = `
    	<article id="article${i}" class="article">
    	    <section class="featuredImage">
    	       <img src=${image} alt="" />
    	    </section>
    	    <section class="articleContent">
    	         <a href="#" id="title"><h3>${title}</h3></a>
    	         <h6>${preview}</h6>
    	    </section>
    	    <section class="impressions">
    	         ${count}
    	    </section>
    	    <div class="clearfix"></div>
    	</article>
    `;

    $('#main').append(articleLayOut);

    // open pop up with link to news source

    $('#article' + i).on('click', function (event) {
      $('#popUp .container').show();
      event.preventDefault();
      $('#popUp a').show();
      $('#popUp').removeClass('loader hidden');

      $('#popUp .container h1').text(title);
      $('#popUp p').text(content);

      $('.popUpAction').text('Read more from News');
      $('.popUpAction').attr('href', link);
    });

    hidePop();
  }
}

//hide the pop-up selects "X"
const hidePop = function () {
  $('.closePopUp').on('click', function (event) {
    $('#popUp').addClass('loader hidden');
  });
};

// hide the loader
function hideLoader() {
  $('#popUp').addClass('hidden');
}

// // Source Two click function-----------------Source  Two
$sourceTwo.on('click', (error) => {
  error.preventDefault();
  $('.article').remove();
  //$sourceOne.text('Kotaku.com');
  // techKotakuApi

  fetch(techKotakuApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      kotakuDom(data);
      //console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  function kotakuDom(data) {
    let articles = data.articles;

    for (let i = 0; i < articles.length; i++) {
      let content = data.articles[i].content;

      let image = articles[i].urlToImage;
      let preview = articles[i].description;
      let title = articles[i].title;
      let count = Math.floor(Math.random() * 100);
      let link = articles[i].url;

      //     // console.log(content);
      let articleLayOut = `
    	<article id="article${i}" class="article">
    	    <section class="featuredImage">
    	       <img src=${image} alt="" />
    	    </section>
    	    <section class="articleContent">
    	         <a href="#" id="title"><h3>${title}</h3></a>
    	         <h6>${preview}</h6>
    	    </section>
    	    <section class="impressions">
    	         ${count}
    	    </section>
    	    <div class="clearfix"></div>
    	</article>
    `;

      $('#main').append(articleLayOut);

      // open pop up with link to news source
      $('#article' + i).on('click', function (event) {
        $('#popUp .container').show();
        event.preventDefault();
        $('#popUp a').show();
        $('#popUp').removeClass('loader hidden');

        $('#popUp .container h1').text(title);
        $('#popUp p').text(content);

        $('.popUpAction').text('Read more from Kotaku');
        $('.popUpAction').attr('href', link);
      });

      hidePop();
    }
  }

  //hide the pop-up selects "X"
  const hidePop = function () {
    $('.closePopUp').on('click', function (event) {
      $('#popUp').addClass('loader hidden');
    });
  };

  // hide the loader
  function hideLoader() {
    $('#popUp').addClass('hidden');
  }
});

//------------------------- Source three

$sourceThree.on('click', (error) => {
  error.preventDefault();
  $('.article').remove();
  //$sourceOne.text('Kotaku.com');
  // techKotakuApi

  fetch(dailyWtfUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dailyWTF(data);
      return data;
    })
    .then(function (data) {
      console.log(data);
      hideLoader(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  function dailyWTF(data) {
    let dailyArt = data.id;
    for (let i = 0; i < data.length; i++) {
      let article = data[i].BodyHtml;
      //console.log(article);
      let dailyPreview = data[i].SummaryHtml;
      // console.log(preview);
      let author = data[i].Author.ShortDescription;
      console.log(author);
      let dailyCount = data[i].CachedCommentCount;
      //console.log(count);
      let authorImage = data[i].Author.ImageUrl;
      console.log(authorImage);
      let link = data[i].Url;

      let articleLayOut = `
//     	<article id="dailyArt" class="article">
//     	    <section class="featuredImage">
//     	       <img src=${authorImage} alt="" />
//     	    </section>
//     	    <section class="articleContent">
//     	         <a href="#" id="title"><h3>${author}</h3></a>
//     	         <h6>${dailyPreview}</h6>
//     	    </section>
//     	    <section class="impressions">
//     	         ${dailyCount}
//     	    </section>
//     	    <div class="clearfix"></div>
//     	</article>
//     `;

      $('#main').append(articleLayOut);
      //open pop up with link to news source
      $('article' + i).on('click', function (event) {
        $('#popUp .container').show();
        event.preventDefault();
        $('#popUp a').show();
        $('#popUp').removeClass('loader hidden');

        $('#popUp .container h1').text(title);
        $('#popUp p').text(content);

        $('.popUpAction').text('Read more from Daily');
        $('.popUpAction').attr('href', link);
      });
    }
  }
});
