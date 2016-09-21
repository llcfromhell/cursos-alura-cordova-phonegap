function adicionaBadge(element, count) {
	$badge = $('<span class="badge right blue white-text">'+count+'</span>');
	$badge.appendTo(element);
}

// adiciona item no pedido
$('.collection-item').on('click', function() {
	
	var $badge = $('.badge', this);

	if ($badge.length == 0) {

		adicionaBadge(this, 1);

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
$('.collection-item').on('click', '.badge', function(event){
    
    var produtoItem = $(this).parent().first();
    nomeProduto = produtoItem.children().remove().end().text();

    var count = parseInt($(this).text()) -1;

	if (count > 0) {

    	adicionaBadge(produtoItem, count);

	} 

    Materialize.toast(nomeProduto + ' removido', 1000);

    return false;
});

// limpar formulário
$('.acao-limpar').on('click', function() {
	$('#numero-mesa').val('');
	$('.badge').remove();
})

// inicia o modal
$('.modal-trigger').leanModal({
	in_duration : 600
});