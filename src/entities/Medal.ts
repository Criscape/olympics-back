import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const medalSchema = new Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    rank: Schema.Types.String
}, {
    timestamps: true
});

export const Medal = mongoose.model('Medal', medalSchema);