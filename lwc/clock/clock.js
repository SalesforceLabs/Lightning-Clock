import { LightningElement, api, track } from 'lwc';

export default class Clock extends LightningElement {
    @api flexipageRegionWidth;

    @api militaryFormat;

    @api darkMode;

    _timeZone1;
    @track _timeZone1Label;
    @track timeOffsetLabel1;

    @api
    get timeZone1() {
        return this._timeZone1;
    }

    set timeZone1(value) {
        this._timeZone1 = value;
        this.timeOffsetLabel1 = this.calculateOffsetLabel(value);
        this._timeZone1Label = value.replace("_", " ");
        this.updateAllTimeZones();
    }
    
    _timeZone2;
    @track _showTimeZone2;
    @track _timeZone2Label;
    @track timeOffsetLabel2;

    @api
    get timeZone2() {
        return this._timeZone2;
    }

    set timeZone2(value) {
        this._timeZone2 = value;
        if (value) {
            this._showTimeZone2 = true;
        } else {
            this._showTimeZone2 = false;
        }
        this.timeOffsetLabel2 = this.calculateOffsetLabel(value);
        this._timeZone2Label = value.replace("_", " ");
        this.updateAllTimeZones();
    }
    
    _timeZone3;
    @track _timeZone3Label;
    @track _showTimeZone3;
    @track timeOffsetLabel3;

    @api
    get timeZone3() {
        return this._timeZone3;
    }

    set timeZone3(value) {
        this._timeZone3 = value;
        if (value) {
            this._showTimeZone3 = true;
        } else {
            this._showTimeZone3 = false;
        }
        this.timeOffsetLabel3 = this.calculateOffsetLabel(value);
        this._timeZone3Label = value.replace("_", " ");
        this.updateAllTimeZones();
    }
    
    _timeZone4;
    @track _timeZone4Label;
    @track _showTimeZone4;
    @track timeOffsetLabel4;

    @api
    get timeZone4() {
        return this._timeZone4;
    }

    set timeZone4(value) {
        this._timeZone4 = value;
        if (value) {
            this._showTimeZone4 = true;
        } else {
            this._showTimeZone4 = false;
        }
        this.timeOffsetLabel4 = this.calculateOffsetLabel(value);
        this._timeZone4Label = value.replace("_", " ");
        this.updateAllTimeZones();
    }

    @track hour1 = '00';
    @track min1 = '00';

    @track hour2 = '00';
    @track min2 = '00';

    @track hour3 = '00';
    @track min3 = '00';

    @track hour4 = '00';
    @track min4 = '00';

    _periodClass;
    _isMilitaryFormat;
    _containerClass;

    get _infoSectionClass() {
        return this.convertBoolean(this.darkMode) ? "infoSection darkMode" : "infoSection";
    }

    get _timeSectionClass() {
        return this.convertBoolean(this.darkMode) ? "timeSection darkMode" : "timeSection";
    }
    
    renderedCallback() {
        this.configContainerClass();
        this.configPeriodClass();
        setInterval(this.updateTime.bind(this, this._timeZone1, this._timeZone2, this._timeZone3, this._timeZone4), 30000);
    }
    
    connectedCallback() { 
        this.updateAllTimeZones();
        this._militaryFormat = this.convertBoolean(this.militaryFormat);
    }

    configPeriodClass() {
        this._periodClass = this.convertBoolean(this.darkMode) ? "period darkMode" : "period";
    }

    configContainerClass() {
        // Make conatiner responsive to different region
        // e.g Large resgion, if clock has one 1, it should stretch through the whole region
        let widthClass = '';
        let numClock = this.template.querySelectorAll('div.container').length;
        if (this.flexipageRegionWidth === 'XLARGE' || this.flexipageRegionWidth === 'LARGE') {
            if (numClock >= 3) {
                widthClass = 'slds-size_1-of-3 widthLarge';
            } else if (numClock === 2) {
                widthClass = 'slds-size_1-of-2 widthLarge';
            }
            
        } else if (this.flexipageRegionWidth === 'MEDIUM') {
            if (numClock >= 2) {
                widthClass = 'slds-size_1-of-2 widthMedium';
            }
        }
        this._containerClass = this.convertBoolean(this.darkMode) ? "slds-card darkMode " +  widthClass : "slds-card " + widthClass;
    }

    calculateOffsetLabel(tz) {
        // Calculate the offset label compare to current user time
        var timezoneDate = new Date();
        
        var now = new Date();
        var timezone  = new Date(now.toLocaleString("en-us", {timeZone: tz}));

        var nowDate = now.getDate();
        var timezoneDate = timezone.getDate();
        var day = "";
        if (timezoneDate > nowDate) {
            day = "Tomorrow";
        } else if (timezoneDate < nowDate) {
            day = "Yesterday";
        } else {
            day = "Today";
        }

        var difference = ((timezone.getTime() - now.getTime())/ 1000 / 60 / 60).toFixed(2).toString();

        var hours = difference.split(".")[0];
        hours = hours.startsWith("-") ? hours : "+" + hours;
        hours = hours == "-0" ? "+0" : hours;
        var minutes = difference.split(".")[1];
        var differenceLabel = hours;
        if (minutes === "25") {
            differenceLabel += ":15";
        } else if (minutes === "50") {
            differenceLabel += ":30";
        } else if (minutes === "75") {
            differenceLabel += ":45"
        } else {
            differenceLabel += "HRS";
        }

        return day + ", " + differenceLabel;
    }

    updateAllTimeZones() {
        this.updateTime(this._timeZone1, this._timeZone2, this._timeZone3, this._timeZone4);
    }

    updateTime(timeZone1Id, timeZone2Id, timeZone3Id, timeZone4Id) {  
        //================= Zone1 Display Time Config ===================================
        let last = new Date(0);
        last.setUTCHours(-1);
        let now = new Date(new Date().toLocaleString("en-US", {timeZone: timeZone1Id}));
        const lastHours = last.getHours().toString()
        const nowHours = now.getHours().toString()
        if (lastHours !== nowHours) {
            this.period = this.calculatePeriod(parseInt(now.getHours()));
            const hours = this.generateTimesArray(nowHours, true);
            this.hour1 = hours[0] + hours[1];
        }
        
        const lastMinutes = last.getMinutes().toString()
        const nowMinutes = now.getMinutes().toString()
        if (lastMinutes !== nowMinutes) {
            const mins = this.generateTimesArray(nowMinutes, false);
            this.min1 = mins[0] + mins[1];
        }
        
        last = now;

        //================= Zone2 Display Time Config ===================================
        if (timeZone2Id) {
            let last2 = new Date(0);
            last2.setUTCHours(-1);
            let now2 = new Date(new Date().toLocaleString("en-US", {timeZone: timeZone2Id}));
            const lastHours2 = last2.getHours().toString()
            const nowHours2 = now2.getHours().toString()
            if (lastHours2 !== nowHours2) {
                this.period2 = this.calculatePeriod(parseInt(now2.getHours()));
                const hours2 = this.generateTimesArray(nowHours2, true);
                this.hour2 = hours2[0] + hours2[1];
            }
            
            const lastMinutes2 = last2.getMinutes().toString()
            const nowMinutes2 = now2.getMinutes().toString()
            if (lastMinutes2 !== nowMinutes2) {
                const mins2 = this.generateTimesArray(nowMinutes2, false);
                this.min2 = mins2[0] + mins2[1];
            }

            last2 = now2;
        }

        //================= Zone3 Display Time Config ===================================
        if (timeZone3Id) {
            let last3 = new Date(0);
            last3.setUTCHours(-1);
            let now3 = new Date(new Date().toLocaleString("en-US", {timeZone: timeZone3Id}));
            const lastHours3 = last3.getHours().toString()
            const nowHours3 = now3.getHours().toString()
            if (lastHours3 !== nowHours3) {
                this.period3 = this.calculatePeriod(parseInt(now3.getHours()));
                const hours3 = this.generateTimesArray(nowHours3, true);
                this.hour3 = hours3[0] + hours3[1];
            }
            
            const lastMinutes3 = last3.getMinutes().toString()
            const nowMinutes3 = now3.getMinutes().toString()
            if (lastMinutes3 !== nowMinutes3) {
                const mins3 = this.generateTimesArray(nowMinutes3, false);
                this.min3 = mins3[0] + mins3[1];
            }

            last3 = now3;
        }

        //================= Zone3 Display Time Config ===================================
        if (timeZone4Id) {
            let last4 = new Date(0);
            last4.setUTCHours(-1);
            let now4 = new Date(new Date().toLocaleString("en-US", {timeZone: timeZone4Id}));
            const lastHours4 = last4.getHours().toString()
            const nowHours4 = now4.getHours().toString()
            if (lastHours4 !== nowHours4) {
                this.period4 = this.calculatePeriod(parseInt(now4.getHours()));
                const hours4 = this.generateTimesArray(nowHours4, true);
                this.hour4 = hours4[0] + hours4[1];
            }
            
            const lastMinutes4 = last4.getMinutes().toString()
            const nowMinutes4 = now4.getMinutes().toString()
            if (lastMinutes4 !== nowMinutes4) {
                const mins4 = this.generateTimesArray(nowMinutes4, false);
                this.min4 = mins4[0] + mins4[1];
            }

            last4 = now4;
        }
    }

    generateTimesArray (newTime, isHour) {
        // Based on the time object hours/ mins to get correct time based on whether it is 24 hour format or AM/PM format
        if (!this.convertBoolean(this.militaryFormat) && parseInt(newTime) > 12 && isHour) {
            newTime = (parseInt(newTime) - 12).toString();
        } 
        var time = newTime.split('');
        
        if (time.length === 1) {
            time.unshift('0');
        } else {
            
        }
        return time;
    }

    calculatePeriod (hours) {
        // Calculate AM/PM based on hours if AM/PM format is used
        if (!this.convertBoolean(this.militaryFormat)) {
            if (hours < 12) {
                return "AM";
            } else {
                return "PM";
            }
        }
        return '';
    }

    convertBoolean(value) {
        // Convert DB saved boolean value from string to boolean type
        return (typeof value === 'string') ? 'true' === value : value;
    }
}