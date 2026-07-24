import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [150, 'Email address cannot exceed 150 characters'],
    },
    budgetRange: {
      type: String,
      required: [true, 'Budget range is required'],
      enum: {
        values: ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000+'],
        message: 'Invalid budget range selected',
      },
    },
    message: {
      type: String,
      required: [true, 'Project message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
