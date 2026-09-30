import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    author: {
      type: String,
      default: 'Khushi Tyagi',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Web Development',
        'React & Node',
        'Software Architecture',
        'Career & Growth',
        'Personal Journal',
        'Design & UI',
      ],
      default: 'Web Development',
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      default: '3 min read',
    },
    coverColor: {
      type: String,
      default: 'amber', // amber, stone, slate, emerald, rose, indigo
    },
    likes: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware: auto-generate slug, excerpt, and readTime
postSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 80);
    this.slug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  if (this.isModified('content')) {
    // Generate clean excerpt
    if (!this.excerpt || this.excerpt.trim() === '') {
      const plainText = this.content.replace(/<[^>]+>/g, '').trim();
      this.excerpt = plainText.length > 180 ? `${plainText.substring(0, 180)}...` : plainText;
    }

    // Calculate reading time (average 200 words per minute)
    const wordCount = this.content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    this.readTime = `${minutes} min read`;
  }

  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
