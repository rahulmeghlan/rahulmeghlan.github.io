/*
 Problem Statement :
 You are querying a 3rd party medical record system, they provide you two functions:
 1. contain( SSN, index1, index2), it will return true/ false for whether or not it has the medical record of person with that SSN which sits in between the two index.
 2. get( index ), this will return the medical record at that index.

 The system is a collection of medical records that you can only access it through index,
 but the problem is that the only information you have from the patient is ssn.
 So you have to find out what is the index of the medical record of person with that SSN.
 how the 3rd party system implement the contain function is not your concern,
 it maybe fast or slow, regardless, you need to minimize the times you call this function.
 */


/**
 * @name: MedicalSystemRecords
 * @description : Function returns total medical records passed either from
 * */
var MedicalSystemRecords = (function () {
    var totalRecords = 100000;

    // Create a Dummy Data Set which is sorted based on ssn
    function createDataSet() {
        var dataSet = [
            {ssn: 123456789, name: "rahul", medicalCondition: "fit"}
        ];
        // Setting 1 million records in dataSet
        for (var i = 1; i < totalRecords; i++) {
            dataSet.push({ssn: (dataSet[i - 1].ssn + 1), name: "rahul" + i, medicalCondition: (i % 2 === 0 ? "fit" : "not fit")});

            if (i === totalRecords - 1) {
                var $element = document.getElementsByClassName("loading-page")[0];
                $element.style.height = 0;
                $element.innerText = "Done.";
                var timeout = setTimeout(function () {
                    $element.style.display = "none";
                    clearTimeout(timeout);
                }, 1000);
            }
        }
        return dataSet;
    }

    return {
        recordsInfo: createDataSet(),
        totalRecords: totalRecords
    };
})();

/*
 Third Party Library Containing Two Functions contain & get functions
 */
var Library = (function (medicalRecords) {
    // Expose public api of the library
    return {
        // Return if ssn lies between the range from index1 & index2
        contain: function (ssn, index1, index2) {
            return (ssn >= medicalRecords[index1].ssn && ssn <= medicalRecords[index2].ssn);
        },
        // Returns dataSet for the passed Index
        get: function (index) {
            return medicalRecords[index];
        }
    }
})(MedicalSystemRecords.recordsInfo);


/**
 * @name : UserInterface
 * @description : This function is used in the UI to get the ssn and return medical records
 * */
var UserInterface = (function (lib, totalRecords) {
    function findMedicalRecord(e, ssn) {
        e.preventDefault();
        if (ssn < lib.get(0).ssn || ssn > lib.get(totalRecords - 1).ssn) {
            alert("Please enter a valid SSN . \n Starting from " + lib.get(0).ssn + " to " + lib.get(totalRecords - 1).ssn);
        } else {
            searchInRecords(ssn, 0, Math.floor(totalRecords / 2));
        }
    }

    /**
     * @name: searchInRecords
     * @description: This is the internal function which recursively searches for medical records using Binary Search Algo
     * @params: ssn, index1, index2
     * */
    function searchInRecords(ssn, index1, index2) {
        setProgressBar(100 - (index2 - index1), "visible");

        if (index1 !== index2) {
            if (lib.contain(ssn, index1, index2)) {
                searchInRecords(ssn, index1, Math.floor((index1 + index2) / 2))
            } else {
                searchInRecords(ssn, index2 + 1, totalRecords - 1);
            }
        } else if (lib.contain(ssn, index1, index2)) {
            displayResult(lib.get(index1));
        } else {
            searchInRecords(ssn, index1 + 1, index2 + 1); // this is done, because we are doing Math.floor for index2
        }
    }

    function setProgressBar(searchPercentage, state) {
        var $progressBar = document.getElementsByClassName("progress-bar")[0];
        document.getElementById("search-bar").style.visibility = state;
        $progressBar.style.width = searchPercentage + "%";
        $progressBar.innerHTML = searchPercentage + "%";
    }

    function displayResult(obj) {
        document.getElementsByClassName("result-table")[0].style.visibility = "visible";
        document.getElementsByClassName("res-ssn")[0].innerText = obj.ssn;
        document.getElementsByClassName("res-name")[0].innerText = obj.name;
        document.getElementsByClassName("res-mc")[0].innerText = obj.medicalCondition;
    }


    return {
        findMedicalRecord: findMedicalRecord,
        resetProgressBar: function (e) {
            if (e.keyCode !== 13) {
                setProgressBar(0, "hidden");
            }
        }
    };
})(Library, MedicalSystemRecords.totalRecords);

