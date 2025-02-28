"use client";

import { MoreHorizontal, MessageSquare, Heart, Repeat2, Share, Send, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost, getPostLikes, addComment, fetchComments, deleteComment } from "@/api/post.api";
import { useUserStore } from "@/store/user-store";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: { id: string; username: string };
}

interface Comment {
  id: string;
  content: string;
  user: { id: string; username: string };
}

const PostCard = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id);
  const [commentText, setCommentText] = useState("");

  const { data: likeData, refetch: refetchLikes, isFetching: isFetchingLikes, isLoading: isLoadingLikes } = useQuery({
    queryKey: ["likes", post.id, userId],
    queryFn: async () => {
      const res = await getPostLikes(post.id, userId);
      return {
        likes: res.likes ?? 0,
        userHasLiked: res.userHasLiked ?? false,
      };
    },
  });

  const { data: comments, refetch: refetchComments, isFetching: isFetchingComments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const liked = likeData?.userHasLiked ?? false;
  const commentCount = comments?.length ?? 0;

  const { mutate: likePostMutate } = useMutation({
    mutationFn: () => likePost(userId, post.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id, userId]);
      refetchLikes();
    },
  });

  const { mutate: unlikePostMutate } = useMutation({
    mutationFn: () => unlikePost(userId, post.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id, userId]);
      refetchLikes();
    },
  });

  const { mutate: addCommentMutate, isLoading: isAddingComment } = useMutation({
    mutationFn: ({ content, userId, postId }: { content: string; userId: string; postId: string }) =>
      addComment(content, userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post.id]);
      refetchComments();
    },
  });

  const { mutate: deleteCommentMutate, isLoading: isDeletingComment } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post.id]);
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#4460F0] text-lg">@{post.user.username}</h2>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{post.content}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex space-x-6">

              <button onClick={() => (liked ? unlikePostMutate() : likePostMutate())} className="flex items-center space-x-2 transition-colors">
                <Heart className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-600 hover:text-primary"}`} />
                <span className="text-sm font-medium">{isFetchingLikes ? <Loader2 className="animate-spin h-4 w-4" /> : likeData?.likes ?? 0}</span>
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-medium">{isFetchingComments ? <Loader2 className="animate-spin h-4 w-4" /> : commentCount}</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <ScrollArea className="h-60 border-b p-2">
                    {isFetchingComments ? (
                      <p className="text-gray-500">Loading comments...</p>
                    ) : commentCount > 0 ? (
                      comments.map((comment: Comment) => (
                        <div key={comment.id} className="mb-2 border-b pb-2 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-sm text-[#4460F0]">@{comment.user.username}</p>
                            <p>{comment.content}</p>
                          </div>
                          {comment.user.id === userId && (
                            <button onClick={() => deleteCommentMutate(comment.id)} disabled={isDeletingComment}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No comments yet.</p>
                    )}
                  </ScrollArea>
                  <div className="flex items-center mt-2">
                    <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Comment something..." className="flex-1" />
                    <Button onClick={handleAddComment} disabled={isAddingComment} className="ml-2 bg-[#4460F0]">
                      {isAddingComment ? "..." : <Send color="white" size={16} />}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
