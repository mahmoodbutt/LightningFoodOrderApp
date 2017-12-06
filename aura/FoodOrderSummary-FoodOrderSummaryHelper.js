({
	updateItems : function(component, itemsMap) {
        var items = [];
        var totalAmount = 0;
        var totalItems = 0;
        console.log('items map: ' + itemsMap);
        itemsMap.forEach(function (value, key, mapObj) {  
            console.log(`m[${key}] = ${value}`);
            totalItems += parseInt(value.quantity);
            totalAmount += (parseInt(value.quantity) * parseInt(value.price));
            items.push(value);
        });  
        // enable / disable Order button
        if (items.length > 0) component.set("v.btnDisabled", false);
        else component.set("v.btnDisabled", true);
        component.set("v.itemsMap", itemsMap);
        component.set("v.items", items);
        component.set("v.itemsTotalCount", totalItems);
        component.set("v.itemsTotalAmount", totalAmount);
	}
})