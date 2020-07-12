//////////////////////////////////////////
// Add all Javascript code to this file.
/////////////////////////////////////////

//API variables
const headLineurl = `https://accesscontrolalloworiginall.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`;
const techKotakuApi = `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/everything?domains=kotaku.com,thenextweb.com&apiKey=${APIKEY}`;
const dailyWtfUrl =
	'https://accesscontrolalloworiginall.herokuapp.com/http://thedailywtf.com/api/articles/recent';

// Select DOM elements variables
const article = document.querySelectorAll('article');
// const imageThumb = document.querySelector('.featuredImage img');
const $filter = $('#aritcleid');
console.log($filter);

// Select search and link to sources
const $sourceOne = $('li:eq( 1 )');
//console.log($sourceOne);
//$sourceOne.attr(techKotakuApi);

const $sourceTwo = $('li:eq( 2 )');
//$sourceTwo.text('Kotaku').addClass('highlight')
//console.log($sourceTwo);
const $sourceThree = $('li:eq( 3 )');
const $currentSource = $('li a');

console.log($currentSource);
//$currentSource.text("News.com");

const $header1 = $('header .container h1');
//console.log($header1);
// Search bar variables todo add search functionality
const searchIcon = document.querySelector('#search a');
const searchBox = document.querySelector('#search input');

// Show loader on launch function
function showLoader() {
	$(window).on('load', function () {
		$('#popUp').removeClass('hidden');
		$('#popUp a').hide();
	});
}

showLoader();
// // fetch headline data api Source One

fetchHead();

function fetchHead() {
	fetch(headLineurl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log(data);
			hideLoader(data);

			headlineDom(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
		});
}

// function to add headline data to the DOM
function headlineDom(data) {
	let articles = data.articles;

	for (let i = 0; i < articles.length; i++) {
		let content = data.articles[i].content;
		// console.log(content);
		let image = articles[i].urlToImage;
		let preview = articles[i].description;
		let title = articles[i].title;
		let count = Math.floor(Math.random() * 100) + ' comments';
		let link = articles[i].url;
		//hides template replace  with article layout
		$(article).attr('id', `template`);
		$('#template *').addClass('hidden');

		//    // console.log(content);
		// article layout variable
		let articleLayOut = `
    	<article id="article${i}" class="article">
    	    <section class="featuredImage">
    	       <img src=${image} alt="thumbnail" />
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

//function to hide the pop-up "X" to close pop up
const hidePop = function () {
	$('.closePopUp').on('click', function (event) {
		$('#popUp').addClass('loader hidden');
	});
};

// hide the loader when the page first loads
function hideLoader() {
	$('#popUp').addClass('hidden');
}
// Add click function for source one
$sourceOne.on('click', (error) => {
	error.preventDefault();
	$('#popUp').removeClass('hidden');
	$('#popUp a').hide();
	$('.article').remove();
	$('#main').load(fetchHead());
});

// // Source Two click function-----------------Source  Two
$sourceTwo.on('click', (error) => {
	error.preventDefault();
	$('#popUp').removeClass('hidden');
	$('#popUp a').hide();
	$('.article').remove();

	// techKotakuApi fetch Kotaku data

	fetch(techKotakuApi)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			kotakuDom(data);
			hideLoader(data);
			//console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});

	// function to add Kotaku data to the DOM
	function kotakuDom(data) {
		let articles = data.articles;

		for (let i = 0; i < articles.length; i++) {
			let content = data.articles[i].content;

			let image = articles[i].urlToImage;
			let preview = articles[i].description;
			let title = articles[i].title;
			let count = Math.floor(Math.random() * 100) + ' comments';
			let link = articles[i].url;

			//     // console.log(content);
			// article layout variable string
			let articleLayOut = `
    	<article id="article${i}" class="article">
    	    <section class="featuredImage">
    	       <img src=${image} alt="thumbnail" />
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

			// open pop up with link to Kotaku news  source
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
});

//------------------------- Source three Daily news

$sourceThree.on('click', (error) => {
	error.preventDefault();
	$('#popUp').removeClass('hidden');
	$('#popUp a').hide();
	$('.article').remove();

	// fetch Daily news

	fetch(dailyWtfUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log(data);
			hideLoader(data);
			dailyWTF(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
		});

	// functiom to add Daily news data and article layout
	function dailyWTF(data) {
		let dailyArt = data.id;
		for (let i = 0; i < data.length; i++) {
			let dailyArt = data[i].BodyHtml;
			//console.log(dailyArt);
			let dailyPreview = data[i].SummaryHtml;
			//console.log(dailyPreview);
			let dailyTitle = data[i].Title;
			//console.log(dailyTitle);
			let dailyCount = data[i].CachedCommentCount;
			//console.log(dailyCount);
			let authorImage = data[i].Author.ImageUrl;
			//console.log(authorImage);
			let dailyLink = data[i].Url;
			//console.log(dailyLink);

			// 		// fix hash tags on layout todo

			let articleLayOut = `
      <article id="dailyArt${i}" class="article">
          <section class="featuredImage"> 
            <img src=${authorImage} alt="thumbnail" />
          </section>
          <section class="articleContent">
            <a href="#" id="title"><h3>${dailyTitle}</h3></a> 
            <h6>${dailyPreview}</h6>
          </section>   
          <section class="impressions">${dailyCount}
    	    </section><div class="clearfix"></div>
    	</article>`;

			$('#main').append(articleLayOut);

			//open pop up with link to news source
			$('#dailyArt' + i).on('click', function (event) {
				$('#popUp .container').show();
				event.preventDefault();
				$('#popUp a').show();
				$('#popUp').removeClass('loader hidden');

				$('#popUp .container h1').text(dailyTitle);
				$('#popUp p').text(dailyPreview);

				$('.popUpAction').text('Read more from Daily');
				$('.popUpAction').attr('href', dailyLink);
			});
		}
	}
});

//Feedr button functionality
$header1.on('click', (error) => {
	error.preventDefault();
	$('.article').remove();
	$('#main').load(fetchHead());
});

//Search in progress
$('#search a').on('click', (error) => {
	$('#search').toggleClass('active');
});
