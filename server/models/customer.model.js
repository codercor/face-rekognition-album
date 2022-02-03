const { DynamoDB } = require("aws-sdk");

const config = require("../config/aws.config");

let dynamoDb = new DynamoDB({
    region: config.region,
});


const setGroup = function(faceId, imageKey) {
    //check if faceId exists in dynamoDB
    let params = {
        TableName: "groups",
        Key: {
            faceId: {
                S: faceId,
            },
        },
    };
    //with promises
    dynamoDb.getItem(params).promise().then(data => {
        if (data.Item) {
            //if exists, add imageKey to the group
            let group = data.Item.group.SS;
            group.push(imageKey);
            let params = {
                TableName: "groups",
                Key: {
                    faceId: {
                        S: faceId,
                    },
                },
                UpdateExpression: "set group = :group",
                ExpressionAttributeValues: {
                    ":group": {
                        SS: group,
                    },
                },
            };
            dynamoDb.updateItem(params).promise();
        } else {
            //if not exists, create new group
            let params = {
                TableName: "groups",
                Item: {
                    faceId: {
                        S: faceId,
                    },
                    group: {
                        SS: [imageKey],
                    },
                },
            };
            dynamoDb.putItem(params).promise();
        }
    });
};


const getGroup = function(faceId) {
    let params = {
        TableName: "groups",
        Key: {
            faceId: {
                S: faceId,
            },
        },
    };
    return dynamoDb.getItem(params).promise().then(data => {
        if (data.Item) {
            return data.Item.group.SS;
        } else {
            return [];
        }
    });
};


module.exports = {
    setGroup,
    getGroup,
};
