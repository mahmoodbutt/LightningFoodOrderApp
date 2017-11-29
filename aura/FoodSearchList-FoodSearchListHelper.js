({
    getFoodItems : function(cmp) {
        var action = cmp.get('c.getFoodList');
        //alert(JSON.stringify(cmp.get("v.filterObject")));
        action.setParams({
            "filters": JSON.stringify(cmp.get("v.filterObject")),
            "pageSize": 0,
            "pageNumber": 0
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //cmp.set("v.data", response.getReturnValue());
                
                var result = response.getReturnValue();
                alert(JSON.stringify(result) );
                cmp.set("v.data", result.foodItems);
                //cmp.set("v.page", result.page);
                // cmp.set("v.total", result.total);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    getObjectByValue : function(objArr, keyLookup, value){
        return objArr.find(key => key[keyLookup] === value);
    },
    createErrorMessage: function( cmp, error, divId ){
        
        try {
            if (error) {
                throw new Error("You don't have permission to edit this record.");
            }
        }
        catch (e) {
            $A.createComponents([
                ["ui:message",{
                    "title" : "Sample Thrown Error",
                    "severity" : "error",
                }],
                ["ui:outputText",{
                    "value" : e.message
                }]
            ],
                                function(components, status, errorMessage){
                                    if (status === "SUCCESS") {
                                        console.log(JSON.stringify(cmp) );
                                        var message = components[0];
                                        var outputText = components[1];
                                        // set the body of the ui:message to be the ui:outputText
                                        message.set("v.body", outputText);
                                        console.log('divid is:'+divId);
                                        var div1 = cmp.find(divId);
                                        console.log('component found:' + div1);
                                        // Replace div body with the dynamic component
                                        div1.set("v.body", message);
                                    }
                                    else if (status === "INCOMPLETE") {
                                        console.log("No response from server or client is offline.")
                                        // Show offline error
                                    }
                                        else if (status === "ERROR") {
                                            console.log("Error: " + errorMessage);
                                            // Show error message
                                        }
                                });
        }
    }
})