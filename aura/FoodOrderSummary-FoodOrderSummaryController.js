({
    init: function (cmp, event, helper) {
        var itemsMap = new Map(); 
        var items = [];
        cmp.set("v.itemsMap", itemsMap);
        cmp.set("v.items", items);
    },
    addItem : function(component, event, helper) {
        //component.set("v.itemsMap", JSON.stringify(event.getParam("foodItem")));
        console.log('Event handled > summary component. Parameter value: ' + JSON.stringify(event.getParam("foodItem")) );
        var foodItem = event.getParam("foodItem");
        var itemsMap = component.get("v.itemsMap");
        // update the quantity if item already exists
        if (itemsMap.has(foodItem.recordId) ){
            foodItem.quantity = parseInt(itemsMap.get(foodItem.recordId).quantity) + parseInt(foodItem.quantity);
        }
        itemsMap.set(foodItem.recordId, foodItem); 
        helper.updateItems(component, itemsMap);
        
    },
    deleteBtnClicked : function(component, event, helper){
        var itemId = event.getSource().get("v.name");
        var itemsMap = component.get("v.itemsMap");
        console.log('items map before:' + JSON.stringify(itemsMap));
        itemsMap.delete(itemId);
        console.log('items map after:' + JSON.stringify(itemsMap));
        helper.updateItems(component, itemsMap);
    },
    confirmOrder : function (cmp, event, helper){
        
        var action = cmp.get("c.saveOrderInfo");
        action.setParams({
            "orderDtl" : JSON.stringify(cmp.get("v.items"))
        });
        action.setCallback(this, $A.getCallback(function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                //cmp.set("v.data", response.getReturnValue());
                
                var result = response.getReturnValue();
                console.log( "Order Confirmed!" );
                // disable the confirmation btn
                var itemsMap = new Map(); 
                // reset to initial state
                helper.updateItems(cmp, itemsMap);
                // change the button to new order
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
        //$A.util.addClass(confirmOrder, 'changeMe');
        
    }
})