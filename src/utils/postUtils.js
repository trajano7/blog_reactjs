export const extractPosts = (data) => {
  const posts = data.items.map((item) => {
    const fields = item.fields;
    const metadata = item.metadata;
    const authorId = fields.authorInfo.sys.id;
    const author = data.includes.Entry.find(
      (entry) => entry.sys.id === authorId
    );

    return {
      id: item.sys.id,
      title: fields.postTitle,
      summary: fields.postSummary,
      body: fields.postBody ? fields.postBody : undefined,
      featuredImage: data.includes.Asset.find(
        (asset) => asset.sys.id === fields.featuredImage.sys.id
      ).fields.file.url,
      imgTitle: data.includes.Asset.find(
        (asset) => asset.sys.id === fields.featuredImage.sys.id
      ).fields.title,
      data: fields.postData,
      author: {
        name: author.fields.authorName,
        title: author.fields.authorTitle,
        photo: data.includes.Asset.find(
          (asset) => asset.sys.id === author.fields.authorPhoto.sys.id
        ).fields.file.url,
      },
      tag: metadata.tags[0].sys.id,
    };
  });

  return posts;
};

export const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export const transformQueryString = (query) => {
  const terms = query.split(" ");
  const quotedTerms = terms.map((word) => `"${word}"`);
  return `&query=${quotedTerms.join(",")}`;
};
