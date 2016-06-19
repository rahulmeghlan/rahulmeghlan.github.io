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

(function (lib) {
    lib.contain(123456789, 0, 10); // Initial Functions to check
    lib.get(11);
})(Library);


/*
 Third Party Library Containing Two Functions contain & get functions
 */
var Library = (function (env) {
    // This works both with node instance and browser window instance
//    env.dataSet = typeof env.argv !== "undefined" && env.argv[env.argv.length - 1].charAt(0) === "[" ? JSON.parse(env.argv[env.argv.length - 1]) : env.dataSet;

    // store the data set passed at run-time or create a data set.
    var dataSet = env.dataSet && env.dataSet.length ? env.dataSet : createDataSet();

    // Create a Dummy Data Set which is sorted based on ssn
    function createDataSet() {
        var dataSet = [
            {ssn: 123456789, name: "rahul", medicalCondition: "fit"}
        ];
        for (var i = 1; i < 100; i++) {
            dataSet.push({ssn: (dataSet[i - 1].ssn + 1), name: "rahul" + i, medicalCondition: (i % 2 === 0 ? "fit" : "not fit")});
        }
        return dataSet;
    }

    // Expose public api of the library
    return {
        // Return if ssn lies between the range from index1 & index2
        contain: function (ssn, index1, index2) {
            return (ssn >= dataSet[index1].ssn && ssn <= dataSet[index2].ssn);
        },
        // Returns dataSet for the passed Index
        get: function (index) {
            return dataSet[index];
        },
        totalRecords: dataSet.length
    }
})(env = typeof window !== "undefined" ? window : process);

/**
 * @name: MedicalSystemRecords
 * @description : Function returns total medical records passed either from
 * */
var MedicalSystemRecords = (function () {
})();
