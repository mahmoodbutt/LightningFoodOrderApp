<aura:application extends="force:slds">
    
    <!-- <h1>Hello Lightning App!</h1>
    <c:helloWorld /> <c:camping /> 
 <c:FunWithAttributes />
-->   
    <div class="container" >
        <table style="width:80%;">
            <tr>
                <td style="width:50%;"><c:FoodSearch /></td>
                <td style="width:50%;"><c:FoodOrderSummary /></td>
            </tr>
        </table>
        <c:FoodSearchList />
        
    </div>
</aura:application>