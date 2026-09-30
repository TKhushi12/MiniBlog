import Post from '../models/Post.js';

/**
 * @route   GET /api/posts
 * @desc    Fetch all posts with optional search and category filters
 */
export const getPosts = async (req, res) => {
  try {
    const { search, category, tag } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { excerpt: searchRegex },
        { author: searchRegex },
      ];
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching posts', error: err.message });
  }
};

/**
 * @route   GET /api/posts/:id
 * @desc    Fetch a single post by ID or slug
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    let post;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id);
    } else {
      post = await Post.findOne({ slug: id });
    }

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching post', error: err.message });
  }
};

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, coverColor, author } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    const post = new Post({
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || '',
      category: category || 'Web Development',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      coverColor: coverColor || 'amber',
      author: author?.trim() || 'Khushi Tyagi',
    });

    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      message: 'Post published successfully',
      data: savedPost,
    });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @route   PUT /api/posts/:id
 * @desc    Update an existing post
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category, tags, coverColor, author } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (title !== undefined) post.title = title.trim();
    if (content !== undefined) post.content = content.trim();
    if (excerpt !== undefined) post.excerpt = excerpt.trim();
    if (category !== undefined) post.category = category;
    if (coverColor !== undefined) post.coverColor = coverColor;
    if (author !== undefined) post.author = author.trim();
    if (tags !== undefined) {
      post.tags = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    }

    const updatedPost = await post.save();

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post by ID
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({
      success: true,
      message: 'Post deleted successfully',
      deletedId: id,
    });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ success: false, message: 'Server error while deleting post', error: err.message });
  }
};

/**
 * @route   POST /api/posts/:id/like
 * @desc    Increment like counter for a post
 */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({
      success: true,
      likes: post.likes,
    });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

/**
 * @route   GET /api/posts/meta/categories
 * @desc    Get category summary counts
 */
export const getCategoryStats = async (req, res) => {
  try {
    const stats = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    const total = await Post.countDocuments();

    res.json({
      success: true,
      data: {
        total,
        categories: stats,
      },
    });
  } catch (err) {
    console.error('Error computing category stats:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
