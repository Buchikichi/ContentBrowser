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
		field.resetParams();
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
			picture.val('');
			magni.val(1);
			magni.slider('refresh');
			field.resetParams();
			setupTrimmingControls(field);
		} else if (id == 'trim') {
			// nop
		}
	});
	console.log('Ready!!!');
});

function initTrimmingPage(field) {
	var cx = 0;
	var cy = 0;
	var which = 0;
	var canvas = $('#canvas');

	$('#trim').on('pagecreate', function() {
		var magni = $('#magni');

		magni.on('change', function() {
			var val = $(this).val();
	
			field.magnification = magni.val();
			field.draw();
		});
	});
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

	var name = $('#name');
	var addr = $('#addr');
	var dob = $('#dob');
	var number = $('#number');
	var gender = $('[name=gender]');
	var appeal = $('#appeal');

	name.change(function() {
		field.name = $(this).val();
		field.draw();
	});
	addr.change(function() {
		field.addr = $(this).val();
		field.draw();
	});
	dob.change(function() {
		field.dob = $(this).val();
		field.draw();
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
	appeal.change(function() {
		field.appeal = $(this).val();
		field.draw();
	});
	name.change();
	addr.change();
	dob.change();
	number.change();
	gender.change();
	appeal.change();
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
