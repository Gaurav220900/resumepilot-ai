import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
  institution: { type: String },
  degree: { type: String },
  startDate : { type: String},
  endDate: { type: String },

});

const experienceSchema = mongoose.Schema({
    company: { type: String },
    title: { type: String },
    startDate : { type: String},
    endDate: { type: String },
    description : { type: String },

});

const certificationSchema = mongoose.Schema({
    name: { type: String },
    issuingOrganization: { type: String },
    issueDate : { type: String},
    URL : { type: String },
});

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: String,
    },
    location : {
        type: String,
    },

    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
    additionalLinks: [
      {
        label: { type: String },
        url: { type: String }
      }
    ],


    summary: String,
    role : {
        type: String,
    },
    education : [educationSchema],
    experience : [experienceSchema],
    skills : [String],
    softSkills: [String],
    acheivements : [String],
    certificates : [certificationSchema],

    projects: [
      {
        name: String,
        description: String,
        techStack: [String],
        link: String,
        startDate: String,
        endDate: String,
        highlights: [String],
      },
    ],

    languages: [
      {
        name: String,
        proficiency: String, // Beginner, Intermediate, Fluent
      },
    ],
}, { timestamps: true

});