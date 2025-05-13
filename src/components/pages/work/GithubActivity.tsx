import { useEffect, useState } from "react";

interface GitHubActivityProps {
  startDate: string;
  endDate: string;
}

interface ContributionDay {
  date: string;
  count: number;
}

export default function GithubActivity({
  startDate,
  endDate,
}: GitHubActivityProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubContributions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/akshithio/events?per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();

        const startDateTime = new Date(startDate).getTime();
        const endDateTime =
          new Date(endDate).getTime() + (24 * 60 * 60 * 1000 - 1);

        const contributionsByDay = events.reduce(
          (acc: Record<string, number>, event: any) => {
            const isContributionEvent = [
              "PushEvent",
              "PullRequestEvent",
              "IssuesEvent",
              "CommitCommentEvent",
              "CreateEvent",
              "PullRequestReviewEvent",
            ].includes(event.type);

            if (isContributionEvent) {
              const eventDate = new Date(event.created_at).getTime();
              if (eventDate >= startDateTime && eventDate <= endDateTime) {
                const dateStr = event.created_at.split("T")[0]; // YYYY-MM-DD format
                if (dateStr) {
                  acc[dateStr] = (acc[dateStr] || 0) + 1;
                }
              }
            }

            return acc;
          },
          {},
        );

        const allDays: ContributionDay[] = [];
        const currentDate = new Date(startDate);
        const lastDate = new Date(endDate);

        while (currentDate <= lastDate) {
          const dateStr = currentDate.toISOString().split("T")[0];
          allDays.push({
            date: dateStr || "",
            count: dateStr ? contributionsByDay[dateStr] || 0 : 0,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setContributions(allDays);
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub data",
        );
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      fetchGithubContributions();
    }
  }, [startDate, endDate]);

  const COLOR_LEVELS: readonly [string, string, string, string, string] = [
    "#",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ];

  const getColorForCount = (count: number): string => {
    if (count === 0) return COLOR_LEVELS[0];
    if (count <= 2) return COLOR_LEVELS[1];
    if (count <= 5) return COLOR_LEVELS[2];
    if (count <= 10) return COLOR_LEVELS[3];
    return COLOR_LEVELS[4];
  };

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return (
      <div className="text-red-500 w-[90%]">
        Error: Start date cannot be after end date
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-20 w-[90%] items-center justify-center">
        Loading GitHub activity...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 w-[90%]">
        Error loading GitHub activity: {error}
      </div>
    );
  }

  return (
    <div className="grid w-[90%] grid-cols-24 grid-rows-6 gap-x-[1px] gap-y-1">
      {contributions.map((day) => (
        <div
          key={day.date}
          className="h-[14px] w-[14px] rounded-md"
          style={{ backgroundColor: getColorForCount(day.count) }}
          title={`${day.date}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
}
