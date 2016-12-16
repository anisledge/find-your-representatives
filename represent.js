$("document").ready(function() {
	$("#rep-lookup").submit(function(e) {
		e.preventDefault();
		
		var $results = $('#rep-lookup-results');
		var zipcode = $('#txt-zip').val();
		var heyhey = "f920b249b7774a4785ff75cf78188bb2";
		
		//collect the data
		var requestURL = 'http://congress.api.sunlightfoundation.com/legislators/locate?callback=?';
		
		$.getJSON(requestURL, {
			'apikey': heyhey,
			'zip' : zipcode,
		}, function(data) {
			if (data.results && data.results.length > 0) {
				var mySenators = '<p>Here are your Senators:</p>';
				
				$.each(data.results, function(i, rep) {
					if ('senate' === rep.chamber.toLowerCase()) {
						mySenators += '<p>';
						mySenators += '<a href="' + rep.contact_form + '" target="_blank">';
						mySenators += rep.first_name + ' ' + rep.last_name;
						mySenators += '</a>';
						mySenators += '</p>';
					}
				});
				
				mySenators += '<p>Please write to them in support of this legislation.</p>';
				
				$results.html(mySenators);
			} else {
				$results.html('<p>No senators found for zip code ' + zipCode + '. Please try again.');
			}
		});
	});
});