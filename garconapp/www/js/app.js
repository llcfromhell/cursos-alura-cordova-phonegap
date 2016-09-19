// adiciona item no pedido
$('.collection-item').on('click', function() {
	
	var $badge = $('.badge', this);

	if ($badge.length == 0) {

		$badge = $('<span class="badge right blue white-text">0</span>');
		$badge.appendTo(this);

	}

	$badge.text(parseInt($badge.text())+1);

	var nomeProduto = this.firstChild.textContent;
	Materialize.toast(nomeProduto + ' adicionado', 1000);

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
$('.collection-item').on('click', '.badge', function(){
    $(this).remove();
    return false;
});

// limpar formulário
$('.acao-limpar').on('click', function() {
	$('#numero-mesa').val('');
	$('.badge').remove();
})

// inicia o modal
$('.modal-trigger').leanModal();