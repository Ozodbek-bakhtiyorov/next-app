import React from "react";
import moment from "moment";
const Postdetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>;
    }
    if (obj.italic) {
      modifiedText = <b key={index}>{text}</b>;
    }
    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>;
    }
    switch (type) {
      case "heading-two":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <h3 key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case "image":
        return <img 
          key={index}
          height={obj.height}
          width={obj.width}
          src={obj.src} 
          alt={obj.alt} 
        />
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8 pb-12 mb-12">
      <div className="relative overflow-hidden mb-6">
        <img
          src={post.featuredimage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
        <div className="px-4 lg:px-0">
          <div className="flex itmes-center w-full">
            <div className="block  lg:flex text-center items-center justify-start my-4 w-full">
              <div className="flex items-center mx justify-center mg-4 lg:mb-0 w-full lg:w-auto mr-8">
                <img
                  src={post.author.photo.url}
                  alt={post.author.name}
                  width="30"
                  height="30"
                  className="align-middle rounded-full"
                />
                <p className="inline text-center align-center justify-center text-gray-700 ml-2 text-lg font-semibold">
                  {post.author.name}
                </p>
              </div>
              <div className="font-medium text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{moment(post.createAt).format("MMM DD YYYY")}</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, i) =>
            getContentFragment(i, item.text, item, item.type)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default Postdetail;
