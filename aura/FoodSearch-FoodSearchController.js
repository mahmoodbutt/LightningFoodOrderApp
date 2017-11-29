({
    searchMeals : function(component, event, helper) {
        // set the variable values with the attributes from component
        var foodName = component.get("v.searchNameKey");
        var mealType = component.get("v.searchTypeKey");
        var price = component.get("v.searchPriceKey");
        //alert("name:" + name + " -type:"+ mealType + "Price:" + price);
        
        // set the event paramters
        //var searchFilterChange = component.getEvent("searchFilterChange");
        var searchFilterChange = $A.get("e.c:FoodSearchFilterChangeEvent"); 
        
        searchFilterChange.setParams({
            "foodName" : foodName,
            "mealType" : mealType,
            "price" : price
        }).fire();
        
    },
})