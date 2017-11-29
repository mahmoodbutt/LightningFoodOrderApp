({
	addItem : function(component, event, helper) {
        component.set("v.itemsMap", event.getParam("foodItem"));
        console.log('Event handled > summary component. Parameter value: ' + JSON.stringify(event.getParam("foodItem")) );
	}
})