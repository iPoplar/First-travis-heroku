function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


function printReceipt(inputs) {
  var cartItems = buildCartItems(inputs);
  var receiptItems = buildReceiptItems(cartItems);
  var receipt = buildReceipt(receiptItems);

  var cartItemText = '';
  var expectText = '';

  for(var i = 0; i < receipt.receiptItems.length; i++){
    cartItemText += '名称：' + receipt.receiptItems[i].cartItem.name + '，' + '数量：'
      + receipt.receiptItems[i].cartItem.count + receipt.receiptItems[i].cartItem.unit
      + '，' + '单价：' + receipt.receiptItems[i].cartItem.price.toFixed(2) + '(元)' + '，'
      + '小计：' + receipt.receiptItems[i].subtotal.toFixed(2) + '(元)\n' ;
  }
  expectText += '***<没钱赚商店>收据***\n' + cartItemText +'----------------------\n' +
    '总计：'+ receipt.total.toFixed(2) +'(元)\n' +
    '节省：'+ receipt.discount.toFixed(2) +'(元)\n'+
    '**********************';
  console.log(expectText);
}

function buildReceipt(receiptItems) {
  var receipt = {};
  var total = 0;
  var discount = 0;
  for(var i = 0; i < receiptItems.length; i++){
    total += receiptItems[i].subtotal
    discount += receiptItems[i].saved;
  }
  receipt = {receiptItems: receiptItems, total:total,discount:discount};
  return receipt;
}
function isPromotion(cartItem) {
  var promotions = loadPromotions();
  var existLine = cartItem.input.barcode.split("-");
  var isPromot = false;
  for(var i = 0; i < promotions[0].barcodes.length; i++){
    if(existLine[0] === promotions[0].barcodes[i]){
      isPromot = true;
      return isPromot;
    }else{
      isPromot = false;
    }
  }
  return isPromot;
}
function buildReceiptItems(cartItems) {
  var receiptItems = [];
  for(var i = 0; i < cartItems.length; i++){
    if(isPromotion(cartItems[i]) && cartItems[i].count >= 3){
      subtotal = (cartItems[i].count-parseInt(cartItems[i].count/3))*cartItems[i].input.price;
    }else{
      subtotal = cartItems[i].count*cartItems[i].input.price;
    }
    saved = cartItems[i].count*cartItems[i].input.price-subtotal;
    receiptItems.push({cartItem:{barcode:cartItems[i].input.barcode,name:cartItems[i].input.name,
      unit:cartItems[i].input.unit, price:cartItems[i].input.price,count:cartItems[i].count},
      subtotal:subtotal,saved:saved});
  }
  return receiptItems;
}
function buildCartItems(inputs) {
  var items = buildItems(inputs);
  var cartItems = [];
  items.forEach(function (item) {
    cartItems = isExist(item, cartItems);
  });
  return cartItems;
}

function buildItems(inputs) {
  var items = [];
  var allItems = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 6.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];

  inputs.forEach(function (input) {
    var existLine = input.split("-");
    for(var i = 0; i < allItems.length; i++){
      if(existLine[0] === allItems[i].barcode){
        items.push({barcode:input,name:allItems[i].name,
          unit:allItems[i].unit,price:allItems[i].price});
      }
    }
  });
  return items;
}
function isExist(item, cartItems){
  var existLine = item.barcode.split("-");
  for(var i = 0; i < cartItems.length; i++){
    if(existLine[1]){
      cartItems[cartItems.length] = {input:item,count:parseInt(existLine[1])};
      return cartItems;
    }else{
      if(existLine[0] == cartItems[i].input.barcode){
        cartItems[i].count++;
        return cartItems;
      }
    }
  }
  cartItems[cartItems.length] = {input:item,count:1};
  return cartItems;
}
module.exports = {printReceipt:printReceipt,
  buildReceipt:buildReceipt,
  buildReceiptItems:buildReceiptItems,
  uildItems:buildItems,
  buildCartItems:buildCartItems};
