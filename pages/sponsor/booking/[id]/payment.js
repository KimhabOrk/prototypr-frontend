// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
import axios from 'axios'
import {
  useLoad,
} from "@/components/Sponsor/sponsorHooks";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
// import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
// import { cloneDeep } from "lodash";
import Link from "next/link";
import BookingCalendar from "@/components/Sponsor/BookingCalendar";

export default function SponsorPaymentPage({}) {
  const [productId, setProductId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const { user, mutateUser } = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  });

  const { loading, content, postId, title, isOwner, postObject } =
    useLoad(user);

  useEffect(() => {
    setProductId(postObject?.productId);
    setCompanyId(postObject?.company);
  }, [postObject]);
  
  //lemonsqueezy product
  const [lsProduct, setLsProduct] = useState(null)
  //get the product (so latest pricing is available)
  useEffect(()=>{

    const getLsProduct= async() =>{

      const response = await axios.post("/api/lemonsqueezy/getProduct", {
        productId: productId,
      });
  
      setLsProduct(response.data);
    }

    if(productId){
      getLsProduct()
    }
  },[productId])

  // const [selectedSlots, setSelectedSlots] = useState(null);
  return (
    <Layout
      seo={{
        title: "Prototypr Toolbox - new design, UX and coding tools.",
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
      {loading ? (
        <div className="relative w-full h-full pt-10 flex">
          <div className="my-auto mx-auto">
            <Spinner />
          </div>
        </div>
      ) : !postObject?.active ? (
        <>
        {postObject?.featuredImage?
          <div className="fixed top-[88px] z-20 left-0 flex mb-6 border -mt-6 border-gray-300/60 bg-white p-2 w-full">
            <div className="max-w-[1160px] mx-auto md:px-3 w-full flex">
              <img src={postObject.featuredImage?.data?.attributes?.url?postObject.featuredImage?.data?.attributes?.url:postObject.featuredImage} className="my-auto rounded-xl mr-2 w-[44px] h-[44px] object-cover"/>
              <div className="flex flex-col justify-center">
                <h1 className="pr-2 font-semibold">{postObject?.title}</h1>
                <div className="pr-2 text-gray-500" dangerouslySetInnerHTML={{__html:postObject?.description}}></div>
              </div>
            </div>
          </div>
          :null}
        <Container>
          <div className="px-4">
            <div className=" pt-20 mb-6">
              <h1 className="text-3xl mb-3 font-bold">Book a slot</h1>
              <p>
                Choose week(s) and upon payment, your sponsored post will
                be reviewed by our team and scheduled.{" "}
              </p>
            </div>
          
           {productId? <BookingCalendar lsProduct={lsProduct} productId={productId} companyId={companyId} user={user} postObject={postObject} />:null}
           {user?.isLoggedIn? <p className="mt-3 max-w-2xl text-gray-500">
              You can come back and pay later, your sponsored post details are
              available on your{" "}
              <Link href="/dashboard/partner">
                <span className="text-blue-500">partners dashboard</span>
              </Link>
              .{" "}
            </p>: <p className="mt-3 max-w-2xl text-gray-500">
              You can come back to this url and pay later.
            </p>}
          </div>
        </Container>
        </>
      ) : (
        <Container>
          <div className="max-w-2xl pt-3 mb-3">
            <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
            <p>Payment for this sponsorship has already been made. </p>
          </div>
        </Container>
      )}
    </Layout>
  );
}