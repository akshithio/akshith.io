import { duplet } from "@/utils/fonts";
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
          `https://github-contributions-api.deno.dev/akshithio.json`,
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const allContributions = data.contributions.flat();
        const startDateTime = new Date(startDate).getTime();
        const endDateTime =
          new Date(endDate).getTime() + (24 * 60 * 60 * 1000 - 1);

        const filteredContributions = allContributions.filter(
          (contribution) => {
            const contributionDate = new Date(contribution.date).getTime();
            return (
              contributionDate >= startDateTime &&
              contributionDate <= endDateTime
            );
          },
        );

        const formattedContributions = filteredContributions.map(
          (contribution) => ({
            date: contribution.date,
            count: contribution.contributionCount,
          }),
        );

        const allDays: ContributionDay[] = [];
        const currentDate = new Date(startDate);
        const lastDate = new Date(endDate);

        while (currentDate <= lastDate) {
          const dateStr = currentDate.toISOString().split("T")[0] || "";
          const existingDay = formattedContributions.find(
            (day) => day.date === dateStr,
          );

          if (existingDay) {
            allDays.push(existingDay);
          } else {
            allDays.push({
              date: dateStr,
              count: 0,
            });
          }

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
    } else {
      console.log("error with dates");
    }
  }, [startDate, endDate]);

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return (
      <div className="w-[90%] text-red-500">
        Error: Start date cannot be after end date
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex h-20 w-[90%] items-center justify-center ${duplet.className}`}
      >
        Loading GitHub activity...
      </div>
    );
  }

  const COLOR_LEVELS: readonly [string, string, string, string, string] = [
    "#D9D9D9",
    "#93E7A2",
    "#77E191",
    "#5DD977",
    "#3EBE5E",
  ];

  const getColorForCount = (count: number): string => {
    if (count === 0) return COLOR_LEVELS[0];
    if (count <= 2) return COLOR_LEVELS[1];
    if (count <= 5) return COLOR_LEVELS[2];
    if (count <= 10) return COLOR_LEVELS[3];
    return COLOR_LEVELS[4];
  };

  if (error) {
    return (
      <div className="w-[90%] text-red-500">
        Error loading GitHub activity: {error}
      </div>
    );
  }

  return (
    <div className="grid-rows-auto grid-cols-24 grid w-[90%] gap-x-1 gap-y-1">
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
