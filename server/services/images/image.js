var AWS = require('aws-sdk');

var BUCKET = 'camaleon';
var ACL = 'public-read';

var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

//////////////////////////////////---------------------------------METHODS
exports.saveStoreImage = function (body, files)
{
    try
    {
        var store = body;
        var key = getKeyStore({ codeName: store.codeName, name: files.image.name, contentType: files.image.mimetype });

        console.log('key:::' + key);

        var params = {
            key: key,
            body: files.image.data,
            contentType: files.image.mimetype
        };

        saveImageS3(params);
    }
    catch (error)
    {
        console.log('error in image - saveStoreImage:::' + error);
    }
};


function getKeyStore(params)
{
    try
    {
        var keyStore = null;

        keyStore = 'store/' + params.codeName + '/logo/logo.' + params.name.split('.')[1];

        return keyStore;
    }
    catch (error)
    {
        console.log('error in image - getKeyStore:::' + error);
        return null;
    }
}


saveImageS3 = function (params)
{
    try
    {
        var parameters = {
            Bucket: BUCKET,
            Key: params.key,
            Body: params.body,
            ACL: ACL,
            ContentType: params.contentType
        };

        s3.putObject(parameters, (err, data) =>
        {
            if (err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
            }
        });
    }
    catch (error)
    {
        console.log('error in image - saveImageS3:::' + error);
    }
}


//deprecated
exports.saveImage = function (file)
{
    var path = 'server/temp/' + file.name;

    file.mv(path, err =>
    {
        if (err)
        {
            console.log(err);
        }
    })
}






