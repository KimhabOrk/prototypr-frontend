
// import format from "date-fns/format";
import Link from "next/link";
import toast from "react-hot-toast";
import DeletePostButton from "@/components/modal/deletePostModal";
// const qs = require("qs");

var axios = require("axios");
// var slugify = require("slugify");


const SponsorCard = ({ post, refetch, user }) => {

    const deletePost = async (id) => {
      if (id) {
        let currentPostData = {
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/sponsored-posts/${id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        };
  
        try {
          const resp = await axios(currentPostData);
          // console.log("HELLO", resp);
          if (resp.status === 200) {
            toast.success("Your post has been deleted!", {
              duration: 5000,
            });
            refetch();
          }
        } catch (error) {
          console.log(error);
          toast.success("Oops, something went wrong!", {
            duration: 5000,
          });
        }
      } else {
        toast.success("Could not find that post!", {
          duration: 5000,
        });
      }
    };
  
    return (
      <div className="flex flex-col justify-between p-6 h-full rounded-lg border border-black border-opacity-5 hover:border-opacity-10 cursor-default bg-white hover:transition duration-300 ease-in-out">
        <div className="flex flex-col grid gap-2">
          {/* {(post.status!=='publish' && post.status!=='draft') &&
          <div>
            <span
              className={`text-[10px] uppercase w-auto px-4 py-1 ${
                post.status === "draft"
                  ? "bg-yellow-500"
                  : post.status === "pending"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }  text-white rounded-[20px] my-2`}
            >
              {post.status}
            </span>
          </div>} */}
          <div className="mb-3">
            <h3 className="text-lg font-medium max-w-md font-inter">
              {post.title}
            </h3>
            {/* <p className="text-sm text-gray-500 mb-10">
              {format(new Date(post.date), "LLLL d, yyyy")}
            </p> */}
          </div>
        </div>
  
        {/* {(post.status === "draft" || post.status === "pending") && ( */}
        <div className="flex flex-row gap-2">
          <div>
            <Link href={`/sponsor/booking/${post.id}/edit`}>
              <button className="text-sm underline text-black p-3 rounded-full hover:bg-gray-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
  
          {/* <div>
            <DeletePostButton
              onClick={() => {
                deletePost(post.id);
              }}
            />
          </div> */}
        </div>
      </div>
    );
  };

  export default SponsorCard