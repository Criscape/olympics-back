import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: Schema.Types.String,
    shortname: Schema.Types.String,
    flagUrl: Schema.Types.String,
    medals: [{
        type: Schema.Types.ObjectId,
        ref: 'Medal'
    }]
}, {
    timestamps: true
});

export const Country = mongoose.model('Country', countrySchema);