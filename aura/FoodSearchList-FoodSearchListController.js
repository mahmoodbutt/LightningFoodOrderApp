({
    init: function (cmp, event, helper) {
        // define the filter object
        var filterObject = {
            searchKey: '',
            type: '',
            price: 0
        };
        cmp.set("v.filterObject", filterObject);
        /*
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Category', fieldName: 'Type__c', type: 'text', sortable:'true'},
            {label: 'Price', fieldName: 'Price__c', type: 'number'}
        ]);
        */
        helper.getFoodItems(cmp);
    },
    addSelectedItem: function (cmp, event, helper) {
        var selectedObj = helper.getObjectByValue(cmp.get("v.data"), "recordId", event.getSource().get("v.name"));
        console.log( selectedObj );
        
        if (selectedObj.quantity <= 0 || selectedObj.quantity > 10) {
            //cmp.find(selectedObj.quantity).showHelpMessageIfInvalid();
            var error = true;
            //helper.createErrorMessage( cmp, error, "errordiv" );
            //"div" + event.getSource().get("v.name")
            
        }
        else{
            // set the event paramters
            var addItemEvent = $A.get("e.c:AddItemEvent"); 
            
            addItemEvent.setParams({
                "foodItem" : selectedObj
            }).fire();    
        }
        
    },
    handleFoodSearch : function(component, event, helper) {
        
        //var foodFilterEvt = $A.get("e.c:FoodSearchFilterChangeEvent");
        var name = event.getParam("foodName");
        var type = event.getParam("mealType");
        var price = event.getParam("price");
        //alert(event.getParam("mealType"));
        var filterObject = component.get("v.filterObject");
        console.log(filterObject);
        if (name !== undefined) {
            filterObject.searchKey = name;
        }
        if (type !== undefined) {
            filterObject.type = type;
        }
        if (price !== undefined) {
            filterObject.price = price;
        }
        console.log(filterObject);
        helper.getFoodItems(component);
    },
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    }
})