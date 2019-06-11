module.exports.asyncWrapper = model => async (data, action) => model[action](data)
module.exports.asyncCreateTables = async dynamo => dynamo.createTables()
