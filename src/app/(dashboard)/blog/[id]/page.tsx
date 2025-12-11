"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockArticles } from "@/services/blog";
import { formatDate, getInitials } from "@/lib/utils";

const categoryLabels = {
  article: "Article",
  communique: "Communiqué",
  "compte-rendu": "Compte-rendu",
};

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();

  const article = mockArticles.find((a) => a.id === params.id);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Article non trouvé</h2>
        <Button variant="link" onClick={() => router.push("/blog")}>
          Retour au blog
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <article className="space-y-6">
        <Badge>{categoryLabels[article.category]}</Badge>

        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.author.avatar} />
              <AvatarFallback>
                {getInitials(
                  `${article.author.firstName} ${article.author.lastName}`
                )}
              </AvatarFallback>
            </Avatar>
            <span>
              {article.author.firstName} {article.author.lastName}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(article.publishedAt || article.createdAt)}
          </div>
        </div>

        {article.coverImage && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
