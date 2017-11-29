/*
* Created by: Mahmood 20-Nov-2017
*/
public with sharing class FoodListController {
    
    // Wrapper class for the filters
	public class Filter {
        
        @AuraEnabled
        public String searchKey { get;set; }
        
        @AuraEnabled
        public String type { get;set; }
        
        @AuraEnabled
        public integer price { get;set; }
       
    }
    // Wrapper class for food Items
	public class MealItemsWrp {
        
        @AuraEnabled
        public id recordId { get;set; }
        
        @AuraEnabled
        public String name { get;set; }
        
        @AuraEnabled
        public String type { get;set; }
        
        @AuraEnabled
        public decimal price { get;set; }
        
        @AuraEnabled
        public string image { get;set; }
        // defining quantity as this will be a defined in the list component
        @AuraEnabled
        public integer quantity { get;set; }
       
    }
    
    public class PagedResult {
        
        @AuraEnabled
        public Integer pageSize { get;set; }
        
        @AuraEnabled
        public Integer page { get;set; }
        
        @AuraEnabled
        public Integer total { get;set; }
        
        @AuraEnabled
        public List<MealItemsWrp> foodItems { get;set; }
        //public List<MealItem__c> foodItems { get;set; }
        
    }
    // return food items 
    @AuraEnabled
    public static PagedResult getFoodList(String filters, Decimal pageSize, Decimal pageNumber) {
        System.debug('filters:' + filters);
        Filter filter = (Filter) JSON.deserializeStrict(filters, FoodListController.Filter.class);
        Integer pSize = (Integer)pageSize;
        //String key = '%' + filter.searchKey + '%';
        String key = '%' + String.escapeSingleQuotes(filter.searchKey) + '%';
        Integer offset = ((Integer)pageNumber - 1) * pSize;
        PagedResult r =  new PagedResult();
        r.pageSize = pSize;
        r.page = (Integer) pageNumber;
        
        string queryFilter = '';
        if (filter.price > 0 ) queryFilter = queryFilter + ' AND Price__c < ' + filter.price;
        if (filter.type != '') queryFilter = queryFilter + ' AND Type__c like \'' + filter.type + '\'';
        
                  
        System.debug('Qry: ' + 'SELECT id, Name, Price__c, Type__c, Image__c FROM MealItem__c WHERE Name LIKE ' +  key + queryFilter);
        List<MealItemsWrp> mealtItems = new List<MealItemsWrp> ();
        for (MealItem__c mItem : (List<MealItem__c>) Database.query('SELECT id, Name, Price__c, Type__c, Image__c FROM MealItem__c WHERE Name LIKE \'' +  key + '\'' + queryFilter))
        {
            MealItemsWrp miWrp = new MealItemsWrp();
            miWrp.recordId = mItem.id;
            miWrp.name =  mItem.Name;
            miWrp.price = mItem.Price__c;
            miWrp.type = mItem.Type__c;
            miWrp.image = mItem.Image__c;
            miWrp.quantity = 0;
            mealtItems.add(miWrp);
            //mealtItems.add(new MealItemsWrp ( name = mItem.Name, price=mItem.Price__c, type=mItem.Type__c, image=mItem.Image__c, quantity=0 ) );
        }
        r.foodItems = mealtItems;
        r.total = r.foodItems.size();
        /*
         * r.total = [SELECT count() FROM MealItem__c 
                   WHERE Name LIKE :key
                   AND Type__c like : (filter.type == '' ? '%' : filter.type)
                   AND Price__c < : (filter.price == 0 ? 999999 : filter.price)
                   ];
		r.foodItems = [SELECT id, Name, Price__c, Type__c, Image__c
                       FROM MealItem__c 
                       WHERE name LIKE :key
                       AND Type__c like : (filter.type == '' ? '%' : filter.type)
                       AND Price__c < : (filter.price == 0 ? 999999 : filter.price)
                       ];
		*/
        return r;
    }
    
}