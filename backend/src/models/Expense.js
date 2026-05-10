const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
        required: true
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    receipt: {
        type: String,        // Cloudinary URL
        default: null
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurrence: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly'],
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);