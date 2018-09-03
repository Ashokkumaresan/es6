(function(){
var Chartinteractivity=function(a){
 var params = a.split(","),
        str = "";
        pArry = interactivity.history.params,
        curParam = interactivity.history.currentParam,
        _$tempDOM = $("#historyList"),
        exist = false;
    for(var i=0;i<params.length;i++){ 
        var aa = checkWithPrevEle(params[i]);
        if(str!="" && aa!=""){
           str = str + " | "; 
        }    
        str = str + aa;
    }

    function checkWithPrevEle(b){
      var _tempStr = interactivity.parameters.name[b]+":"+window[b];
        if(curParam!== -1 && pArry[curParam].match(_tempStr) !== null)
            return "";
        else
            return _tempStr;
    }
    
    function isAlreadyExist(){
                if(pArry.indexOf(str) !== -1 || (pArry[curParam] !==undefined && pArry[curParam].match(str) !== null))
            return true;
        else if(pArry[curParam] !==undefined){
            
            if(pArry[curParam].split("|").length === 1){
                var x = pArry[curParam].split(":")[0];
                var y = str.split(":")[0];                
                if(x === y){
                    return false;
                }
            }
            
            str = str + " | " + pArry[curParam];
            if(pArry.indexOf(str) !== -1)
                return true;
            else{
                // check with all the combination in the history array
                var e = str.split(" | ");
                var cnt = 0;                
                for(var p=0;p<pArry.length;p++){
                    var t = pArry[p].split(" | ");
                    for(var r=0;r<t.length;r++){
                        for(var s=0;s<e.length;s++){
                            if(t[r] === e[s])
                            cnt++;
                        }
                    }
                    if(cnt === e.length && cnt === t.length){
                        return true;
                    }                       
                }
                return false;
            }
        } 
    }

 if(!isAlreadyExist())    
        interactivity.history.params.unshift(str);

}

   Chartinteractivity.prototype.renderComponents=function(obj){      
       
       var _arr = obj.interactiveComponents;                        
    for (var i = 0; i < _arr.length; i++) {   
        if(window[_arr[i]].chart_array!==undefined)
        window[window[_arr[i]].chart_array].push(window[_arr[i]].htmlObject);            
        var query = window[_arr[i]].sqlQuery;
        final_query = onyxUtils.queryReplace(query);       
        var divContainer=xmlDoc.getElementById(window[_arr[i]].name)!=null?xmlDoc.getElementById(window[_arr[i]].name).getAttribute("div"):xmlDoc.getElementById(window[_arr[i]].name.split("render_")[1]).getAttribute("div");
         for(var j=0;j<AmCharts.charts.length;j++){
             if(AmCharts.charts[j].div.id.split("_container")[0]==divContainer){
                 AmCharts.charts.splice(j,1);
                 AmCharts.onReady_array.splice(j,1);
            }
        }
        window[_arr[i]].update();
    }
   
   }



function drillDownEvents() {};
    
    drillDownEvents.prototype.getDrillChart=function(){
            var _c = drillDownSteps.find(function(x) {
                return x.chart = chartid
            });
                return _c;
    }

    drillDownEvents.prototype.update_chart=function(_sql,_chartid){
             queryFilePath = "http://" + host + sqlPath + _sql.sqlfile + "/content";                
                query = onyxUtils.getContent(queryFilePath);
                final_query = query.replace(/\$\{username\}/g, username()).replace(/\$\{filter1\}/g, filter1).replace(/\$\{filter2\}/g, filter2).replace(/\$\{filter3\}/g, filter3).replace(/\$\{filter4\}/g, filter4).replace(/\$\{filter5\}/g, filter5).replace(/\$\{filter6\}/g, filter6).replace(/\$\{filter7\}/g, filter7).replace(/\$\{filter8\}/g, filter8).replace(/\$\{filter9\}/g, filter9).replace(/\$\{filter10\}/g, filter10).replace(/\$\{drill1\}/g, _sql.drillParam.split(",")[0]).replace(/\$\{drill2\}/g, _sql.drillParam.split(",")[1]).replace(/\$\{drill3\}/g, _sql.drillParam.split(",")[2]).replace(/\$\{drill4\}/g, _sql.drillParam.split(",")[3]).replace(/\$\{drill5\}/g, _sql.drillParam.split(",")[4]).replace(/\$\{drill6\}/g, _sql.drillParam.split(",")[5]).replace(/\$\{drill7\}/g, _sql.drillParam.split(",")[6]).replace(/\$\{drill8\}/g, _sql.drillParam.split(",")[7]).replace(/\$\{drill9\}/g, _sql.drillParam.split(",")[8]).replace(/\$\{drill10\}/g, _sql.drillParam.split(",")[9]);               
                window[_chartid].sqlQuery = query;
                window[_chartid].update();
}

drillDownEvents.prototype.renderComponents=function(chartid, divid, charttype, parameter, actiontype) {
    var currentChart = this.getDrillChart();
    if (typeof currentChart != "undefined") {
        console.log(currentChart);
        if (actiontype == 0) {
            var currentQuery = 0;
            currentChart.sql.forEach(function(index, value) {
                if (index.isExicuted == true) {
                    currentQuery = value;
                    return false;
                }
            });
            if (currentQuery == 0) { // execute main query
                query = currentChart.originalSql;
                window[parameter] = "";
                for (var m = 0; m < currentChart.sql.length; m++)
                    currentChart.sql[m].drillParam = "";
                final_query = query.replace(/\$\{username\}/g, username()).replace(/\$\{filter1\}/g, filter1).replace(/\$\{filter2\}/g, filter2).replace(/\$\{filter3\}/g, filter3).replace(/\$\{filter4\}/g, filter4).replace(/\$\{filter5\}/g, filter5).replace(/\$\{filter6\}/g, filter6).replace(/\$\{filter7\}/g, filter7).replace(/\$\{filter8\}/g, filter8).replace(/\$\{filter9\}/g, filter9).replace(/\$\{filter10\}/g, filter10).replace(/\$\{param1\}/g, param1).replace(/\$\{param2\}/g, param2).replace(/\$\{param3\}/g, param3).replace(/\$\{param4\}/g, param4).replace(/\$\{param5\}/g, param5).replace(/\$\{param6\}/g, param6).replace(/\$\{param7\}/g, param7).replace(/\$\{param8\}/g, param8).replace(/\$\{param9\}/g, param9).replace(/\$\{param10\}/g, param10);
                currentChart.sql[currentQuery].isExicuted = false;
                loadChartArray(charttype, divid);
                window[chartid].sqlQuery = query;
                window[chartid].update();
                $('#' + divid).parent().parent().find(".smart-widget-option").find(".widget-back-option").css({
                    "display": "none"
                });
            } else {
                $('#' + divid).parent().parent().find(".smart-widget-option").find(".widget-back-option").css({
                    "display": "block"
                });
                currentChart.sql[currentQuery].isExicuted = false;               
                var updateParam = currentChart.sql[currentQuery].drillParam.split(",");
                var updatedString = "";
                for (var l = 0; l < updateParam.length - 1; l++) {
                    if (l == 0)
                        updatedString += updateParam[l];
                    else
                        updatedString += "," + updateParam[l];
                }
                currentChart.sql[currentQuery].drillParam = updatedString;
                //query=queryFilePath;
                var drillBack = currentChart.sql[currentQuery - 1].drillParam;          
                this.update_chart(currentChart.sql[currentQuery - 1],chartid);     
            }

        } else {
            $('#' + divid).parent().parent().find(".smart-widget-option").find(".widget-back-option").css({
                "display": "block"
            });
            var nextsql = currentChart.sql.filter(function(x) {
                return x.isExicuted == false
            });
            if (!_.isEmpty(nextsql)) {
                nextsql[0].isExicuted = true;
                var checkClear = _.where(nextsql, {
                    drillParam: ""
                });
                if (checkClear.length == nextsql.length) {
                    for (var n = 0; n < nextsql.length; n++)
                        nextsql[n].drillParam = parameter;
                } else {
                    if (nextsql[0].drillParam == "") nextsql[0].drillParam = parameter;
                    else
                        nextsql[0].drillParam += "," + parameter;
                }
                this.update_chart(nextsql[0],chartid);      
            }
        }
    } else {
        var sqlList = xmlDoc.getElementById(chartid).attributes[13].value.split(",");
        var drillObject = new Object();
        drillObject.chart = chartid;
        drillObject.originalSql = window[chartid].sqlQuery;
        drillObject.sql = [];
        for (var i = 0; i < sqlList.length; i++) {
            var drillSql = new Object();
            drillSql.sqlfile = sqlList[i];
            drillSql.drillParam = parameter;
            if (i == 0) {
                loadChartArray(charttype, divid);
                drillSql.isExicuted = true;
                this.update_chart(sqlList[i],chartid);                
                var left = $('#' + divid).width() - 67;
                $('#' + divid).parent().parent().find(".smart-widget-option").find(".widget-back-option").attr({
                    "type": charttype,
                    "chartId": chartid,
                    "divId": divid,
                    "param": parameter
                });
                $('#' + divid).parent().parent().find(".smart-widget-option").find(".widget-back-option").css({
                    "display": "block",
                    "left": -left + "px"
                });
            } else
                drillSql.isExicuted = false;
            drillObject.sql.push(drillSql);
        }
        drillDownSteps.push(drillObject);
    }
}


ChartActions=(function(){
    var _in={};
    function init(_type,_obj){       
        if(_type=="interact")//Interactive Chart
           _in=new Chartinteractivity(_obj);
       else if(_type=="drill")
          _in=new drillDownEvents();
       return{
        render:_in.renderComponents
    } 
    }
   
    
   return{
    getInstance:function(_type,_obj){            
            return init(_type,_obj);
        }
   } 
})();

})();

