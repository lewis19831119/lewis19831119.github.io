

function showChartForCBR(tableData , result ,item ,char_id){

    let arrDate=[];
    let arrData=[];
    let arrData2=[];


    for (let x =0;x<tableData.length ;x++){
        arrDate.push(tableData[x].date);
        arrData.push(tableData[x].close);
    }

    for (let x =0;x<tableData.length ;x++){
        arrData2.push(tableData[x][item.rule_setting.attrName ]);
    }

    printChartRule(arrDate,arrData,arrData2,char_id , result.chartPointData ,item ,"CBR")

    document.getElementById(char_id).hidden = false; 

}


function showChartForTechIndex(tableData , result , item,char_id){

    let rule_setting = item.rule_setting;
    let arrDate=[];
    let arrData=[];
    let arrData2=[];
  

    //result.buyLine=[];
    //result.sellLine=[];

    result.Kline=[];
    result.Dline=[];
    result.volumn=[];
    
    
    let K = rule_setting.tech_index_parameter1;
    let D = rule_setting.tech_index_parameter2;

    for (let x =0;x<tableData.length ;x++){
        arrDate.push(tableData[x].date);
        arrData.push(tableData[x].close);
        result.volumn.push( Math.round(tableData[x].volumn/1000));

        if (rule_setting.tech_index=="KD"){
            //result.buyLine.push(result.buy);
            //result.sellLine.push(result.sell);
            arrData2.push(tableData[x][rule_setting.attrName ]);
            result.Kline.push(tableData[x]["K" + K ]);
            result.Dline.push(tableData[x]["D" + D ]);
        }else{

            //result.buyLine.push(result.buy);
            //result.sellLine.push(result.sell);
            arrData2.push(tableData[x][rule_setting.attrName ]);
        }
    }


 

    printChartRule(arrDate,arrData,arrData2,char_id , result ,item  )

    document.getElementById(char_id).hidden = false; //tab
}




function printChartRule(arrDate,arrData1,arrData2 , chartID  ,result ,item  ){

    let rule_setting = item.rule_setting;

    let attrName = rule_setting.attrName;
    let ruleName =  rule_setting.tech_index;

    let chartSetting ={};
    
    chartSetting.legendData=[];


    if (ruleName=="CBR")
    {
        chartSetting.titel  ='顯示TEST';
        chartSetting.legendData =[attrName,'收盤','買入_連漲','賣出_連跌','買入_跌漲','賣出_漲跌']
        chartSetting.titel  =titel ;
        chartSetting.seriesData =  [
            {
                name: attrName,
                type: 'line',
                yAxisIndex: 1,
                markPoint: {
                    data: result 
                    },
                itemStyle: {
                    color: 'rgb(25, 70, 131)'
                },
                data: arrData2
           },
           {
                name: '收盤',
                type: 'line',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: arrData1
           },
           {
               name: '買入_連漲',
               type: 'bar',
                itemStyle: {
                   color: '#FF4321'
               },
               data: [], 
             }
             , {
               name: '賣出_連跌',
               type: 'bar',
                itemStyle: {
                   color: '#43FF21'
               },
               data: [], 
             },
             {
                 name: '買入_跌漲',
                 type: 'bar',
    
                  itemStyle: {
                     color: '#bb4321'
                 },
                 data: [], 
            }
            , {
                    name: '賣出_漲跌',
                    type: 'bar',
                    itemStyle: {
                        color: '#43bb21'
                    },
                    data: [], 
               },
         ];

    }else  if  (ruleName=="KD" || ruleName=="WR"  || ruleName=="MACD"  || ruleName=="RSI" )
        {
            chartSetting.legendData =[attrName,'收盤','買入','賣出', ruleName +'買入線', ruleName+ '賣出線']

            chartSetting.titel  = item.stockInfo.id + item.stockInfo.name + "_指標("  +  attrName +')演算參數(' + rule_setting.trainDay + "-" + rule_setting.days + "-" + rule_setting.times  +")"   ;


            chartSetting.seriesData =  [
               {
                    name: '收盤',
                    type: 'line',
                    markPoint: {
                        data: result.stockPoint 
                        },
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    data: arrData1
               } ,     
               ,
           {
                name: '成交量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: 'rgb(255, 190, 70)'
                },
                data: result.volumn
           },             
                {
                name: attrName,
                type: 'line',
                yAxisIndex: 1,
                /*markPoint: {
                    data: result.techIndexPoint 
                    },*/
                itemStyle: {
                    color: 'rgb(25, 70, 131)'
                },
                data: arrData2
             },
             ,                  
                {
                name:  ruleName +'買入線',
                type: 'line',
                yAxisIndex: 1,
                showSymbol: false,
                itemStyle: {
                    color: '#43FF21'
                },
                data: result.buyLine
             },
             ,                  
             {
             name:  ruleName + '賣出線',
             type: 'line',
             yAxisIndex: 1,
             showSymbol: false,
             itemStyle: {
                 color: '#FF4321'
             },
             data: result.sellLine
          },
             {
                name: '賣出',
                type: 'bar',
                 itemStyle: {
                    color: '#FF4321'
                },
                data: [], 
              },
               {
                   name: '買入',
                   type: 'bar',
                    itemStyle: {
                       color: '#43FF21'
                   },
                   data: [], 
                 }
             ];


             /*if  (ruleName=="KD"){
                let K = rule_setting.tech_index_parameter;
                let D = rule_setting.tech_index_parameter2;
            
                chartSetting.seriesData.push({
                name:  'D' +D,
                type: 'line',
                yAxisIndex: 1,
                showSymbol: false,
                itemStyle: {
                    color: '#43FF21'
                },
                data: result.Dline
                 });

                chartSetting.seriesData.push({
                name:  'K' +K,
                type: 'line',
                yAxisIndex: 1,
                showSymbol: false,
                itemStyle: {
                    color: '#FF4321'
                },
                data: result.Kline
                 });
             }*/

             
        }


    printChart( arrDate, chartID , attrName  ,chartSetting);
    
}



function printChart( arrDate , chartID , attrName  ,chartSetting){

    let myChart = echarts.init(document.getElementById(chartID));

    // 指定图表的配置项和数据
    option = {
    legend: {
        orient:'vertical',
        x:'left',
        y:'center',
        data: chartSetting.legendData //[attrName,'收盤','買入_連漲','賣出_連跌','買入_跌漲','賣出_漲跌']
    },
    grid: {
        left: '150',

    },
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
        return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text:  chartSetting.titel , //'顯示與今日'+ attrName +'近似的資料';
    },
    toolbox: {
        feature: {
        dataZoom: {
            yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: arrDate
    },
    yAxis: [
         {
            type: 'value',
            name: '收盤',
            min: 'dataMin',
            max: 'dataMax'
        },
            {
        type: 'value',
        name: attrName,
        axisLabel: {
            formatter: '{value} '
        }
        }
        ]
    ,
    dataZoom: [
        {
        type: 'inside',
        start: 1,
        end: arrDate.length
        },
        {
        start: 1,
        end:arrDate.length
        }
    ],
    series: chartSetting.seriesData
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
