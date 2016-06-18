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
    // Create a Dummy Data Set which is sorted based on ssn
    function createDataSet() {
        var dataSet = [
            {ssn: 123456789, name: "rahul", medicalCondition: "fit"}
        ];
        for (var i = 1; i < 1000000; i++) {
            dataSet.push({ssn: (dataSet[i - 1].ssn + 1), name: "rahul" + i, medicalCondition: (i % 2 === 0 ? "fit" : "not fit")});
        }
        return dataSet;
    }

    return {
        recordsInfo: createDataSet(),
        totalRecords: createDataSet().length
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
        setProgressBar(0);
        if (ssn < lib.get(0).ssn || ssn > lib.get(totalRecords - 1).ssn) {
            alert("Please enter a valid SSN");
        } else {
            searchInRecords(ssn, 0, Math.floor(totalRecords / 2));
        }
    }

    function searchInRecords(ssn, index1, index2) {        //Add a progress bar
        setProgressBar(100 - (index2 - index1));

        if (index1 !== index2) {
            if (lib.contain(ssn, index1, index2)) {
                searchInRecords(ssn, index1, Math.floor((index1 + index2) / 2))
            } else {
                searchInRecords(ssn, index2 + 1, totalRecords - 1);
            }
        } else if (lib.contain(ssn, index1, index2)) {
            console.log(lib.get(index1));
        } else {
            searchInRecords(ssn, index1 + 1, index2 + 1); // this is done, because we are doing Math.floor for index2
        }
    }

    function setProgressBar(searchPercentage) {
        document.getElementsByClassName("progress-bar")[0].style.width = searchPercentage + "%";
        document.getElementsByClassName("progress-bar")[0].innerHTML = searchPercentage + "%";
    }


    return {
        findMedicalRecord: findMedicalRecord,
        resetProgressBar: function () {
            setProgressBar(0);
        }
    };
})
(Library, MedicalSystemRecords.totalRecords);

