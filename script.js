/* ******************************************

API: https://pl.wikipedia.org/w/api.php

Search request:
https://pl.wikipedia.org/w/api.php?action=opensearch&search={________}&format=json

To overcome CORS error, add http://crossorigin.me/ to the beginning of the API request URL

****************************************** */


var searchOpened = false;


$(document).ready(function () {

	// when magnifier is clicked
	$('#searchDiv').on('click', function(){
		if (!searchOpened) {
			// clear search input
			$('#searchInput').val('');
			
			// hide magnifier handle
			$('#searchDivHandle').css('width', '0px');
			$('#searchDivHandle').css('transition', 'width 0.3s');
			
			// expand search area
			$('#searchDiv').css('width', '250px');
			$('#searchDiv').css('transition', 'width 0.3s');
			$('#searchDiv').css('transition-delay', '0.3s');
			
			// when search area is expanded
			setTimeout(function(){
				// show "X" symbol area
				$('#closeSearchDiv').css('display', 'block');
			
				// add input for entering text
				$('#searchInput').css('width', '190px');
				$('#searchInput').css('display', 'block');
				$('#searchInput').focus();
			
				// animate 1st element of "X" symbol
				$('#closeSearchDivElement1').css({
					'top': '4px',
					'right': '3px',
					'height': '11px'
				});
				$('#closeSearchDivElement1').css('transition', 'all 0.15s');
				
				// animate 2nd element of "X" symbol
				$('#closeSearchDivElement2').css({
					'bottom': '4px',
					'right': '3px',
					'height': '11px'
				});
				$('#closeSearchDivElement2').css('transition', 'all 0.15s');
				$('#closeSearchDivElement2').css('transition-delay', '0.15s');
				
				searchOpened = true;
			}, 600);
		}
	});
	
	
	// when "X" symbol is clicked
	$('#closeSearchDiv').on('click', function(){
		// animate 2nd element of "X" symbol
		$('#closeSearchDivElement2').css({
			'bottom': '-4px',
			'right': '-5px',
			'height': '0px'
		});
		$('#closeSearchDivElement2').css('transition', 'all 0.15s');
		
		// animate 1st element of "X" symbol
		$('#closeSearchDivElement1').css({
			'top': '-4px',
			'right': '-5px',
			'height': '0px'
		});
		$('#closeSearchDivElement1').css('transition', 'all 0.15s');
		$('#closeSearchDivElement1').css('transition-delay', '0.15s');
		
		// hide input for entering text
		$('#searchInput').css('width', '0px');
		$('#searchInput').css('display', 'none');
		
		// when "X" animation is completed
		setTimeout(function(){
			// hide the "X" symbol area
			$('#closeSearchDiv').css('display', 'none');
			
			// shrink search area (to make it look like a circle)
			$('#searchDiv').css('width', '45px');
			$('#searchDiv').css('transition', 'width 0.3s');
			
			// show magnifier handle
			$('#searchDivHandle').css('width', '20px');
			$('#searchDivHandle').css('transition', 'width 0.3s');
			$('#searchDivHandle').css('transition-delay', '0.3s');
			
			// move search box to the middle of the screen if needed
			$('#mainBox').css('margin-top', '250px');
			$('#mainBox').css('transition', 'all 0.3s');
			$('#mainBox').css('transition-delay', '0.3s');
			$('#mainBox').css('transition-timing-function', 'linear');
			
			// clear the search results area
			$('#searchResults').html('');
			
			searchOpened = false;
		}, 300);
	});
	
	
	// when Enter in the search box is pressed
	$('#searchInput').keypress(function(e){
		if(e.which === 13){
			
			// prepare API url
			var apiUrl = 'http://crossorigin.me/https://pl.wikipedia.org/w/api.php?action=opensearch&search=' + $('#searchInput').val() + '&format=json';
			
			// get JSON response from Wikipedia API
			$.getJSON(apiUrl, function(json){
				
				// how much results for that search (max. 10)
				var resultsCount = json[1].length;
				
				// display results in panels
				if (resultsCount > 0) {
					var resultsContent = '';
					for (var i = 0; i < resultsCount; i++){
						resultsContent += '<div class="resultPanel">' +
						'<a href="' + json[3][i] + '" target="_blank">' + 
							'<p>' + json[1][i] + '</p>' +
							'<p>' + json[2][i] + '</p>' +
						'</a>' +
						'<div class="leftBorderDiv"></div>' +
						'</div>';
					}
					$('#searchResults').html(resultsContent);
				} else { // or show that no results were found for that search
					$('#searchResults').html('<div id="noResultsDiv">No results found</div>');
				}
				
				// move the search box to the top of the screen
				$('#mainBox').css('margin-top', '15px');
				$('#mainBox').css('transition', 'all 0.3s');
				$('#mainBox').css('transition-timing-function', 'linear');
			});
		}
	});
	
});