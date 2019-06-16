var dateFormat = require('dateformat');

exports.getStrDate = function (pDate)
{
    try
    {
        var strDate = '';

        strDate = dateFormat(pDate, 'dd/mm/yyyy');

        return strDate;
    }
    catch (error)
    {
        return 'NA';
    }
}