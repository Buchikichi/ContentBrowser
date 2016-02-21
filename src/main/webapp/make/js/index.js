$(document).ready(function() {
	var body = $('body');
	var picture = $('#picture');
	var field = new Field();

	// Page1: #trim
	picture.change(function() {
		var file = this.files[0];
		var reader = new FileReader();
		var type = file.type;

		//console.log('type:' + type);
		if (type.indexOf('image') != 0) {
			alert('画像を選択してください。');
			return;
		}
		reader.onload = function(e) {
			field.setupImage(e.target.result);
			field.draw();
		};
		reader.readAsDataURL(file);
		resetTrimmingParams(field);
		$(':mobile-pagecontainer').pagecontainer('change', '#trim');
	});

	// Page2: #trim
	initTrimmingPage(field);
	$('#finishButton').click(function() {
		var cardImage = $('#cardImage');
		var imgsrc = field.getCanvasImage();

		cardImage.attr('src', imgsrc);
		$(':mobile-pagecontainer').pagecontainer('change', '#finish');
	});

	// Page changing.
	$(document).on("pagecontainerbeforeshow", function(e, d) {
		var id = d.toPage.attr('id');
		var magni = $('#magni');

//console.log('show:' + id);
		if (id == 'select') {
			resetTrimmingParams(field);
			magni.slider('refresh');
			setupTrimmingControls(field);
		} else if (id == 'trim') {
			// nop
		}
		$('[name=zoom]').checkboxradio('refresh');
	});
	console.log('Ready!!!');
});

function resetTrimmingParams(field) {
	field.resetParams();
	$('#picture').val('');
	$('[name=zoom]').val(['1']);
	$('#magni').val(1);
	refreshNumber();
}
function refreshNumber() {
	var rand = '000000' + parseInt(Math.random() * 10000000);
	var len = rand.length;

	$('#number').val(rand.substring(len - 7, len)).change();
}
function initTrimmingPage(field) {
	var cx = 0;
	var cy = 0;
	var which = 0;
	var canvas = $('#canvas');
	var zoom = function() {
		var magni = $('#magni').val();
		var val = $('[name=zoom]:checked').val();

		field.magnification = magni * val;
		field.draw();
	}

	$('#trim').on('pagecreate', function() {
		$('#magni').on('change', zoom);
	});
	$('#zoom1').prop('checked', true);
	$('[name=zoom]').change(zoom);
	var start = function(e) {
		var isMouse = e.type.match(/^mouse/);

		if (isMouse) {
			cx = e.pageX;
			cy = e.pageY;
		} else if (e.originalEvent.touches) {
			var touches = e.originalEvent.touches[0];
			cx = touches.pageX;
			cy = touches.pageY;
		}
		which = e.which;
	};
	var touch = function(e) {
		var isMouse = e.type.match(/^mouse/);
		var tx;
		var ty;

		if (isMouse) {
			if (!which) {
				return;
			}
			tx = e.pageX;
			ty = e.pageY;
		} else if (e.originalEvent.touches) {
			var touches = e.originalEvent.touches[0];
			tx = touches.pageX;
			ty = touches.pageY;
		}
		var diffH = tx - cx;
		var diffV = ty - cy;

		field.moveH(diffH);
		field.moveV(diffV);
		field.draw();
		cx = tx;
		cy = ty;
	};
	var end = function(e) {
		which = 0;
	};

	canvas.mousedown(start);
	canvas.mousemove(touch);
	canvas.mouseleave(end);
	canvas.mouseup(end);
	canvas.bind('touchstart', start);
	canvas.bind('touchmove', touch);
	canvas.bind('touchend', end);

	var inputFields = ['name', 'addr', 'month', 'day', 'dob', 'appeal'];
	var number = $('#number');
	var gender = $('[name=gender]');

	inputFields.forEach(function(nm) {
		var elem = $('#' + nm);

		elem.change(function() {
			field[nm] = $(this).val();
			field.draw();
		});
		elem.change();
	});
	number.change(function() {
		field.number = createMynumber($(this).val());
		field.draw();
	});
	gender.change(function() {
		var chk = $(this);
		if (chk.is(':checked')) {
			field.gender = chk.val();
			field.draw();
		}
	});
	number.change();
	gender.change();
	$('#secretButton, #mightButton').click(function() {
		var btn = $(this);
		var text = btn.text();
		var dob = $('#dob');

		if (dob.val().indexOf(text) == -1) {

			if (btn.attr('data-reset')) {
				$('#month').val('').selectmenu('refresh').change();
				$('#day').val('').selectmenu('refresh').change();
			}
			dob.val(text);
			dob.change();
		}
	});
	$('#refreshButton').click(function() {
		refreshNumber();
	});
	$('#fixButton').click(function() {
		field.fixed = true;
		setupTrimmingControls(field);
		field.draw();
	});
	$('#trimButton').click(function() {
		field.fixed = false;
		setupTrimmingControls(field);
		field.draw();
	});
	setupTrimmingControls(field);
}
function setupTrimmingControls(field) {
	if (field.fixed) {
		$('#pictureForm').hide();
		$('#infoForm').show();
	} else {
		$('#pictureForm').show();
		$('#infoForm').hide();
	}
}
function createMynumber(num7) {
	var num11 = '2222';

	[].forEach.call(num7, function(c) {
		if ('0' <= c && c <= '9' && num11.length < 11) {
			num11 += c;
		}
	});
	for (var cnt = num11.length; cnt < 11; cnt++) {
		num11 += '0';
	}
	var full = num11 + calcCD(num11);
	var hi = full.substring(0, 3) + "*";
	var mid = full.substring(4, 8);
	var lo = full.substring(8, 12);

	return hi + '  ' + mid + '  '+ lo;
}
function calcCD(code) {
	var sum = 0;
	var ix = 1;

	[].forEach.call(code, function(c) {
		var p = parseInt(c);
		var q = 7 - ix % 6;

		sum += p * q;
		ix++;
	});
	return (11 - sum % 11) % 11 % 10;
}
