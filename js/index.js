$(function(){
	$(".btn-shopcar").on('click', function(e) {
	    $(".wrapper").toggleClass('choose-car');
	   
	});
    // if (!$(".wrapper").hasClass('choose-car')) {
    // 	$("body").on('click', function() {
    // 		return false;
    // 	});
    // }else{
	    // $("body").on('click', function() {
	    // 	 $(".wrapper").removeClass('choose-car');   		
	    // });
	// }
	// 
	$("#chooseall").on("change",function(){
		var isChecked = false;
		if ($(this).prop("checked")) {
			isChecked = true;
		}
		$(".store-all").prop("checked",isChecked);
		$(".selected").prop("checked",isChecked);
		for (var i = 0; i < $(".store-all").length; i++) {
			caculateList($(".store-all").eq(i));
		}
	});
	$(".store-all").on("change",function(){
		var isChecked = false;
		var that = $(this);
		if ($(this).prop("checked")) {
			isChecked = true;
		}
		$(this).parents('.store').find('.selected').prop("checked",isChecked);
		var CheckedCount = 0;
		$(".store-all").each(function(index,item){
			if ($(item).prop("checked")) {
				CheckedCount++;
			}
		});
		if (CheckedCount ===$(".store-all").length) {
			$("#chooseall").prop("checked",true);
		}else {
			$("#chooseall").prop("checked",false);
		}
		caculateList(that);
	});
	$('.selected').on("change",function(){
		var that = $(this),
			$selected = that.parents('.store').find('.selected'),
			CheckedCount = 0,
			count=0;
		$selected.each(function(index,item){
			if ($(item).prop("checked")) {
				CheckedCount++;
			}
		});
		if (CheckedCount ===$selected.length) {
			that.parents('.store').find('.store-all').prop("checked",true);
		}else {
			that.parents('.store').find('.store-all').prop("checked",false);
			$("#chooseall").prop("checked",false);
		}
		$(".store-all").each(function(index,item){
			if ($(item).prop("checked")) {
				count++;
			}
		});
		if (count ===$(".store-all").length) {
			$("#chooseall").prop("checked",true);
		}else {
			$("#chooseall").prop("checked",false);
		}
		caculateList(that);
	});
	$('.add').on('click',function(){
		var num = Number($(this).prev().text());
		var $selected = $(this).parents('.goods-info').find('.selected');
		num++;
		$(this).prev().text(num);
		$(this).prev().prev().removeClass('default');
		if ($selected.prop('checked')) {
			caculateList($selected);
		}
	})
	$('.cut').on('click',function(){
		var num = Number($(this).next().text());
		var $selected = $(this).parents('.goods-info').find('.selected');
		if (num===1) {
			if (!$(this).hasClass('default')) {
				$(this).addClass('default');
				return false;
			}
		}else{
			num--;
			$(this).next().text(num);
		}
		$(this).prev().prev().removeClass('default');
		if ($selected.prop('checked')) {
			caculateList($selected);
		}
	})
	function caculateList(obj){
		var money=0,
			$selected = obj.parents('.store').find('.selected');
		for (var i = 0; i < $selected.length; i++) {
			if ($selected.eq(i).prop("checked")) {
				money += Number((Number($selected.eq(i).parent().nextAll('.good-total').children('span').text())*Number($selected.eq(i).parent().nextAll('.add-or-cut').children('span').text())).toFixed(2));
				money = Number(money.toFixed(2));
			}else{
				continue;
			}
		}
		obj.parents('.store').find('.store-total').text(money==0?`￥0.00`:`￥${money}`);
		caculateTotal();
		caculateNumber();
	}
	function caculateTotal(){
		var money=0,
			$shop = $('.store-all');
		for (var i = 0; i < $shop.length; i++) {
			$shop.eq(i).nextAll('.store-total').text();
				money += Number(Number($shop.eq(i).nextAll('.store-total').text().split('￥')[1]).toFixed(2));
				money = Number(money.toFixed(2));
		}
		$('.totalmoney').text(money==0?`￥0.00`:`￥${money}`);	
	}
	function caculateNumber(){
		var $selected = $('.selected');
		var count = 0;
		for (var i = 0; i < $selected.length; i++) {
			if ($selected.eq(i).prop('checked')) {
				count ++;
			}
		}
		$('.totalNum').text(count);
	}
});