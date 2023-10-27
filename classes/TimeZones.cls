global class TimeZones extends VisualEditor.DynamicPickList{
    
    global override VisualEditor.DataRow getDefaultValue(){
        TimeZone tz = UserInfo.getTimeZone();
        return new VisualEditor.DataRow(tz.getDisplayName(), tz.toString());
    }

    global override VisualEditor.DynamicPickListRows getValues() {
        // Salesforce supported timezones only: https://help.salesforce.com/articleView?id=admin_supported_timezone.htm&type=5

        List<String> timeZones =  new List<String>{
            'Pacific/Kiritimati','Pacific/Enderbury','Pacific/Tongatapu','Pacific/Chatham','Pacific/Auckland','Pacific/Fiji','Asia/Kamchatka','Pacific/Norfolk','Australia/Lord_Howe','Pacific/Guadalcanal','Australia/Adelaide','Australia/Sydney','Australia/Brisbane','Australia/Darwin','Asia/Seoul','Asia/Tokyo','Asia/Hong_Kong','Asia/Kuala_Lumpur','Asia/Manila','Asia/Shanghai','Asia/Singapore','Asia/Taipei','Australia/Perth','Asia/Bangkok','Asia/Ho_Chi_Minh','Asia/Jakarta','Asia/Rangoon','Asia/Dhaka','Asia/Kathmandu','Asia/Colombo','Asia/Kolkata','Asia/Karachi','Asia/Tashkent','Asia/Yekaterinburg','Asia/Kabul','Asia/Baku','Asia/Dubai','Asia/Tbilisi','Asia/Yerevan','Asia/Tehran','Africa/Nairobi','Asia/Baghdad','Asia/Kuwait','Asia/Riyadh','Europe/Minsk','Europe/Moscow','Africa/Cairo','Asia/Beirut','Asia/Jerusalem','Europe/Athens','Europe/Bucharest','Europe/Helsinki','Europe/Istanbul','Africa/Johannesburg','Europe/Amsterdam','Europe/Berlin','Europe/Brussels','Europe/Paris','Europe/Prague','Europe/Rome','Europe/Lisbon','Africa/Algiers','Europe/London','Atlantic/Cape_Verde','Africa/Casablanca','Europe/Dublin','GMT','America/Scoresbysund','Atlantic/Azores','Atlantic/South_Georgia','America/St_Johns','America/Sao_Paulo','America/Argentina/Buenos_Aires','America/Santiago','America/Halifax','America/Puerto_Rico','Atlantic/Bermuda','America/Caracas','America/Indiana/Indianapolis','America/New_York','America/Bogota','America/Lima','America/Panama','America/Mexico_City','America/Chicago','America/El_Salvador','America/Denver','America/Mazatlan','America/Phoenix','America/Los_Angeles','America/Tijuana','Pacific/Pitcairn','America/Anchorage','Pacific/Gambier','America/Adak','Pacific/Marquesas','Pacific/Honolulu','Pacific/Niue','Pacific/Pago_Pago'
        };
        VisualEditor.DynamicPickListRows timeZonePicklistValues = new VisualEditor.DynamicPickListRows();

        TimeZone userTz = UserInfo.getTimeZone();
        timeZonePicklistValues.addRow(new VisualEditor.DataRow(userTz.getDisplayName(), userTz.toString()));

        for (String tz : timeZones) {
            if (tz != userTz.toString()) {
                Timezone tzLabel = Timezone.getTimeZone(tz);
                timeZonePicklistValues.addRow(new VisualEditor.DataRow(tzLabel.getDisplayName(), tz));
            }
        }

        return timeZonePicklistValues;
    }
}