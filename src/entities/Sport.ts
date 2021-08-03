import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
    name: Schema.Types.String,
    shortname: Schema.Types.String,
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {
    timestamps: true
});

export const Sport = mongoose.model('Sport', sportSchema);