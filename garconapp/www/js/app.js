function adicionaBadge(element, count) {
	var newBadge = $('<span class="badge right brown white-text">'+count+'</span>');
	newBadge.appendTo(element);
}

function limpar() {
	$('#nroMesa').val('');
	$('.badge').remove();
}

// adiciona item no pedido
$('.collection-item').on('click', function() {
	
	var badge = $('.badge', this);

	if (badge.length == 0) {

		adicionaBadge(this, 1);

	}

	badge.text(parseInt(badge.text())+1);

	var nomeProduto = this.firstChild.textContent;
	Materialize.toast(nomeProduto + ' adicionado', 3000);

	navigator.vibrate(300);

}) 

// monta resumo para confirmar
$('#confirmar').on('click', function() {

	$('#resumo').text('');

	var textoResumo = '';

	$('.badge').parent().each(function() {

		var produto = this.firstChild.textContent;
		var quantidade = this.lastChild.textContent;

		textoResumo += produto + ': ' + quantidade + '<br>';
	})

	$('#resumo').append(textoResumo);
})

// remove item do pedido
$('.collection-item').on('click', '.badge', function(event){
    
    var produtoItem = $(this).parent().first();
    nomeProduto = produtoItem.children().remove().end().text();

    var count = parseInt($(this).text()) -1;

	if (count > 0) {

    	adicionaBadge(produtoItem, count);

	} 

    Materialize.toast(nomeProduto + ' removido', 2000, 'red-text');

    return false;
});

// limpar formulário
$('.acao-limpar').on('click', function(){
	limpar();
})

// inicia o modal
$('.modal-trigger').leanModal({
	in_duration : 600
});

// leitor qrcode
$('.scan-qrcode').on('click', function(){
    cordova.plugins.barcodeScanner.scan(
       function (resultado) {
           if (resultado.text) {
               Materialize.toast('Mesa ' + resultado.text, 3000);
               $('#nroMesa').val(resultado.text);
           }
       },
       function (error) {
           Materialize.toast('Erro: ' + error, 3000, 'red-text');
       }
    );
});

$('.acao-finalizar').on('click', function (){
	
	$.ajax({
		url: 'http://cozinhapp.sergiolopes.org' + '/novo-pedido',
		data: {
			mesa: $('#nroMesa').val(),
			pedido: $('#resumo').text()
		},
		success: function(resposta) {
			Materialize.toast(resposta, 2000, 'green-text');
			navigator.vibrate(1000);
			limpar();
		},
		error: function(erro) {
			Materialize.toast(erro, 5000, 'red-text');
		}
	})

})