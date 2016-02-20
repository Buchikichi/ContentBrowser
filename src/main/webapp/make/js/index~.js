/**
 * index.js
 */
$(document).ready(function() {
	prepare();
});
function prepare() {
	var uploadArea = $('#uploadArea');
	var form = $('form');

	$.ajax('/prepare', {
		'success': function(rec) {
			console.log('url:' + rec.url);
			form.attr('action', rec.url);
			uploadArea.show('fast');
		}
	});
}
