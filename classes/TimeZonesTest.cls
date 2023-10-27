@isTest
class TimeZonesTest {
    
    @isTest static void testGetPicklistValues() {
        TimeZones tz = new TimeZones();
        VisualEditor.DynamicPickListRows timeZonePicklistValues = tz.getValues();
        System.assertNotEquals(null, timeZonePicklistValues);
    }
    @isTest static void testGetDefaultValue() {
        TimeZones tz = new TimeZones();
        VisualEditor.DataRow defaultValue = tz.getDefaultValue();
        System.assertNotEquals(null, defaultValue);
    }
}