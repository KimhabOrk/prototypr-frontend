// only published posts should be revalidated
//

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { entry } = req.body;

    if (entry.status === "publish") {
      console.log("revalidating published post :", entry.slug);
      const url = `/post/${entry.slug}`;
      await res.revalidate(url);
      return res.json({ revalidated: true });
    } else {
      return res.json({ revalidated: false });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
