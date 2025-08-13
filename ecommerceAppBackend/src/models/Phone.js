import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema({
  model: String,
  brand: String,
  displaySize: String,
  ram: String,
  primaryCamera: String,
  battery: String,
  imageUrl: String,        // “link that holds an image”
  price: { type: Number }  // ensure numeric in DB (cast on import if needed)
}, { timestamps: true });

phoneSchema.index({ model: 'text', brand: 'text' });

export default mongoose.model('Phone', phoneSchema);
