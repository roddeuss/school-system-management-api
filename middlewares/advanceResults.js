// model, populate

const advanceResults = (model, populate)=>{
    return async  (req, res, next) =>{ 
        let TeacherQuery =  model.find();

        //convert query strings to number
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const total =  await model.countDocuments();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // populate the data
        if(populate) {
            TeacherQuery = TeacherQuery.populate(populate);
        }
    
        // filtering a name teacher
        if (req.query.name) {
            TeacherQuery =  TeacherQuery.find({
                name: { $regex: req.query.name, $options: "i" },
            });
        }
    
        // pagination results
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
    
        // add prev
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

            // execute query
    const teachers =  await TeacherQuery.find()
    .skip(skip)
    .limit(limit)
    .exec(); // add .exec() to execute the query

    res.results = {
        status: "success",
        message: "Successfully Get Data",
        total: total,
        pagination: pagination,
        results: teachers.length,
        data: teachers,
    }
        next();
    };
};

module.exports = advanceResults;