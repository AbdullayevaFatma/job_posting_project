import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, type, location } = await searchParams;

  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        searchType ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });

  return (
   <div className="space-y-8">
      <div className="bg-surface p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Find Jobs
        </h1>

        <form className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            name="q"
            placeholder="Search jobs..."
            className="border border-border bg-background text-foreground placeholder:text-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <select
            name="type"
            className="border border-border bg-background text-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border border-border bg-background text-foreground placeholder:text-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <button
            type="submit"
            className="md:col-span-3 bg-accent text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity font-medium"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-surface p-6 rounded-lg shadow-sm hover:bg-surface-hover transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {job.title}
                </h2>

                <p className="text-foreground/70 mb-2">
                  {job.company}
                </p>

                <div className="flex items-center text-sm text-muted mb-4">
                  <span className="mr-4">{job.location}</span>
                  <span>{job.type}</span>
                </div>

                <p className="text-muted mb-4 line-clamp-2">
                  {job.description}
                </p>
              </div>

              {job.salary && (
                <span className="text-lg font-semibold text-foreground">
                  {job.salary}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">
                Posted by {job.postedBy.name}
              </span>

              <Link
                href={`/jobs/${job.id}`}
                className="text-accent hover:opacity-80 font-semibold transition-opacity"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}