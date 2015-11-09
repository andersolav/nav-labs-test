window.NAVLAB = (function() {

	// SOCIAL MEDIA
	var openWindow = function(e) {

		if(e && e.preventDefault) {
			e.preventDefault()
		}

		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;

	    var width  = 575,
	        height = 400,
	        left   = (windowWidth  - width)  / 2,
	        top    = (windowHeight - height) / 2,
	        url    = this.href,
	        title  = this.innerHTML, 
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;
	    
	    window.open(url, title, opts);		
	};	

	var socialMediaElements = document.getElementsByClassName("js-share");

	for(var i = 0; i < socialMediaElements.length; i++) {
		socialMediaElements[i].addEventListener("click", openWindow);
	}


	// NEWSLETTER

	var NewsletterSubscribeForm = function(domEl) {
		var contentOfInterestField = domEl.getElementsByClassName("js-content-of-interest")[0];
		var emailField = domEl.getElementsByClassName("js-newsletter-email")[0];

		var displayConfirmation = function(res) {
			domEl.innerHTML = "<div class='newsletter-message'><h3 class='omega'>" + res.title + "</h3><p>" + res.message + "</p></div>";
			domEl.style.opacity = 1; 
		};

		domEl.addEventListener("submit", function(e) {
			e.preventDefault();
			var data = {
				email: emailField.value
			}
			if(contentOfInterestField && contentOfInterestField.value) {
				data.contentOfInterest = contentOfInterestField.value;
			}
			ajax.post(domEl.action, data, function(res) {
				var res = JSON.parse(res);
				domEl.addEventListener(getTransitionEvent(), function() {
					displayConfirmation(res);
				});
				domEl.style.opacity = 0; 
			});
		});
	};

	var forms = document.getElementsByClassName("js-newsletter-form");
	for(var a = 0; a < forms.length; a++) {
		new NewsletterSubscribeForm(forms[a]);
	}



	// UTILS

	function getTransitionEvent() {
	    var t;
	    var el = document.createElement('fakeelement');
	    var transitions = {
	      'transition':'transitionend',
	      'OTransition':'oTransitionEnd',
	      'MozTransition':'transitionend',
	      'WebkitTransition':'webkitTransitionEnd'
	    }

	    for(t in transitions){
	        if( el.style[t] !== undefined ){
	            return transitions[t];
	        }
	    }
	}

	var ajax = {};
	ajax.x = function() {
	    if (typeof XMLHttpRequest !== 'undefined') {
	        return new XMLHttpRequest();  
	    }
	    var versions = [
	        "MSXML2.XmlHttp.6.0",
	        "MSXML2.XmlHttp.5.0",   
	        "MSXML2.XmlHttp.4.0",  
	        "MSXML2.XmlHttp.3.0",   
	        "MSXML2.XmlHttp.2.0",  
	        "Microsoft.XmlHttp"
	    ];

	    var xhr;
	    for(var i = 0; i < versions.length; i++) {  
	        try {  
	            xhr = new ActiveXObject(versions[i]);  
	            break;  
	        } catch (e) {
	        }  
	    }
	    return xhr;
	};

	ajax.send = function(url, callback, method, data, sync) {
	    var x = ajax.x();
	    x.open(method, url, sync);
	    x.onreadystatechange = function() {
	        if (x.readyState == 4) {
	            callback(x.responseText)
	        }
	    };
	    if (method == 'POST') {
	        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    }
	    x.send(data)
	};

	ajax.get = function(url, data, callback, sync) {
	    var query = [];
	    for (var key in data) {
	        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	    }
	    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, sync)
	};

	ajax.post = function(url, data, callback, sync) {
	    var query = [];
	    for (var key in data) {
	        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	    }
	    ajax.send(url, callback, 'POST', query.join('&'), sync)
	};

	return {
		ajax: ajax
	};

})(); 