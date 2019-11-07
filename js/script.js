document.addEventListener('DOMContentLoaded', function () {
    
    checkSourceOfRisksTable();
    checkIdentificationRiskTable();

    document.getElementById('sourceOfRisksTable').addEventListener('change', checkSourceOfRisksTable);
    document.getElementById('identificationRiskTable').addEventListener('change', checkIdentificationRiskTable);

    function checkSourceOfRisksTable() {
        var identificationRiskTable = document.getElementById('sourceOfRisksTable');
        var counter = 0;
        var allRows = 0;
        var allUsedRows = 0;
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (!identificationRiskTable.rows[i].classList.contains('main')) {
                allRows++;
            }
        }
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (identificationRiskTable.rows[i].classList.contains('main')) {
                identificationRiskTable.rows[i].cells[1].innerHTML = counter;
                identificationRiskTable.rows[i].cells[2].innerHTML = (counter/allRows*100).toPrecision(4) + '%';
                counter = 0;
            } else {
                if (identificationRiskTable.rows[i].querySelector('.needWork').value == '1'){
                    counter++;
                    allUsedRows++;
                }
            }
        }
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[1].innerHTML = counter = allRows;
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[2].innerHTML = counter = (allUsedRows/allRows*100).toPrecision(4)+'%';
    }

    function checkIdentificationRiskTable() {
        var identificationRiskTable = document.getElementById('identificationRiskTable');
        var counter = 0;
        var allRows = 0;
        var allUsedRows = 0;
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (!identificationRiskTable.rows[i].classList.contains('main')) {
                allRows++;
            }
        }
        for (var i = identificationRiskTable.getElementsByTagName('tr').length - 2; i > -1; i--) {
            if (identificationRiskTable.rows[i].classList.contains('main')) {
                identificationRiskTable.rows[i].cells[1].innerHTML = counter;
                identificationRiskTable.rows[i].cells[2].innerHTML = (counter/allRows*100).toPrecision(4) + '%';
                counter = 0;
            } else {
                if (identificationRiskTable.rows[i].querySelector('.needWork').value == '1'){
                    counter++;
                    allUsedRows++;
                }
            }
        }
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[1].innerHTML = counter = allRows;
        identificationRiskTable.rows[identificationRiskTable.getElementsByTagName('tr').length - 1].cells[2].innerHTML = counter = (allUsedRows/allRows*100).toPrecision(4)+'%';
    }

    function selectChecker(){
        Element
    }

});