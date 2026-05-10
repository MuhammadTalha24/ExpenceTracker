const errorHandler = (err, req, res, next) => {
    console.error(err.stack);   // better than console.log

    // Zod Validation Error
    if (err.name === 'ZodError') {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }

   
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate field value entered"
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;