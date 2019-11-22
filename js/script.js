document.addEventListener('DOMContentLoaded', function () {

    checkSourceOfRisksTable();
    checkIdentificationRiskTable();
    selectChecker();
    createMoneyTable();

    document.getElementById('sourceOfRisksTable').addEventListener('change', checkSourceOfRisksTable);
    document.getElementById('identificationRiskTable').addEventListener('change', checkIdentificationRiskTable);
    document.getElementById('identificationRiskTable').addEventListener('change', createProbabilitytable);
    document.getElementById('pageSelector').addEventListener('change', selectChecker);
    
    function callAll(){
        checkSourceOfRisksTable();
        checkIdentificationRiskTable();
        selectChecker();
        createMoneyTable();
        addExperts();
        createProbabilitytable();
        addMoneyExperts();
        buildFinalTable();
        createMoneyProbabilityTable();
    }


    function selectChecker() {
        elem = document.getElementById("pageSelector");
        if (elem.value == 'Ідентифікація ризиків розробки ПЗ') {
            document.getElementById('firstStage').hidden = false;
            document.getElementById('secondStage').hidden = true;
            document.getElementById('thirdStage').hidden = true;

        }
        else if (elem.value == 'Аналіз ризиків розроблення ПЗ') {
            document.getElementById('firstStage').hidden = true;
            document.getElementById('secondStage').hidden = false;
            document.getElementById('thirdStage').hidden = true;
        }
        else {
            document.getElementById('firstStage').hidden = true;
            document.getElementById('secondStage').hidden = true;
            document.getElementById('thirdStage').hidden = false;
        }
    }

    var allUsedRows;

    function checkSourceOfRisksTable() {
        var identificationRiskTable = document.getElementById('sourceOfRisksTable');
        var counter = 0;
        var allRows = 0;
        allUsedRows = 0;
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (!identificationRiskTable.rows[i].classList.contains('main')) {
                allRows++;
            }
        }
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (identificationRiskTable.rows[i].classList.contains('main')) {
                identificationRiskTable.rows[i].cells[1].innerHTML = counter;
                identificationRiskTable.rows[i].cells[2].innerHTML = (counter / allRows * 100).toPrecision(4) + '%';
                counter = 0;
            } else {
                if (identificationRiskTable.rows[i].querySelector('.needWork').value == '1') {
                    counter++;
                    allUsedRows++;
                }
            }
        }
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[1].innerHTML = counter = allRows;
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[2].innerHTML = counter = (allUsedRows / allRows * 100).toPrecision(4) + '%';
    }

    function checkIdentificationRiskTable() {
        var identificationRiskTable = document.getElementById('identificationRiskTable');
        var counter = 0;
        var allRows = 0;
        allUsedRows = 0;
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (!identificationRiskTable.rows[i].classList.contains('main')) {
                allRows++;
            }
        }
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (identificationRiskTable.rows[i].classList.contains('main')) {
                identificationRiskTable.rows[i].cells[1].innerHTML = counter;
                identificationRiskTable.rows[i].cells[2].innerHTML = (counter / allRows * 100).toFixed(4) + '%';
                counter = 0;
            } else {
                if (identificationRiskTable.rows[i].querySelector('.needWork').value != '0') {
                    counter++;
                    allUsedRows++;
                }
            }
        }
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[1].innerHTML = counter = allRows;
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[2].innerHTML = counter = (allUsedRows / allRows * 100).toPrecision(4) + '%';
    }

    addExperts();
    // addExperts();

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function addExperts() {
        var expertTable = document.getElementById('expertsTable');
        // for (var j = 0; j < 10; j++) {
        //     expertTable.rows[0].deleteCell();
        // }
        // for (var i = 1; i < expertTable.getElementsByTagName('tr').length; i++) {
        //     for (var j = 0; j < 10; j++) {
        //         expertTable.rows[i].deleteCell();
        //     }
        // }
        for (var i = 1; i < expertTable.getElementsByTagName('tr').length; i++) {
            for (var j = 0; j < 10; j++) {
                expertTable.rows[i].insertCell();
                expertTable.rows[i].cells[j + 2].innerHTML = "<input type='number' min='1' max='10' value=" + (getRandomInt(10)+1) + " style='width: 50px;'>"; //getRandomInt(10)+1;
            }
        }
        for (var j = 0; j < 10; j++) {
            expertTable.rows[0].insertCell();
            expertTable.rows[0].cells[j + 2].innerHTML = j + 1;
        }
    }

    createProbabilitytable();

    function createProbabilitytable() {
        $("#probabilityOfEvent tr").remove();
        var tableRes = document.getElementById('probabilityOfEvent');
        var identificationRiskTable = document.getElementById('identificationRiskTable');
        var expertsTable = document.getElementById('expertsTable');
        for (var i = 0; i < allUsedRows + 5; i++) {
            tableRes.insertRow();
            for (var j = 0; j < 27; j++) {
                tableRes.rows[i].insertCell();
            }
        }
        for (var i = 1; i < allUsedRows + 5; i++) {
            if (identificationRiskTable.rows[i - 1].classList[0] == 'main') {
                tableRes.rows[i].className = 'main';
                tableRes.rows[i].cells[1].innerHTML = identificationRiskTable.rows[i - 1].cells[0].innerHTML;
                tableRes.rows[i].cells[2].innerHTML = identificationRiskTable.rows[i - 1].cells[1].innerHTML;
            }
            else if (identificationRiskTable.rows[i - 1].querySelector('.needWork').value != '0') {
                tableRes.rows[i].cells[1].innerHTML = identificationRiskTable.rows[i - 1].cells[0].innerHTML;
                tableRes.rows[i].cells[2].innerHTML = identificationRiskTable.rows[i - 1].querySelector('.needWork').value;
            }
        }
        tableRes.rows[1].cells[0].style = "width: 40px;";
        tableRes.rows[1].cells[2].style = "width: 40px;";
        tableRes.rows[1].cells[3].style = "width: 40px;";
        for (var i = 0; i < 10; i++) {
            tableRes.rows[0].cells[i + 4].style = "width: 40px;";
            tableRes.rows[0].cells[i + 4].innerHTML = (i + 1);
            tableRes.rows[0].cells[i + 15].style = "width: 40px;";
            tableRes.rows[0].cells[i + 15].innerHTML = (i + 1);
        }

        var counterOfExperts = 1;
        var sum = 0;
        var expertsSumArr=[];
        for (var i = 0; i < allUsedRows + 4; i++) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                var expertsSum = 0;
                for (var z = 0; z < 10; z++) {
                    tableRes.rows[i + 1].cells[z + 4].innerHTML = expertsTable.rows[counterOfExperts].cells[z + 2].querySelector('input').value;
                    expertsSum += Number(expertsTable.rows[counterOfExperts].cells[z + 2].querySelector('input').value);
                }
                tableRes.rows[i + 1].cells[14].innerHTML = expertsSum;
                expertsSumArr.push(expertsSum);
                counterOfExperts++;
                continue;
            }
            for (var j = 0; j < 10; j++) {
                tableRes.rows[i + 1].cells[j + 4].innerHTML = "<input type='number' min='0' max='1' step='0.1' value=" +
                 ((Math.random() * (1)).toFixed(2)) + " style='width: 40px;'>";
                sum += Number(tableRes.rows[i + 1].cells[j + 4].querySelector('input').value);
            }
            tableRes.rows[i + 1].cells[14].innerHTML = (sum / 10).toFixed(2);
            sum = 0;
        }
        var mainRow;
        var expertArrCounter = -1;
        var counter = 0;
        var mainCounter = 0;
        for (var i = 0; i < allUsedRows + 4; i++) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                mainRow = i + 1;
                expertArrCounter++;
                counter = 0;
                tableRes.rows[i + 1].cells[0].innerHTML = mainCounter +1;
                mainCounter++;
                continue;
            }
            for (var j = 0; j < 10; j++) {
                tableRes.rows[i + 1].cells[j + 15].innerHTML = (tableRes.rows[mainRow].cells[j + 4].innerHTML * tableRes.rows[i + 1].cells[j + 4].querySelector('input').value).toFixed(2);
                sum += Number(tableRes.rows[i + 1].cells[j + 15].innerHTML);
            }
            tableRes.rows[i + 1].cells[25].innerHTML = (sum/expertsSumArr[expertArrCounter]).toFixed(2);
            tableRes.rows[i + 1].cells[0].innerHTML = counter +1;
            counter++;
            sum = 0;
        }
        for (var j = 0; j < 10; j++) {
            for (var i = allUsedRows ; i > -1; i--) {
                if (identificationRiskTable.rows[i].classList[0] == 'main') {
                    tableRes.rows[i + 1].cells[j + 15].innerHTML =
                     (sum/counter/ Number(tableRes.rows[i+1].cells[j+4].innerHTML)).toFixed(2);
                    sum = 0;
                    counter = 0;
                    continue;   
                } else {
                    sum +=  Number(tableRes.rows[i + 1].cells[j + 15].innerHTML);
                    counter++;
                }
            }
        }
        for (var i = allUsedRows + 4; i >= 0; i--) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                tableRes.rows[i+1].cells[25].innerHTML = (sum/counter).toFixed(2);
                sum = 0;
                counter = 0;
            } else {
                sum += Number(tableRes.rows[i].cells[25].innerHTML);
                counter++;
            }
        }
        var probabilityName;
        tableRes.rows[0].cells[26].innerHTML = "Ймовірність";
        for (var i = 1; i < allUsedRows + 5; i++) {
            var probability = Number(tableRes.rows[i].cells[25].innerHTML);
            if(probability < 0.1){
                probabilityName = "Дуже низькою"
            } else if(probability < 0.25){
                probabilityName = "Низькою"
            } else if(probability < 0.5){
                probabilityName = "Середньою"
            } else if(probability < 0.75){
                probabilityName = "Високою"
            } else {
                probabilityName = "Дуже високою"
            }
            tableRes.rows[i].cells[26].innerHTML = probabilityName;
        }
    }


    function createMoneyTable(){
        var moneyTable = document.getElementById("costs");
        for(var i = 0; i < 4; i++ ){
            var row =moneyTable.insertRow();
            for(var j = 0; j < 7; j++){
                row.insertCell();
            }
        }
        moneyTable.rows[1].cells[0].innerHTML = "Початкова вартість реалізації проекту";
        moneyTable.rows[2].cells[0].innerHTML = "Кінцева вартість реалізації проекту";
        moneyTable.rows[1].cells[6].innerHTML = "тис. грн";
        moneyTable.rows[2].cells[6].innerHTML = "тис. грн";
        for(var i = 1; i< 5; i++){
            moneyTable.rows[0].cells[i+1].innerHTML = i;
        }
        var sum = Math.round((getRandomInt(1000)+300) / 10) * 10;
        moneyTable.rows[1].cells[1].innerHTML = sum;
        var procents = 1;
        var tempProcents;
        for(var i = 4; i > 1; i--){            
            tempProcents = (Math.random() * (1/i)).toFixed(2);
            procents -= tempProcents;
            moneyTable.rows[1].cells[i].innerHTML = "<input type='number' min='1'  value=" + (sum*tempProcents).toFixed() + " style='width: 50px;'>";
        }
        moneyTable.rows[1].cells[5].innerHTML = "<input type='number' min='1'  value=" + (sum*procents).toFixed() + " style='width: 50px;'>";
    }


    addMoneyExperts();

    function addMoneyExperts() {
        var expertCostsTable = document.getElementById('expertsCostsTable');
        for (var i = 1; i < expertCostsTable.rows.length; i++) {
            for (var j = 0; j < 10; j++) {
                expertCostsTable.rows[i].insertCell();
                expertCostsTable.rows[i].cells[j + 2].innerHTML = "<input type='number' min='1' max='10' value=" + (getRandomInt(10)+1) + " style='width: 50px;'>";
            }
        }
        for (var j = 0; j < 10; j++) {
            expertCostsTable.rows[0].insertCell();
            expertCostsTable.rows[0].cells[j + 2].innerHTML = j + 1;
        }
    }


    createMoneyProbabilityTable();




    function createMoneyProbabilityTable() {
        $("#moneyProbability tr").remove();
        var tableMoneyRes = document.getElementById('moneyProbability');
        var identificationRiskTable = document.getElementById('identificationRiskTable');
        var expertsTable = document.getElementById('expertsCostsTable');
        var moneyTable = document.getElementById("costs");
        for (var i = 0; i < allUsedRows + 5; i++) {
            tableMoneyRes.insertRow();
            for (var j = 0; j < 28; j++) {
                tableMoneyRes.rows[i].insertCell();
            }
        }
        var startValue = 0;
        for (var i = 1; i < allUsedRows + 5; i++) {
            if (identificationRiskTable.rows[i - 1].classList[0] == 'main') {
                tableMoneyRes.rows[i].className = 'main';
                tableMoneyRes.rows[i].cells[1].innerHTML = identificationRiskTable.rows[i - 1].cells[0].innerHTML;
                tableMoneyRes.rows[i].cells[2].innerHTML = identificationRiskTable.rows[i - 1].cells[1].innerHTML;
                tableMoneyRes.rows[i].cells[3].innerHTML = moneyTable.rows[1].cells[2+startValue].querySelector('input').value;
                startValue++;
            }
            else if (identificationRiskTable.rows[i - 1].querySelector('.needWork').value != '0') {
                tableMoneyRes.rows[i].cells[1].innerHTML = identificationRiskTable.rows[i - 1].cells[0].innerHTML;
                tableMoneyRes.rows[i].cells[2].innerHTML = identificationRiskTable.rows[i - 1].querySelector('.needWork').value;
            }
        }
        tableMoneyRes.rows[1].cells[0].style = "width: 40px;";
        tableMoneyRes.rows[1].cells[2].style = "width: 40px;";
        tableMoneyRes.rows[1].cells[3].style = "width: 40px;";
        for (var i = 0; i < 10; i++) {
            tableMoneyRes.rows[0].cells[i + 4].style = "width: 40px;";
            tableMoneyRes.rows[0].cells[i + 4].innerHTML = (i + 1);
            tableMoneyRes.rows[0].cells[i + 15].style = "width: 40px;";
            tableMoneyRes.rows[0].cells[i + 15].innerHTML = (i + 1);
        }

        var counterOfExperts = 1;
        var sum = 0;
        var expertsSumArr=[];
        var mainRow;
        var expertArrCounter = -1;
        var counter = 0;
        var mainCounter = 0;
        startValue = 3;
        for (var i = allUsedRows + 4; i >= 0; i--) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {              
                var money = moneyTable.rows[1].cells[2+startValue].querySelector('input').value;
                var procents = 1;
                if(counter > 14)
                counter--;
                for(var j = 1; j < counter; j++){
                    tempProcents = (Math.random() * (1/(j+3))).toFixed(2);
                    procents -= tempProcents;
                    tableMoneyRes.rows[i+j+2].cells[3].innerHTML = (money*tempProcents).toFixed();
                }
                tableMoneyRes.rows[i+2].cells[3].innerHTML = (money*procents).toFixed()
                counter = 0;
                startValue--;
                continue;            
            }
            counter++;
        }
        for (var i = 0; i < allUsedRows + 4; i++) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                var expertsSum = 0;
                for (var z = 0; z < 10; z++) {
                    tableMoneyRes.rows[i + 1].cells[z + 4].innerHTML =
                    expertsTable.rows[counterOfExperts].cells[z + 2].querySelector('input').value;
                    expertsSum += Number(expertsTable.rows[counterOfExperts].cells[z + 2].querySelector('input').value);
                }
                tableMoneyRes.rows[i + 1].cells[14].innerHTML = expertsSum;
                expertsSumArr.push(expertsSum);
                counterOfExperts++;
                continue;
            }
            for (var j = 0; j < 10; j++) {
                tableMoneyRes.rows[i + 1].cells[j + 4].innerHTML = "<input type='number' min='0' max='1' step='0.1' value=" +
                 ((Math.random() * (1)).toFixed(2)) + " style='width: 40px;'>";
                sum += Number(tableMoneyRes.rows[i + 1].cells[j + 4].querySelector('input').value);
            }
            tableMoneyRes.rows[i + 1].cells[14].innerHTML = (sum / 10 * Number(tableMoneyRes.rows[i+1].cells[3].innerHTML).toFixed(1)).toFixed(2);
            sum = 0;
        }
        for (var i = 0; i < allUsedRows + 4; i++) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                mainRow = i + 1;
                expertArrCounter++;
                counter = 0;
                tableMoneyRes.rows[i + 1].cells[0].innerHTML = mainCounter +1;
                mainCounter++;
                continue;
            }
            for (var j = 0; j < 10; j++) {
                tableMoneyRes.rows[i + 1].cells[j + 15].innerHTML = (tableMoneyRes.rows[mainRow].cells[j + 4].innerHTML * tableMoneyRes.rows[i + 1].cells[j + 4].querySelector('input').value).toFixed(2);
                sum += Number(tableMoneyRes.rows[i + 1].cells[j + 15].innerHTML);
            }
            tableMoneyRes.rows[i + 1].cells[25].innerHTML = (sum/expertsSumArr[expertArrCounter]* Number(tableMoneyRes.rows[i+1].cells[3].innerHTML)).toFixed(2);
            var temp = Number(tableMoneyRes.rows[i + 1].cells[25].innerHTML) +  Number(tableMoneyRes.rows[i+1].cells[3].innerHTML);
            tableMoneyRes.rows[i + 1].cells[26].innerHTML = Number(temp).toFixed(1);
            tableMoneyRes.rows[i + 1].cells[0].innerHTML = counter +1;
            counter++;
            sum = 0;
        }
        for (var j = 0; j < 10; j++) {
            for (var i = allUsedRows ; i > -1; i--) {
                if (identificationRiskTable.rows[i].classList[0] == 'main') {
                    tableMoneyRes.rows[i + 1].cells[j + 15].innerHTML =
                     (sum/counter/ Number(tableMoneyRes.rows[i+1].cells[j+4].innerHTML)).toFixed(2);
                    sum = 0;
                    counter = 0;
                    continue;   
                } else {
                    sum +=  Number(tableMoneyRes.rows[i + 1].cells[j + 15].innerHTML);
                    counter++;
                }
            }
        }
        var min = 1000000;
        var max = 0;
        for (var i = allUsedRows + 4; i >= 0; i--) {
            if (identificationRiskTable.rows[i].classList[0] == 'main') {
                tableMoneyRes.rows[i+1].cells[25].innerHTML = (sum).toFixed(2);
                sum = 0;
                counter = 0;
                var temp = Number(tableMoneyRes.rows[i + 1].cells[25].innerHTML) +  Number(tableMoneyRes.rows[i+1].cells[3].innerHTML);
                tableMoneyRes.rows[i + 1].cells[26].innerHTML = Number(temp).toFixed(1);
            } else {
                sum += Number(tableMoneyRes.rows[i].cells[25].innerHTML);
                counter++;
                if(Number(tableMoneyRes.rows[i].cells[25].innerHTML) < min){
                    min = Number(tableMoneyRes.rows[i].cells[25].innerHTML);
                } else if(Number(tableMoneyRes.rows[i].cells[25].innerHTML) > max){
                    max = Number(tableMoneyRes.rows[i].cells[25].innerHTML);
                }
            }
        }
        var middle = (max - min)/3;
        var firstStart = min,
         firstEnd = min+middle;
        var secondStart = firstEnd,
        secondEnd = secondStart + middle;
        var thirdStart = secondEnd,
        thirdEnd = thirdStart+middle;
        var probabilityName;
        tableMoneyRes.rows[0].cells[27].innerHTML = "Ймовірність";
        for (var i = 1; i < allUsedRows + 4; i++) {
            if (finalTable.rows[i].classList[0] == 'main') {
                
            } else {
                var status;
                var temp = Number(tableMoneyRes.rows[i+1].cells[25].innerHTML);
                if( temp < firstEnd){
                    status = "Низький";
                } else if(temp< secondEnd){
                    status = "Середній";
                } else {
                    status = "Високий";
                } 
                tableMoneyRes.rows[i+1].cells[27].innerHTML = status;
        }
            
        }
        tableMoneyRes.rows[allUsedRows + 4].cells[27].innerHTML = "Низькою";
    }

    buildFinalTable();

    function buildFinalTable(){
        var finalTable = document.getElementById('finalTable');
        var tableMoneyRes = document.getElementById('moneyProbability');
        var max = 0;
        var min = 1000000;
        for (var i = 0; i < allUsedRows + 4; i++) {
            finalTable.rows[i].cells[1].innerHTML = tableMoneyRes.rows[i+1].cells[2].innerHTML;
            finalTable.rows[i].cells[2].innerHTML = tableMoneyRes.rows[i+1].cells[25].innerHTML;
            if (finalTable.rows[i].classList[0] == 'main') {
                
            } else {
                if(Number(finalTable.rows[i].cells[2].innerHTML) < min){
                    min = Number(finalTable.rows[i].cells[2].innerHTML);
                } else if(Number(finalTable.rows[i].cells[2].innerHTML) > max){
                    max = Number(finalTable.rows[i].cells[2].innerHTML);
                }
            }
        }
        if(finalTable.rows[1].cells[2].innerHTML > max){
            max = finalTable.rows[1].cells[2].innerHTML;
        }
        var middle = (max - min)/3;
        var firstStart = min,
         firstEnd = min+middle;
        var secondStart = firstEnd,
        secondEnd = secondStart + middle;
        var thirdStart = secondEnd,
        thirdEnd = thirdStart+middle;
        for (var i = 0; i < allUsedRows + 4; i++) {
            finalTable.rows[i].insertCell();
            
            if (finalTable.rows[i].classList[0] == 'main') {
                
            } else {
                var status;
                var temp = Number(finalTable.rows[i].cells[2].innerHTML);
                if( temp < firstEnd){
                    status = "Низький";
                } else if(temp< secondEnd){
                    status = "Середній";
                } else {
                    status = "Високий";
                } 
                finalTable.rows[i].cells[3].innerHTML = status;
            }
        }

    }
});

