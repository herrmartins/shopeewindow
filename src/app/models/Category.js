import connectDB from "../lib/mongodb";
import mongoose from "mongoose";

const Category = new mongoose.Schema(
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
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

Category.pre("save", async function (next) {
  if (this.isNew || this.isModified("title")) {
    let slug = this.slug;
    let originalSlug = slug;
    let counter = 1;

    while (
      (await mongoose.models.Category.countDocuments({ slug }).exec()) > 0
    ) {
      slug = `${originalSlug}-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

const getCategoryModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["Category"];
  }
  return mongoose.models.Category || mongoose.model("Category", Category);
};

function serializeCategories(categoryObj) {
  if (!categoryObj || !categoryObj._id) {
    console.warn("Invalid category object:", categoryObj);
    return null;
  }

  try {
    const result = {
      ...categoryObj,
      _id: categoryObj._id?.toString?.() ?? "",
      createdAt: categoryObj.createdAt?.toISOString?.() ?? null,
      updatedAt: categoryObj.updatedAt?.toISOString?.() ?? null,
    };

    // Handle parent field carefully
    if (categoryObj.parent) {
      if (typeof categoryObj.parent === "object" && categoryObj.parent._id) {
        result.parent = {
          _id: categoryObj.parent._id?.toString?.() ?? "",
          title: categoryObj.parent.title ?? null,
          emoji: categoryObj.parent.emoji ?? null,
        };
      } else if (typeof categoryObj.parent === "string") {
        result.parent = categoryObj.parent;
      } else {
        result.parent = categoryObj.parent?.toString?.() ?? null;
      }
    } else {
      result.parent = null;
    }

    // Ensure all required fields are present
    result.title = result.title ?? "";
    result.slug = result.slug ?? "";
    result.emoji = result.emoji ?? "";
    result.imageUrl = result.imageUrl ?? null;
    result.order = result.order ?? 0;

    return result;
  } catch (error) {
    console.error("Error serializing category:", error, categoryObj);
    return null;
  }
}

export { Category, getCategoryModel, serializeCategories };
