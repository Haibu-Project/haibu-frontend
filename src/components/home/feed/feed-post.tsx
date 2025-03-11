"use client";

import { useState, useEffect } from "react";
import { EllipsisVertical, MessageSquare, Heart, Send, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPostLikes,
  getUserLikeOnPost,
  likePost,
  unlikePost,
  addComment,
  fetchComments,
  deleteComment,
  deletePost,
} from "@/api/post.api";
import { useUserStore } from "@/store/user-store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: { id: string; username: string; image: string };
}

interface Comment {
  id: string;
  content: string;
  user: { id: string; username: string; image: string };
}

const PostCard = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id);
  const [commentText, setCommentText] = useState("");

  const [animateLike, setAnimateLike] = useState(false);

  const {
    data: likeData,
    refetch: refetchLikes,
    isFetching: isFetchingLikes,
    isLoading: isLoadingLikes,
  } = useQuery({
    queryKey: ["likes", post.id, userId],
    queryFn: async () => {
      const totalLikes = await getPostLikes(post.id);         
      const userHasLiked = await getUserLikeOnPost(userId, post.id); 
      return {
        likes: totalLikes ?? 0,
        userHasLiked: userHasLiked ?? false,
      };
    },
  });

  const {
    data: comments,
    refetch: refetchComments,
    isFetching: isFetchingComments,
    isLoading: isLoadingComments,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const liked = likeData?.userHasLiked ?? false;
  const commentCount = comments?.length ?? 0;

  useEffect(() => {
    if (liked) {
      setAnimateLike(true);
      const timer = setTimeout(() => {
        setAnimateLike(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [liked]);

  const { mutate: deletePostMutate, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: likePostMutate } = useMutation({
    mutationFn: () => likePost(userId, post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", post.id, userId] });
      refetchLikes();
    },
  });

  const { mutate: unlikePostMutate } = useMutation({
    mutationFn: () => unlikePost(userId, post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", post.id, userId] });
      refetchLikes();
    },
  });

  const { mutate: addCommentMutate, isPending: isAddingComment } = useMutation({
    mutationFn: async ({
      content,
      userId,
      postId,
    }: {
      content: string;
      userId: string;
      postId: string;
    }) => addComment(content, userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", post.id] });
      refetchComments();
      setCommentText("");
    },
  });

  const { mutate: deleteCommentMutate, isPending: isDeletingComment } = useMutation({
    mutationFn: async (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", post.id] });
      refetchComments();
    },
  });

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addCommentMutate({ content: commentText, userId, postId: post.id });
  };

  return (
    <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg overflow-hidden border border-accent/20 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
      {isLoadingLikes || isLoadingComments ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#4460F0] text-lg">@{post.user.username}</h2>

            {userId === post.user.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <EllipsisVertical className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => deletePostMutate()} disabled={isDeletingPost}>
                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                    {isDeletingPost ? "Deleting..." : "Delete Post"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{post.content}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => (liked ? unlikePostMutate() : likePostMutate())}
              className="flex items-center space-x-2 transition-colors"
            >
              {/* Aquí aplicamos la clase animateLike */}
              <Heart
                className={`h-5 w-5 transition-colors 
                  ${animateLike ? "animate-like" : ""}
                  ${liked ? "text-red-500" : "text-gray-600 hover:text-primary"}
                `}
                fill={liked ? "currentColor" : "none"}
              />
              <span className="text-sm font-medium">
                {isFetchingLikes ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  likeData?.likes ?? 0
                )}
              </span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {isFetchingComments ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      commentCount
                    )}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <ScrollArea className="h-60 border-b p-2">
                  {comments?.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="mb-2 border-b pb-2 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-bold text-sm text-[#4460F0]">@{comment.user.username}</p>
                        <p>{comment.content}</p>
                      </div>
                      {comment.user.id === userId && (
                        <button
                          onClick={() => deleteCommentMutate(comment.id)}
                          disabled={isDeletingComment}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center mt-2">
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Comment something..."
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment} disabled={isAddingComment} className="ml-2 bg-[#4460F0]">
                    {isAddingComment ? "..." : <Send color="white" size={16} />}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes like-bounce {
          0% {
            transform: scale(0.6);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-like {
          animation: like-bounce 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PostCard;
