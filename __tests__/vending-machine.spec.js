const vendingMachine = require('../lib/vendingMachine.js');

const myVendingMachine = new vendingMachine;

//Printing the inventory
describe('Printing Inventory:', () => {

  describe('when you request the contents of the machine', () => {
    it('will print out a list of the contents, their price, and their supply', () => {
      const result = myVendingMachine.printInventory(); 
      expect(result).toEqual(
          [{"cost": 1.5, "name": "twix", "supply": 3}, 
          {"cost": 1.75, "name": "mars", "supply": 2}, 
          {"cost": 1.9, "name": "milkyWay", "supply": 1}]
      );
    });
  });
});

//Refilling the Inventory
describe('Refilling Inventory:', () => {

  describe('When a user adds supply to the machine', () => {
    it('should restock the number of items in the machine', () => {
      const result = myVendingMachine.refillInventory(5); 
      expect(result).toEqual([
        {"name": "twix", "supply": 8}, 
        {"name": "mars", "supply": 7}, 
        {"name": "milkyWay", "supply": 6}
        ]
      );
    });
  });

    describe('When a user adds supply to the machine but the new stock would be above 10', () => {
    it('should restock up to 10, but not more', () => {
      const result = myVendingMachine.refillInventory(15); 
      expect(result).toEqual([
        {"name": "twix", "supply": 10}, 
        {"name": "mars", "supply": 10}, 
        {"name": "milkyWay", "supply": 10}
        ]
      );
    });
  });
});

//Resupply change
describe('Resupplying Change:', () => {

  describe('When a user tops up the coins in the machine', () => {
    it('should restock the number of coins input', () => {
      const result = myVendingMachine.resupplyChange(2); 
      expect(result).toEqual([
      {"name": "fiveCents", "supply": 4}, 
      {"name": "tenCents", "supply": 5}, 
      {"name": "quarter", "supply": 7}, 
      {"name": "loonie", "supply": 5}, 
      {"name": "twoonie", "supply": 3}]
      );
    });
  });

  describe('If there are more than 5 coins remaining in the machine', () => {
    it('should not restock the coins yet', () => {
      const result = myVendingMachine.resupplyChange(5); 
      expect(result).toEqual([
      {"name": "fiveCents", "supply": 7}, 
      {"name": "tenCents", "supply": 8}, 
      {"name": "quarter", "supply": 10}, 
      {"name": "loonie", "supply": 8}, 
      {"name": "twoonie", "supply": 6}]
      );
    });
  });
});

//Purchase item from machine
describe('Dispensing Items:', () => {

  describe('When a user picks an item from the machine and inserts payment', () => {
    it('should dispense the item and remaining change', () => {
      const result = myVendingMachine.dispenseItem("twix", 2); 
      expect(result).toEqual("You bought a twix for $1.5. Your change is $0.5. The vending machine now has 2 twix left.");
    });
  });

  describe("When a user picks an item but doesn't enter enough change", () => {
    it('should return a message letting the user know', () => {
      const result = myVendingMachine.dispenseItem("mars", 1.5); 
      expect(result).toEqual("Sorry you are $0.25 short.");
    });
  });

  describe("When a user requests an invalid item", () => {
    it('should return a message letting the user know', () => {
      const result = myVendingMachine.dispenseItem("Covfefe", 1.5); 
      expect(result).toEqual("Sorry, Covfefe does not exist!");
    });
  });
});

//Return change as coins, prioritizing returning as few coins as possible
describe('Sorting and Returning Change:', () => {

  describe('When a user purchases something and needs their change returned', () => {
    it('should dispense the change in as few coins as possible', () => {
      const result = myVendingMachine.returnChange(10, 3.10); 
      expect(result).toEqual("Here is your change: 2, 2, 2, 0.25, 0.25, 0.25, 0.10, 0.05");
    });
  });

  describe('When a user purchases something and enters the exact amount of change', () => {
    it('should let them know they entered the exact amount', () => {
      const result = myVendingMachine.returnChange(1.90, 1.90); 
      expect(result).toEqual("Thanks for entering the exact amount!");
    });
  });

});

