import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";


export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-surface rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <Link
            href="/jobs"
            className="text-accent hover:opacity-80 font-medium mb-4 inline-block transition-opacity"
          >
            ← Back to Jobs
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            {job.title}
          </h1>

          <p className="text-xl text-foreground/70 mb-4">
            {job.company}
          </p>

          <div className="flex items-center gap-4 text-muted mb-6">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.type}</span>

            {job.salary && (
              <>
                <span>•</span>
                <span className="text-foreground font-medium">
                  {job.salary}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center text-sm text-muted">
            <span>Posted by {job.postedBy.name}</span>

            <span className="mx-2">•</span>

            <span>
              {formatDistanceToNow(new Date(job.postedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Job Description
          </h2>

          <div className="text-muted whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <ApplyButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}