var Cal = function (divId) {


    //Store div id
    this.divId = divId;

    // Days of week, starting on Sunday
    this.DaysOfWeek = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];

    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Set the current month, year
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);

    var c = this;

    // Bind next and previous button clicks
    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
    };
};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m) {

    var d = new Date()
        // First day of the week in the selected month
        , firstDayOfMonth = new Date(y, m, 1).getDay()
        // Last day of the selected month
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Write selected month and year
    html += '<thead><tr>';
    html += '<td colspan="2"><button id="btnPrev" type="button">« Prev</button>';
    html += '<td colspan="3"><h2>' + this.Months[m] + ' ' + y + '</h2>';
    html += '<td colspan="2"><button id="btnNext" type="button">Next »</button>';
    html += '</td>';
    html += '</tr></thead></table>';

    html += '<table>';

    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<th>' + this.DaysOfWeek[i] + '</th>';
    }
    html += '</tr>';


    //add event days calculations
    var event_days = [new Date(2022, 3, 8), new Date(2022, 3, 14), new Date(2022, 3, 25)];

    // Write the days
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // If Monday, start new row
        if (dow == 1) {
            html += '<tr>';
        }
        // If not Monday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
            html += '<tr>';
            if (firstDayOfMonth != 0) {
                var k = lastDayOfLastMonth - firstDayOfMonth + 2;

                for (var j = 1; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
                // If Sunday is the first day
            } else {
                var k = lastDayOfLastMonth - 7 + 2;

                for (var j = 1; j < 7; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today"';
        } else {
            html += '<td class="normal"';
        }

        // check if event day or not
        for (let index = 0; index < event_days.length; index++) {
            if (event_days[index].valueOf() == new Date(y, m, i).valueOf()) {
                html += " id='event_day'";
            }
        }

        html += ">" + i + "</td>";

        // If Sunday, closes the row
        if (dow == 0) {
            html += '</tr>';
        }
        // If not Sunday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
            html += '<td class="not-current">' + k + '</td>'
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Closes table
    html += '</table>';

    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function () {

    // Start calendar
    var c = new Cal("calendar_body");
    c.showcurr();
}

// Get element by id
function getId(id) {
    return document.getElementById(id);
}