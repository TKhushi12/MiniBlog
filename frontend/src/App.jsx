import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import PostCard from './components/PostCard';
import PostDetailModal from './components/PostDetailModal';
import PostFormModal from './components/PostFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { LoadingSkeleton, EmptyState, ErrorBanner } from './components/LoadingSkeleton';
import Toast from './components/Toast';
import postService from './services/api';
import { BookOpen, Sparkles, Feather, Github, Mail, Linkedin } from 'lucide-react';

export default function App() {
  // State management using React Hooks
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryCounts, setCategoryCounts] = useState({});

  // Modals state
  const [viewingPost, setViewingPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(null);

  // Operation indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch posts from backend
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const res = await postService.getAll(params);
      if (res.success) {
        setPosts(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Could not connect to the blog API. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  // Fetch category counts
  const fetchCounts = async () => {
    try {
      const res = await postService.getCategories();
      if (res.success) {
        const counts = { total: res.data.total };
        res.data.categories.forEach((item) => {
          counts[item.category] = item.count;
        });
        setCategoryCounts(counts);
      }
    } catch (err) {
      console.error('Failed to load category counts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchCounts();
  }, [posts.length]);

  // Create Post Handler
  const handleCreatePost = async (payload) => {
    try {
      setIsSubmitting(true);
      const res = await postService.create(payload);
      if (res.success) {
        // Optimistic UI update without page reload
        setPosts((prev) => [res.data, ...prev]);
        setIsCreateOpen(false);
        showToast('Story published successfully!');
        fetchCounts();
      }
    } catch (err) {
      console.error('Failed to create post:', err);
      showToast(err.response?.data?.message || 'Failed to publish story', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Post Handler
  const handleUpdatePost = async (payload) => {
    try {
      setIsSubmitting(true);
      const res = await postService.update(editingPost._id, payload);
      if (res.success) {
        // Real-time update in state without page reload
        setPosts((prev) =>
          prev.map((p) => (p._id === editingPost._id ? res.data : p))
        );
        if (viewingPost && viewingPost._id === editingPost._id) {
          setViewingPost(res.data);
        }
        setEditingPost(null);
        showToast('Story updated successfully!');
        fetchCounts();
      }
    } catch (err) {
      console.error('Failed to update post:', err);
      showToast(err.response?.data?.message || 'Failed to update story', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Post Handler
  const handleDeletePost = async () => {
    if (!deletingPost) return;
    try {
      setIsDeleting(true);
      const res = await postService.delete(deletingPost._id);
      if (res.success) {
        // Immediate removal from state without page reload
        setPosts((prev) => prev.filter((p) => p._id !== deletingPost._id));
        if (viewingPost && viewingPost._id === deletingPost._id) {
          setViewingPost(null);
        }
        setDeletingPost(null);
        showToast('Story deleted successfully.');
        fetchCounts();
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
      showToast('Failed to delete story', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Like Post Handler
  const handleLikePost = async (id) => {
    try {
      await postService.like(id);
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
      );
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCreateModal={() => setIsCreateOpen(true)}
        totalPosts={categoryCounts.total || posts.length}
      />

      {/* Hero Intro Section (Editorial Paper Style) */}
      <section className="py-12 sm:py-16 border-b border-paper-border bg-gradient-to-b from-paper to-paper-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-terracotta-50 text-terracotta-700 border border-terracotta-100 mb-4">
            <Feather className="w-3.5 h-3.5" />
            <span>Personal Tech & Engineering Journal</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight mb-4">
            Thoughts on Software Architecture, Web Craftsmanship & Code.
          </h2>

          <p className="text-sm sm:text-base text-ink-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Written by <strong>Khushi Tyagi</strong>. Exploring full-stack engineering, clean RESTful APIs,
            reactive UI patterns, and lessons learned building real-world software.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Feed */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 pb-20 w-full">
        {/* Error State Banner */}
        {error && <ErrorBanner message={error} onRetry={fetchPosts} />}

        {/* Loading Skeletons */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : posts.length === 0 ? (
          /* Empty State */
          <EmptyState
            searchTerm={searchTerm}
            category={selectedCategory}
            onReset={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          />
        ) : (
          /* Article Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onReadPost={setViewingPost}
                onEditPost={setEditingPost}
                onDeletePost={setDeletingPost}
                onLikePost={handleLikePost}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-paper-border py-10 bg-paper-card text-ink-muted text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-ink text-paper flex items-center justify-center font-serif text-xs font-bold">
              KT
            </div>
            <span className="font-semibold text-ink">Khushi's Journal</span>
            <span>— Full-Stack Developer Project</span>
          </div>

          <p className="text-ink-faint text-center sm:text-right">
            Engineered with React 18, Node.js, Express & MongoDB • Authored by Khushi Tyagi
          </p>
        </div>
      </footer>

      {/* Modals */}
      {/* 1. Full Story Reading Modal */}
      <PostDetailModal
        post={viewingPost}
        onClose={() => setViewingPost(null)}
        onEditPost={(p) => setEditingPost(p)}
        onLikePost={handleLikePost}
      />

      {/* 2. Create / New Story Modal */}
      <PostFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreatePost}
        isSubmitting={isSubmitting}
      />

      {/* 3. Edit Story Modal */}
      <PostFormModal
        isOpen={Boolean(editingPost)}
        initialData={editingPost}
        onClose={() => setEditingPost(null)}
        onSubmit={handleUpdatePost}
        isSubmitting={isSubmitting}
      />

      {/* 4. Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingPost)}
        postTitle={deletingPost?.title}
        onClose={() => setDeletingPost(null)}
        onConfirm={handleDeletePost}
        isDeleting={isDeleting}
      />

      {/* 5. Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
