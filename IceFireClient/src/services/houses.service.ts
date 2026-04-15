export async function fetchHouses(page: number, pageSize: number) {
  const res = await fetch(
    `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`
  );

  if (!res.ok) throw new Error('Failed to fetch houses');

  const data = await res.json();

  const linkHeader = res.headers.get('link');

  let total: number | null = null;

  if (linkHeader) {
    const links = linkHeader.split(',');

    let lastPage: number | null = null;

    for (const link of links) {
      const match = link.match(/page=(\d+).*rel="(.*?)"/);
      if (!match) continue;

      const pageNum = parseInt(match[1], 10);
      const rel = match[2];

      if (rel === 'last') {
        lastPage = pageNum;
      }
    }

    // If "last" not present, fallback
    if (!lastPage) {
      const nextMatch = linkHeader.match(/page=(\d+).*rel="next"/);
      if (nextMatch) {
        lastPage = parseInt(nextMatch[1], 10); // approximation
      }
    }

    if (lastPage) {
      total = lastPage * pageSize;
    }
  }

  return {
    data: data,
    totalItems: total,
    page,
    pageSize
  };
}

export async function fetchHouse(houseId: string) {
  const res = await fetch(`https://anapioficeandfire.com/api/houses/${houseId}`);
  if (!res.ok) throw new Error('Failed to fetch house');
  return res.json();
}