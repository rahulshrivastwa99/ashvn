import React, { useState } from "react";
import {
  MessageCircle,
  Heart,
  Flag,
  Shield,
  Plus,
  Search,
  Filter,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  category: string;
  replies: number;
  likes: number;
  isAnonymous: boolean;
  tags: string[];
  isModerated?: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  timestamp: Date;
  isAnonymous: boolean;
  likes: number;
  isPeerVolunteer?: boolean;
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Dealing with exam anxiety - any tips?",
    content:
      "I have important exams coming up and I'm feeling really overwhelmed. The closer they get, the worse my anxiety becomes. Has anyone dealt with something similar? What helped you?",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-15T10:30:00"),
    category: "Academic Stress",
    replies: 8,
    likes: 12,
    isAnonymous: true,
    tags: ["anxiety", "exams", "stress"],
  },
  {
    id: "2",
    title: "Feeling lonely in college",
    content:
      "It's my second year and I still haven't made close friends. I see everyone else having fun in groups and it makes me feel more isolated. Anyone else experiencing this?",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-14T15:20:00"),
    category: "Social Connection",
    replies: 15,
    likes: 23,
    isAnonymous: true,
    tags: ["loneliness", "social", "friendship"],
  },
  {
    id: "3",
    title: "Sleep schedule completely messed up",
    content:
      "I've been staying up until 3-4 AM every night and waking up at noon. This is affecting my classes and mood. How do I fix my sleep cycle?",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-13T22:15:00"),
    category: "Sleep & Wellness",
    replies: 6,
    likes: 8,
    isAnonymous: true,
    tags: ["sleep", "routine", "wellness"],
  },
  {
    id: "4",
    title: "How to make friends in a new city?",
    content:
      "Moved here for college a few months ago and I'm struggling to connect with people. Everyone seems to have their own groups already. My social anxiety is making it hard to even start a conversation. Any advice?",
    author: "LostInTheCity",
    timestamp: new Date("2025-09-01T18:00:00"),
    category: "Social Anxiety",
    replies: 15,
    likes: 25,
    isAnonymous: false,
    tags: ["social anxiety", "loneliness", "friendship", "college"],
  },
  {
    id: "5",
    title: "Struggling after a breakup",
    content:
      "My long-term partner and I broke up last week and I feel completely lost. It feels like a part of me is missing and I can't stop crying. How do you even begin to move on from something like this?",
    author: "Anonymous User",
    timestamp: new Date("2025-09-19T22:45:00"),
    category: "Relationship Advice",
    replies: 5,
    likes: 9,
    isAnonymous: true,
    tags: ["breakup", "heartbreak", "grief", "relationships"],
  },
  {
    id: "6",
    title: "Zero motivation to do anything. Help!",
    content:
      "Lately, I can't bring myself to do anything productive, even simple tasks. I just scroll on my phone for hours. I know what I need to do, but I have this huge mental block. It's affecting my grades and I feel stuck in a cycle of procrastination and guilt.",
    author: "StuckStudent",
    timestamp: new Date("2025-09-10T14:00:00"),
    category: "Motivation",
    replies: 18,
    likes: 31,
    isAnonymous: false,
    tags: ["procrastination", "motivation", "study habits", "guilt"],
  },
  {
    id: "7",
    title: "Family pressure about career choices is crushing me.",
    content:
      "My parents have a very specific career path in mind for me, but it's not what I'm passionate about. Every conversation turns into an argument and the guilt is overwhelming. I feel trapped between their expectations and my own dreams.",
    author: "Pathfinder22",
    timestamp: new Date("2025-08-05T20:10:00"),
    category: "Family Issues",
    replies: 14,
    likes: 28,
    isAnonymous: false,
    tags: ["family", "career", "pressure", "guilt", "expectations"],
  },
];

const mockReplies: Reply[] = [
  // Replies for Post ID: 1 (Exam Anxiety) - 2 Replies
  {
    id: "1",
    postId: "1",
    content:
      "I totally understand! What helped me was breaking study sessions into smaller chunks and using the Pomodoro technique. Also, deep breathing exercises before exams really made a difference.",
    author: "Peer Volunteer",
    timestamp: new Date("2025-01-15T11:00:00"),
    isAnonymous: false,
    likes: 5,
    isPeerVolunteer: true,
  },
  {
    id: "2",
    postId: "1",
    content:
      "Try progressive muscle relaxation! There are some great guided audio exercises in the Resources section. Also, remember that it's normal to feel this way - you're not alone.",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-15T12:30:00"),
    isAnonymous: true,
    likes: 3,
  },

  // Replies for Post ID: 2 (Feeling Lonely) - 3 Replies
  {
    id: "3",
    postId: "2",
    content:
      "I'm in the same boat. It's really tough. I've started joining clubs for my hobbies (even if I go alone at first). It's a slow process but it helps to be around people with similar interests.",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-14T16:00:00"),
    isAnonymous: true,
    likes: 7,
  },
  {
    id: "4",
    postId: "2",
    content:
      "Many colleges have social connection workshops or events. Check with student services! They can be a low-pressure way to meet people. We're here for you!",
    author: "Peer Volunteer",
    timestamp: new Date("2025-01-14T17:45:00"),
    isAnonymous: false,
    likes: 4,
    isPeerVolunteer: true,
  },
  {
    id: "15",
    postId: "2",
    content:
      "You're definitely not alone in feeling this way. It takes time to find your people. Be patient with yourself.",
    author: "SupportiveSoul",
    timestamp: new Date("2025-01-14T18:00:00"),
    isAnonymous: false,
    likes: 9,
  },

  // Replies for Post ID: 3 (Sleep Schedule) - 4 Replies
  {
    id: "5",
    postId: "3",
    content:
      "To reset your cycle, try staying up all night and day, then going to bed at a normal time like 10 PM. It's tough for one day, but can force a reset. Also, no screens an hour before your new bedtime!",
    author: "NightOwlReforming",
    timestamp: new Date("2025-01-14T09:00:00"),
    isAnonymous: false,
    likes: 6,
  },
  {
    id: "6",
    postId: "3",
    content:
      "Gradual changes worked for me. Try going to bed just 30 minutes earlier each night. It's less of a shock to your system. Consistency is key.",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-14T11:20:00"),
    isAnonymous: true,
    likes: 2,
  },
  {
    id: "16",
    postId: "3",
    content:
      "Have you tried a guided sleep meditation? There are a bunch in the resources tab. They help calm my racing thoughts at night.",
    author: "MindfulMornings",
    timestamp: new Date("2025-01-14T12:00:00"),
    isAnonymous: false,
    likes: 4,
  },
  {
    id: "17",
    postId: "3",
    content:
      "Make sure your room is completely dark! Any light can disrupt your natural melatonin production. It made a huge difference for me.",
    author: "Anonymous Student",
    timestamp: new Date("2025-01-14T14:10:00"),
    isAnonymous: true,
    likes: 1,
  },

  // Replies for Post ID: 4 (Making friends in new city) - 1 Reply
  {
    id: "7",
    postId: "4",
    content:
      "Starting conversations is the hardest part! Try asking a simple question related to your shared environment, like 'Have you tried the coffee here?' or 'Did you understand that lecture?' Small steps!",
    author: "BeenThere22",
    timestamp: new Date("2025-09-01T19:30:00"),
    isAnonymous: false,
    likes: 11,
  },

  // Replies for Post ID: 5 (Struggling after breakup) - 2 Replies
  {
    id: "9",
    postId: "5",
    content:
      "Sending you so much love. Please be kind to yourself and allow yourself time to grieve. There's no timeline for healing. Just focus on one day at a time.",
    author: "Anonymous Student",
    timestamp: new Date("2025-09-20T08:15:00"),
    isAnonymous: true,
    likes: 10,
  },
  {
    id: "10",
    postId: "5",
    content:
      "It hurts so much right now, but I promise it gets better. Try to reconnect with your own hobbies and friends. Rebuilding your own life helps fill that space. We're all here for you.",
    author: "HeartOnTheMend",
    timestamp: new Date("2025-09-20T09:00:00"),
    isAnonymous: false,
    likes: 6,
  },

  // Replies for Post ID: 6 (Zero Motivation) - 3 Replies
  {
    id: "11",
    postId: "6",
    content:
      "This is so relatable. Sometimes the guilt is the worst part. Try the '5-minute rule' - just do the task for 5 minutes. Often, starting is the biggest hurdle.",
    author: "Anonymous Student",
    timestamp: new Date("2025-09-10T14:30:00"),
    isAnonymous: true,
    likes: 12,
  },
  {
    id: "12",
    postId: "6",
    content:
      "This sounds like it could be a sign of burnout or depression. Have you considered talking to a campus counselor? They can provide strategies and support. Taking that first step is a sign of strength.",
    author: "Peer Volunteer",
    timestamp: new Date("2025-09-10T15:00:00"),
    isAnonymous: false,
    likes: 9,
    isPeerVolunteer: true,
  },
  {
    id: "18",
    postId: "6",
    content:
      "I feel this. Breaking tasks into the tiniest possible steps helps me. Instead of 'write essay', my first step is just 'open a new document'. It makes it feel less overwhelming.",
    author: "StepByStep",
    timestamp: new Date("2025-09-10T16:00:00"),
    isAnonymous: false,
    likes: 15,
  },

  // Replies for Post ID: 7 (Family Pressure) - 2 Replies
  {
    id: "13",
    postId: "7",
    content:
      "That sounds incredibly difficult. It's your life and your career. Maybe you could try writing them a letter to explain your feelings without interruption? Sometimes that helps get the point across calmly.",
    author: "MyOwnPath",
    timestamp: new Date("2025-08-06T11:50:00"),
    isAnonymous: false,
    likes: 7,
  },
  {
    id: "14",
    postId: "7",
    content:
      "Setting boundaries is so important, but so hard with family. Remember that their desire comes from a place of love, even if it's expressed as pressure. A career counselor could help you mediate this conversation.",
    author: "Anonymous Student",
    timestamp: new Date("2025-08-06T13:25:00"),
    isAnonymous: true,
    likes: 4,
  },
];
const categories = [
  "All",
  "Academic Stress",
  "Social Connection",
  "Sleep & Wellness",
  "Mental Health",
  "Relationships",
  "Family Issues",
];

export default function Forum() {
  const [posts] = useState<ForumPost[]>(mockPosts);
  const [replies] = useState<Reply[]>(mockReplies);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  // New post form state
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Academic Stress");
  const [newPostTags, setNewPostTags] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.timestamp.getTime() - a.timestamp.getTime();
        case "popular":
          return b.likes - a.likes;
        case "most_replies":
          return b.replies - a.replies;
        default:
          return 0;
      }
    });

  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    // Here you would typically make an API call to create the post
    alert(
      "Post submitted for moderation. It will appear shortly after review."
    );

    // Reset form
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostCategory("Academic Stress");
    setNewPostTags("");
    setShowNewPost(false);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const getPostReplies = (postId: string) => {
    return replies.filter((reply) => reply.postId === postId);
  };

  if (showNewPost) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Create New Post
              </h1>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Anonymous Posting
                  </h3>
                  <p className="text-xs text-blue-600">
                    Your identity will be protected
                  </p>
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Post anonymously
                </span>
              </label>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                maxLength={100}
              />
              <div className="text-xs text-gray-500 mt-1">
                {newPostTitle.length}/100 characters
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your thoughts, experiences, or questions..."
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 mt-1">
                {newPostContent.length}/1000 characters
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                value={newPostTags}
                onChange={(e) => setNewPostTags(e.target.value)}
                placeholder="e.g. anxiety, stress, friendship (comma-separated)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tags help others find your post
              </p>
            </div>

            {/* Community Guidelines */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <Shield className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    Community Guidelines
                  </h4>
                  <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                    <li>• Be respectful and supportive</li>
                    <li>• No personal attacks or discrimination</li>
                    <li>• Share experiences, not personal details</li>
                    <li>• Posts are moderated for safety</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleNewPost}
                className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Post to Community
              </button>
              <button
                onClick={() => setShowNewPost(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    const post = posts.find((p) => p.id === selectedPost);
    const postReplies = getPostReplies(selectedPost);

    if (!post) return <div>Post not found</div>;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
          >
            ← Back to Forum
          </button>
        </div>

        {/* Original Post */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatTimeAgo(post.timestamp)}</span>
                <button className="flex items-center hover:text-red-500">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </button>
              </div>
            </div>

            <h1 className="text-xl font-semibold text-gray-900 mb-3">
              {post.title}
            </h1>
            <p className="text-gray-700 mb-4">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <button className="flex items-center text-gray-500 hover:text-teal-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                </div>
                <div className="flex items-center text-gray-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{post.replies} replies</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Replies ({postReplies.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {postReplies.map((reply) => (
              <div key={reply.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        reply.isPeerVolunteer ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {reply.isPeerVolunteer ? (
                        <Shield className="h-4 w-4 text-green-600" />
                      ) : (
                        <MessageCircle className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {reply.author}
                      </span>
                      {reply.isPeerVolunteer && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Peer Volunteer
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(reply.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{reply.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-teal-600 text-sm">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{reply.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-teal-600">
                        Reply
                      </button>
                      <button className="text-sm text-gray-500 hover:text-red-500">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="space-y-4">
              <textarea
                placeholder="Share your thoughts or support..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                    defaultChecked
                  />
                  Reply anonymously
                </label>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Peer Support Forum
          </h1>
          <p className="text-gray-600">
            Connect with other students in a safe, moderated environment
          </p>
        </div>
        <button
          onClick={() => setShowNewPost(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              Safe Space Guidelines
            </h3>
            <p className="text-sm text-blue-700">
              This forum is monitored by trained peer volunteers and moderators.
              All posts are anonymous by default. If you're in crisis, please
              use the emergency resources or speak directly with a counselor.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Liked</option>
              <option value="most_replies">Most Replies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTimeAgo(post.timestamp)}
                  </span>
                  <button className="hover:text-red-500">
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3
                className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-teal-600"
                onClick={() => setSelectedPost(post.id)}
              >
                {post.title}
              </h3>

              <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-teal-600">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    className="flex items-center text-gray-500 hover:text-teal-600"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.replies}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            Create the first post
          </button>
        </div>
      )}
    </div>
  );
}
