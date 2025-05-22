import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    emoji: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      default: function () {
        return this.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
  },
  { timestamps: true }
);

CategorySchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('title')) {
    let slug = this.slug;
    let originalSlug = slug;
    let counter = 1;

    while (await mongoose.models.Category.countDocuments({ slug }).exec() > 0) {
      slug = `${originalSlug}-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
