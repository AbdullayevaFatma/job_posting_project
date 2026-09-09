"use client";

import type { SyntheticEvent } from "react";

export default function PostJobPage() {
 const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary"),
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      window.location.href = "/jobs";
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
 <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Post a Job</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-foreground"
          >
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-foreground"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-foreground"
          >
            Job Type
          </label>
          <select
            name="type"
            id="type"
            required
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          >
            <option value="">Select a type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            required
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          />
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-foreground"
          >
            Salary (optional)
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            placeholder="e.g., $80,000 - $100,000"
            className="mt-1 block w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground bg-surface"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}