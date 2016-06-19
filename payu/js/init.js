var PayU = {};
(function (ns, dataSet) {
    var data = dataSet.slice();  // Save a copy of the data passed.
    var selectedStatus = "all";
    /**
     *  init : This function is used to initialize the ns level variables and functions
     * */
    var init = function () {
        bindEvents();
        changeToDateType(data);
        setSelectionTypes(data);
        displayData(data);
        pagination.createPages(data);
    };
    /**
     *  bindEvents : This function is used to bind events
     * */
    var bindEvents = function () {
        var isPaymentDesc = false,
            isDateDesc = false,
            isAmountDesc = false;

        // handle click event on payment-id
        document.getElementById("payment-id").addEventListener("click", function () {
//            sortData(getFilteredData(data, selectedStatus), "paymentId", isPaymentDesc ? "desc" : "asc");
            displayData(pagination.list.sort(function (a, b) {
                return (isPaymentDesc) ? b.paymentId - a.paymentId : a.paymentId - b.paymentId;
            }));
            isPaymentDesc = !isPaymentDesc;
        }, false);

        // handle click event on orderDate
        document.getElementById("date").addEventListener("click", function () {
            sortData(pagination.list, "orderDate", isDateDesc ? "desc" : "asc");
            /*displayData(getFilteredData(data, selectedStatus).sort(function (a, b) {
             return (isDateDesc) ? b.orderDate - a.orderDate : a.orderDate - b.orderDate;
             }));*/
            isDateDesc = !isDateDesc;
        }, false);

        // handle click event on amount
        document.getElementById("amount").addEventListener("click", function () {
//            sortData(getFilteredData(data, selectedStatus), "amount", isAmountDesc ? "desc" : "asc");
            displayData(pagination.list.sort(function (a, b) {
                return (isAmountDesc) ? b.amount - a.amount : a.amount - b.amount;
            }));
            isAmountDesc = !isAmountDesc;
        }, false);

        // handle click event on payment-status
        document.getElementById("payment-status").addEventListener("change", function () {
            selectedStatus = this.value;
            var filteredList = getFilteredData(data, selectedStatus);
            pagination.currentPage=0;
            pagination.itemsPerPage = filteredList.length;
            pagination.currentResults(filteredList);
            pagination.createPages(filteredList)
        }, false);

        // handle click event on pagination-count
        document.getElementById("pagination-pages").addEventListener("change", function () {
            pagination.itemsPerPage = parseInt(this.value);
            pagination.currentResults(getFilteredData(data, selectedStatus));
        }, false);

        // handle click event on next pagination
        document.getElementById("prev").addEventListener("click", function () {
            pagination.prevResults(getFilteredData(data, selectedStatus));
        }, false);

        // handle click event on prev pagination
        document.getElementById("next").addEventListener("click", function () {
            pagination.nextResults(getFilteredData(data, selectedStatus));
        }, false);
    };
    /*
     * changeToDateType: This function will convert the orderDate fieled ot date type
     * */
    var changeToDateType = function (array) {
        var date;
        for (var i = 0; i < array.length; i++) {
            date = new Date(array[i].orderDate);
            array[i].orderDate = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + date.getFullYear();
        }
    };
    /*
     * setSelectionTypes : This function is used to set the options in selectbox
     * */
    var setSelectionTypes = function (array) {
        var tempObj = {}, str = "<option value='all'>All</option> ";
        for (var i = 0; i < data.length; i++) {
            tempObj[data[i].paymentStatus] = "val";
        }
        for (var j in tempObj) {
            str += "<option value='" + j + "'>" + j + "</option>";
        }
        document.getElementsByTagName("select")[0].innerHTML = str;
    };
    /**
     *  displayData : This function takes an array as a param and prints the results in tbody
     * */
    var displayData = function (array) {
        var str = '';
        for (var i = 0; i < array.length; i++) {
            str += '<tr>';
            str += '<td>' + array[i].paymentId + '</td>';
            str += '<td>' + array[i].orderDate + '</td>';
            str += '<td>' + array[i].merchatId + '</td>';
            str += '<td>' + array[i].customerEmail + '</td>';
            str += '<td>' + array[i].amount + '</td>';
            str += '<td>' + array[i].paymentStatus + '</td>';
            str += '</tr>';
        }
        document.getElementsByTagName("tbody")[0].innerHTML = str;
    };
    /**
     *  sortData : This function takes a key as a param, sorts the data and call displayData
     * */
    //todo : implement mergeSort in this
    var sortData = function (array, key, order) {
        for (var i = 0; i < array.length - 1; i++) {
            swap(array, i, getIndex(array, i, key, order))
        }
        /**
         *  getIndex : This function get's the index based on asc/desc condition
         * */
        function getIndex(array, index, key, order) {
            var value = array[index][key],
                tempIndex = index;
            for (var i = index + 1; i < array.length; i++) {
                if (order === "asc" && array[i][key] < value || order === "desc" && array[i][key] > value) {
                    tempIndex = i;
                    value = array[i][key];
                }
            }
            return tempIndex;
        }

        /**
         *  swap : This function swaps the current and next element
         * */
        function swap(array, firstIndex, secondIndex) {
            var temp = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = temp;
        }

        displayData(array);
    };
    /*
     * filterData : This function will filterData based on paymentStatus and display it to the UI
     * */
    var getFilteredData = function (array, filter) {
        var tempArr = [];
        if (filter === "all") {
            tempArr = data;
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i].paymentStatus === filter) {
                    tempArr.push(array[i]);
                }
            }
        }
        return tempArr;
    };
    /*
     * pagination : This is the pagination component
     * */
    var pagination = {
        itemsPerPage: 5,
        totalItems: data.length,
        totalPages: 0,
        currentPage: 0,
        list: [],
        currentResults: function (array) {
            var tempArr = [];
            var start = this.currentPage;
            var end = this.itemsPerPage + this.currentPage;
            for (var i = this.currentPage; i < this.itemsPerPage + this.currentPage && i < getFilteredData(data, selectedStatus).length; i++) {
                tempArr.push(array[i]);
            }
            displayData(tempArr);
            this.list = tempArr;
            if (tempArr.length === array.length) {
                this.disableNextBtn();
                this.disablePrevBtn();
            } else {
                this.enableNextBtn();
            }
            console.log("Start ", start);
            console.log("End ", end);
            console.log("itemsPerPage ", this.itemsPerPage);
            console.log("Array ", tempArr);
        },
        nextResults: function (array) {
            this.currentPage += this.itemsPerPage;
            var tempArr = [];
            var start = this.currentPage;
            var end = this.itemsPerPage + this.currentPage;
            for (var i = this.currentPage; i < this.itemsPerPage + this.currentPage && i < getFilteredData(data, selectedStatus).length; i++) {
                tempArr.push(array[i]);
            }
            this.enablePrevBtn();
            console.log("Start ", start);
            console.log("End ", end);
            console.log("itemsPerPage ", this.itemsPerPage);
            console.log("Array ", tempArr);
            displayData(tempArr);
            this.list = tempArr;
            if (this.itemsPerPage + this.currentPage >= getFilteredData(data, selectedStatus).length) {
                this.disableNextBtn();
                return false;
            }
            /*if (!tempArr.length) {
             document.getElementById("next").setAttribute("disabled", "disabled")
             return false;
             }*/
        },
        prevResults: function (array) {
            this.currentPage -= this.itemsPerPage;
            var tempArr = [];
            var start = this.itemsPerPage + this.currentPage;
            var end = this.currentPage;
            this.enableNextBtn();
            for (var i = start - 1; i >= end; i--) {
                tempArr.push(array[i]);
            }
            console.log("Start ", start);
            console.log("End ", end);
            console.log("itemsPerPage ", this.itemsPerPage);
            console.log("Array ", tempArr);
            this.list = tempArr;
            displayData(tempArr.reverse());
            if (!end) {
                this.disablePrevBtn();
                return false;
            }
        },
        createPages: function (array) {
            var str = "";
            for (var i = 0; i < array.length; i++) {
                if (i + 1 === pagination.itemsPerPage) {
                    str += "<option selected value='" + (i + 1) + "'>" + (i + 1) + "</option> ";
                } else {
                    str += "<option value='" + (i + 1) + "'>" + (i + 1) + "</option> ";
                }
            }
            document.getElementById("pagination-pages").innerHTML = str;
            document.getElementById("prev").setAttribute("disabled", "disabled");
            pagination.currentResults(getFilteredData(array, selectedStatus));
        },
        enableNextBtn: function () {
            document.getElementById("next").removeAttribute("disabled", "disabled");
        },
        disableNextBtn: function () {
            document.getElementById("next").setAttribute("disabled", "disabled");
        },
        enablePrevBtn: function () {
            document.getElementById("prev").removeAttribute("disabled", "disabled");
        },
        disablePrevBtn: function () {
            document.getElementById("prev").setAttribute("disabled", "disabled");
        }
    };
    ns.initApp = init;
    ns.pagination = pagination;
})(PayU, dummydata); // Passed namespace and dummyData to the code

PayU.initApp();