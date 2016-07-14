require('../src/main.js');

describe('intergation test', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = [
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

    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
});
    it('should print correct text', function() {

      spyOn(console, 'log');

      printReceipt(inputs);

      var expectText =
        '***<没钱赚商店>收据***\n' +
        '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
        '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
        '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
        '----------------------\n' +
        '总计：51.00(元)\n' +
        '节省：7.50(元)\n' +
        '**********************';

      expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
describe('unit test',function () {
  beforeEach(function() {
    allItems = [
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

    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });
  describe('buildCartItems', function () {
    it('should print cartItems', function () {
      var cartItems = buildCartItems(inputs);
      var expectCartItems = [
        {
          input: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
          count: 5
        },
        {
          input: {barcode: 'ITEM000003-2', name: '荔枝', unit: '斤', price: 15.00},
          count: 2
        },
        {
          input: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
          count: 3
        }
      ];
      expect(cartItems).toEqual(expectCartItems);

    });
  });

  describe('buildReceiptItems', function () {
    it('should print receiptItems', function () {
      var receiptItems = buildReceiptItems(buildCartItems(inputs));
      var expectReceiptItems = [
        {
          cartItem: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, count: 5},
          subtotal: 12.00,
          saved: 3.00
        },
        {
          cartItem: {barcode: 'ITEM000003-2', name: '荔枝', unit: '斤', price: 15.00, count: 2},
          subtotal: 30.00,
          saved: 0.00
        },
        {
          cartItem: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, count: 3},
          subtotal: 9.00,
          saved: 4.50
        }
      ];
      expect(receiptItems).toEqual(expectReceiptItems);
    });
  });

  describe('buildReceipt', function () {
    it('should print receipt', function () {
      var receipt = buildReceipt(buildReceiptItems(buildCartItems(inputs)));
      var expectReceipt = {
        receiptItems: [
          {
            cartItem: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, count: 5},
            subtotal: 12.00,
            saved: 3.00
          },
          {
            cartItem: {barcode: 'ITEM000003-2', name: '荔枝', unit: '斤', price: 15.00, count: 2},
            subtotal: 30.00,
            saved: 0.00
          },
          {
            cartItem: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, count: 3},
            subtotal: 9.00,
            saved: 4.5
          }
        ],
        total: 51.00,
        discount: 7.50
      };

      expect(receipt).toEqual(expectReceipt);

    });
  });
});
