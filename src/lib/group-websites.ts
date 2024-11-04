import { Website } from "@/lib/types";
import { Websites } from "@/lib/redux/slice";

interface GroupedWebsites {
  today: Website[];
  yesterday: Website[];
  thisWeek: Website[];
  thisMonth: Website[];
  older: { date: string; websites: Website[] }[];
}

// Helper function to parse and convert date to local time
function parseToLocalTime(dateString: string): Date {
  const date = new Date(dateString);
  return new Date(date.toLocaleString()); // Adjusts to local timezone
}

// Helper function to format date as "MMM DD, YYYY"
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function groupWebsitesByDate(websites: Websites): GroupedWebsites {
  const grouped: GroupedWebsites = { today: [], yesterday: [], thisWeek: [], thisMonth: [], older: [] };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const olderMap: { [date: string]: Website[] } = {};

  for (const key in websites) {
    const website = websites[key];
    const createdDate = parseToLocalTime(website.mtime);

    if (createdDate >= today) {
      grouped.today.push(website);
    } else if (createdDate >= yesterday) {
      grouped.yesterday.push(website);
    } else if (createdDate >= weekAgo) {
      grouped.thisWeek.push(website);
    } else if (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    ) {
      grouped.thisMonth.push(website);
    } else {
      const dateKey = formatDate(createdDate);
      if (!olderMap[dateKey]) {
        olderMap[dateKey] = [];
      }
      olderMap[dateKey].push(website);
    }
  }

  // Sort each group by descending creation time
  grouped.today.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());
  grouped.yesterday.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());
  grouped.thisWeek.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());
  grouped.thisMonth.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());

  // Convert `olderMap` to an array and sort by date in descending order
  grouped.older = Object.entries(olderMap)
    .map(([date, websites]) => ({
      date,
      websites: websites.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime()),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return grouped;
}
