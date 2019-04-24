let content;

$(document).ready(function() {
	// load content of the page to show foods
	content = document.getElementsByClassName('Content')[0];
	$('.topnav').load('./Views/Topnav.html', () => {
		// Auto select search when typing
		$(document).keypress(() => {
			$('#search').focus();
		});

		// See if there is a content or redirect to index
		$('#search').focus(() => {
			if ($('.Content').length == 0) $(location).attr('href', '/');
		});

		// Send Request for search value and show it
		$('#search').keypress(event => {
			// Check if the key pressed is ENTER
			if (event.keyCode === 13) {
				event.preventDefault();
				// Make a get request using AJAX
				$.get('/foods/name/' + $('#search').val(), resp => {
					ShowResult(resp);
				});
			}
		});

		// Request account name and Display it (ex Name="Malo")
		// Display the logout link
		GetAccountName(Name => {
			$('#AccountLink').text(Name);
			$('.topnav').append(
				'<a href="/Logout" style="float:right">Logout</a>'
			);
		});
	});
});

function ShowResult(json) {
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	for (let i = 0; i < json.length; i++) {
		const divCard = document.createElement('div');
		divCard.setAttribute('class', 'Card');
		divCard.setAttribute('idFoods', json[i].idFoods);

		const img = document.createElement('img');
		img.setAttribute('src', json[i].ImageLink);
		divCard.appendChild(img);

		const p = document.createElement('p');
		p.innerHTML = json[i].Name;
		divCard.appendChild(p);
		content.appendChild(divCard);
		//Setup Event When a card is clicked
		$('div[idFoods=' + json[i].idFoods + ']').click(function() {
			OnCardClick($(this).attr('idFoods'));
		});
	}
}

function OnCardClick(IDFood) {
	$(location).attr('href', '/food/' + IDFood);
}
