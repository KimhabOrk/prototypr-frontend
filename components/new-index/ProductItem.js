import Image from "next/image";
export default function ProductItem({ post = {} }) {
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    author = null,
  } = post;
  const tagArr = tags.data;
  return (
    <div className="grid-cols-1 flex items-center cursor-pointer py-2">
      <div className="w-40 h-40 rounded-lg bg-contain bg-no-repeat relative">
        <Image
          objectFit="cover"
          className="rounded-lg"
          layout="fill"
          src={legacyFeaturedImage?.thumb}
        />
      </div>
      <div className="flex-1 ml-4 h-full">
        <div className="flex">
          <div className="font-light text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # {tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"}
          </div>
          {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # product design
          </div> */}
        </div>
        <h4 className="font-semibold text-lg leading-7 text-gray-1 md:w-2/3">
          {title}
        </h4>
        <div className="mt-3 flex items-center">
          <div className="w-9 h-9 rounded-full relative">
            <Image
              src={author?.data?.attributes?.avatar}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="font-medium text-base ml-3">
            {author?.data?.attributes?.displayName}
          </div>
        </div>
      </div>
    </div>
  );
}
