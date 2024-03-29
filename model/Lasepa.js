import { number } from 'joi';
import mongoose from 'mongoose';


let db;

const LasepaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String,  },
    phoneNumber: { type: String, },
    email: { type: String,},
    lasaraaNumber: { type: String, },
    typeOfPollution: { type: [String], },
    typeOfOrganizationCausingPollution: { type: String, },
    sourceOfPollution:{ type: String,  },
    addressOfThePollution: { type: String, },
    lga: { type: String,  },
    briefDescriptionOfNoiseComplaint: { type: String, },
    entries: { type: String, required: true },
    previousComplaintNumber: { type: String, },
    evidencePictures: { type: String,  },
    evidenceVideo: { type: String,  },
    evidenceAudio: { type: String, },
    evidenceDocumentsAndPDFs:{ type: String,},
    liveAudio: { type: String,  },
    liveImage: { type: String,  },
    liveVideo: { type: String, },
    maxDecibel: { type: String},
    howDidYouHearAboutLasepa: { type: String,  },
    additionalComments: { type: String, },
    complaintNumber: { type: String, },
    status: { type: String, default: 'Pending' }

  },
  { timestamps: true },
);

module.exports = mongoose.model("Lasepa", LasepaSchema);
