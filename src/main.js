// $('.child').addClass('red').addClass('blue');

// console.log($('.test').find('.child').addClass('yellow'));

const api1 = $('.test');
api1.addClass('blue');

const api2 = api1.find('.child').addClass('red');
api2.print();
api2.parent().print();
api2.parent().child().print();

api1.addClass('green');

const oldApi = api2.end().addClass('yellow');

$('<div>body新的div</div>').appendTo(document.body);
$('<div>test新的div</div>').appendTo(api1);
$('<div>child新的div</div>').appendTo($('.child'));
$('<div>child新的div</div>').appendTo(api1.find('.child'));

// $('.test')
//     .find('.child')
//     .addClass('red')
//     .addClass('blue')
//     .addClass('green')
//     .end()
//     .addClass('yellow');