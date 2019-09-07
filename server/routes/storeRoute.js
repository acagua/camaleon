var express = require('express');
var fileUpload = require('express-fileupload');

var imageHelper = require('../services/images/image.js');

var Store = require('../models/store.js');
var User = require('../models/user.js');
var UserAccess = require('../models/userAccess.js');

var app = express();

app.use(fileUpload());

//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
    var desde = Number(req.query.desde) || 0;
    var hasta = Number(req.query.hasta) || 5;

    Store.find({})
        .skip(desde)
        .limit(hasta)
        .exec(
            function (err, stores)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving stores',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: stores
                    });
                }
            });
});


app.get('/:id', function (req, res)
{
    var id = req.params.id;

    Store.findById(id, (err, store) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching store',
                errors: err
            });
        }
        else
        {
            if (!store)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The store with id: ' + id + 'does not exist',
                    errors: { message: 'Store with id does not exist' }
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: store
                });
            }
        }
    });
});


app.get('/name/:name', function (req, res)
{
    var storeName = req.params.name;

    Store.findOne({ codeName: storeName }, (err, store) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching store',
                errors: err
            });
        }
        else
        {
            if (!store)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The store with name: ' + storeName + 'does not exist',
                    errors: { message: 'The store with name: ' + storeName + 'does not exist' }
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: store
                });
            }
        }
    });
});


app.get('/random/normal', function (req, res)
{
    var limit = Number(req.query.limit) || 5;

    var filter = { status: Store.Status.ACTIVE };
    var fields = {};
    var options = { limit: limit };
    Store.findRandom(filter, fields, options, function (err, documents)
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error retrieving stores',
                errors: err
            });
        }
        else
        {
            return res.status(200).json({
                title: 'random stores',
                ok: true,
                documents: documents
            });
        }
    });
});


app.get('/random/category/:categoryId', function (req, res)
{
    var categoryId = req.params.categoryId;

    var limit = Number(req.query.limit) || 5;

    var filter = { status: Store.Status.ACTIVE, _categoryId: categoryId };
    var fields = {};
    var options = { limit: limit };
    Store.findRandom(filter, fields, options, function (err, stores)
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error retrieving stores',
                errors: err
            });
        }
        else
        {
            return res.status(200).json({
                title: 'random by category',
                ok: true,
                documents: stores
            });
        }
    });
});


app.post('/', function (req, res)
{
    var body = req.body;
    var userId = body.userId;
    console.log('b:::body', body);

    if (!req.files)
    {
        return res.status(400).json({
            ok: false,
            message: 'File for image was not found',
            errors: 'File for image was not found'
        });
    }
    if (!userId || userId == 'null')
    {
        return res.status(400).json({
            ok: false,
            message: 'User ID was not found',
            errors: 'User ID was not found'
        });
    }

    var codeName = getCodeName(body.name);

    var store = new Store({
        name: body.name,
        codeName: codeName,
        description: body.description,
        _categoryId: body.category,
        imageLogo: 'https://camaleon.s3.amazonaws.com/store/' + codeName + '/logo/logo.' + req.files.image.name.split('.')[1],
        emails: body.email,
        _userIds: userId
    });

    store.save(function (err, storeSaved)
    {
        if (err)
        {
            return res.status(400).json({
                ok: false,
                message: 'Error creating store',
                errors: err
            });
        }
        else
        {
            //move image
            imageHelper.saveStoreImage(storeSaved, req.files);
            //\move image

            //associate user to this store:
            User.findById(userId, (err, userSearched) =>
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error searching user but store was created',
                        errors: err
                    });
                }
                else
                {
                    if (!userSearched)
                    {
                        return res.status(400).json({
                            ok: false,
                            message: 'The user with id: ' + userId + 'does not exist but store was created',
                            errors: { message: 'The user with id: ' + userId + 'does not exist but store was created' }
                        });
                    }
                    else
                    {
                        //once the user is created, an user access must be created on the user
                        var userAccess = new UserAccess({ _storeId: storeSaved._id, roles: [UserAccess.Roles.ADMIN] });
                        userSearched.access = userAccess;

                        userSearched.save((err, userSaved) =>
                        {
                            if (err)
                            {
                                return res.status(500).json({
                                    ok: false,
                                    message: 'Error saving user but store was created',
                                    errors: err
                                });
                            }
                            else
                            {
                                console.log('user access added');
                            }
                        });
                    }
                }
            });
            //\associate user to this store:

            return res.status(201).json({
                ok: true,
                document: storeSaved
            });
        }
    });
});


app.put('/:id', (req, res) =>
{
    var id = req.params.id;
    var body = req.body;

    // console.log('update body:::', body);
    // console.log('update file:::', req.files);

    imageHelper.saveImageS3(req, res);
    ////////////////////////////////////////////////////////

    // var id = req.params.id;
    // var body = req.body;

    // console.log('update body:::', body);

    // Store.findById(id, (err, storeSearched) =>
    // {
    //     if (err)
    //     {
    //         return res.status(500).json({
    //             ok: false,
    //             message: 'Error searching store',
    //             errors: err
    //         });
    //     }
    //     else
    //     {
    //         if (!storeSearched)
    //         {
    //             return res.status(400).json({
    //                 ok: false,
    //                 message: 'The store with id ' + id + ' does not exist'
    //             });
    //         }
    //         else
    //         {
    //             storeSearched.name = body.name;
    //             storeSearched.description = body.description;
    //             storeSearched.emails = [body.email];
    //             storeSearched.category = body.category;

    //             storeSearched.save((err, storeSaved) =>
    //             {
    //                 if (err)
    //                 {
    //                     return res.status(400).json({
    //                         ok: false,
    //                         message: 'Error updating store with id: ' + id,
    //                         errors: err
    //                     });
    //                 }
    //                 else
    //                 {
    //                     return res.status(200).json({
    //                         ok: true,
    //                         document: storeSaved
    //                     });
    //                 }
    //             });
    //         }
    //     }
    // });
});


getCodeName = function (name)
{
    try
    {
        var codeName = 'NA';

        codeName = name.replace(/ /g, '-').toLowerCase();

        return codeName;
    }
    catch (error)
    {
        console.log('error in storeRoute - getCodeName:::' + error);
        return 'NA';
    }
}


module.exports = app;