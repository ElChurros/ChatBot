const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
        user_id: {
                type: mongoose.Types.ObjectId,
                rel: 'User',
        },
        text: {
                type: String,
                required: true
        },
        generated: {
                type: Boolean,
                required: true,
                default: false
        }
},{ timestamps: { createdAt: 'created_at' }})

messageSchema.methods = {
}

module.exports = mongoose.model('Message', messageSchema);
