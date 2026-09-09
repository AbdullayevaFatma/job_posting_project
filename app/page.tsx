import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-surface rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Find Your Dream Job
        </h1>

        <p className="text-xl text-muted mb-8">
          Discover thousands of job opportunities with top companies
        </p>

        <Link
          href="/jobs"
          className="bg-accent text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Browse Jobs
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Recent Jobs
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-surface p-6 rounded-lg shadow-sm hover:bg-surface-hover transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {job.title}
              </h3>

              <p className="text-foreground/70 mb-2">{job.company}</p>

              <div className="flex items-center text-sm text-muted mb-4">
                <span className="mr-4">{job.location}</span>
                <span>{job.type}</span>
              </div>

              <p className="text-muted mb-4 line-clamp-2">
                {job.description}
              </p>

              <Link
                href={`/jobs/${job.id}`}
                className="text-accent hover:opacity-80 font-medium transition-opacity"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/jobs"
            className="text-accent hover:opacity-80 font-semibold transition-opacity"
          >
            View All Jobs →
          </Link>
        </div>
      </section>
    </div>
  );
}
